#!/usr/bin/env node

/**
 * Mirror the original product photos from the live ATC WordPress site.
 *
 * This intentionally downloads only files served by atc-maroc.com under
 * /wp-content/uploads. It does not search for, generate, or substitute images.
 * Run it while atc-maroc.com still resolves to the old WordPress host.
 */
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_FILE = path.join(ROOT, "src", "db", "products.generated.ts");
const PUBLIC_DIR = path.join(ROOT, "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "wp-content", "uploads");
const PER_PAGE = 100;
const MAX_PAGES = 1000;
const MAX_IMAGE_BYTES = 50 * 1024 * 1024;
const CONCURRENCY = 4;
const RETRIES = 3;
const ALLOWED_HOSTS = new Set(["atc-maroc.com", "www.atc-maroc.com"]);
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const USER_AGENT = "ATC-Maroc product image mirror/1.0";

function legacyOrigin() {
  const raw = process.env.ATC_LEGACY_SITE_URL?.trim() || "https://atc-maroc.com";
  const parsed = new URL(raw);
  if (
    parsed.protocol !== "https:" ||
    !ALLOWED_HOSTS.has(parsed.hostname.toLowerCase()) ||
    parsed.username ||
    parsed.password ||
    (parsed.pathname !== "/" && parsed.pathname !== "") ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(
      "ATC_LEGACY_SITE_URL must be the HTTPS origin https://atc-maroc.com (or https://www.atc-maroc.com).",
    );
  }
  return parsed.origin;
}

function assertFirstParty(url) {
  if (
    url.protocol !== "https:" ||
    !ALLOWED_HOSTS.has(url.hostname.toLowerCase()) ||
    url.username ||
    url.password
  ) {
    throw new Error(`Refusing a non-ATC image/API URL: ${url.href}`);
  }
}

async function fetchFirstParty(input, { headers = {} } = {}) {
  let current = new URL(input);

  for (let redirects = 0; redirects <= 5; redirects += 1) {
    assertFirstParty(current);
    const response = await fetch(current, {
      headers: { "User-Agent": USER_AGENT, ...headers },
      redirect: "manual",
      signal: AbortSignal.timeout(60_000),
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) throw new Error(`Redirect from ${current.href} had no Location header.`);
      current = new URL(location, current);
      continue;
    }

    return response;
  }

  throw new Error(`Too many redirects while requesting ${input}.`);
}

async function requestWithRetry(input, label, additionalHeaders = {}) {
  let lastError;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    let response;
    try {
      response = await fetchFirstParty(input, {
        headers: {
          Accept: "application/json, image/avif, image/webp, image/*, */*;q=0.8",
          ...additionalHeaders,
        },
      });
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        await delay(500 * 2 ** (attempt - 1));
        continue;
      }
      break;
    }

    if (response.ok) return response;

    const body = await response.text();
    let apiCode = "";
    try {
      apiCode = JSON.parse(body).code ?? "";
    } catch {
      // Non-JSON error responses are reported with their HTTP status below.
    }

    const error = new Error(
      `${label}: HTTP ${response.status}${body ? ` — ${body.slice(0, 240).replace(/\s+/g, " ")}` : ""}`,
    );
    error.status = response.status;
    error.code = apiCode;
    lastError = error;

    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === RETRIES) {
      throw error;
    }
    await delay(500 * 2 ** (attempt - 1));
  }

  throw lastError ?? new Error(`${label}: request failed.`);
}

function getBundledCatalog(source) {
  const imageUrls = new Set();
  for (const match of source.matchAll(/\bimage\s*:\s*"([^"]+)"/g)) {
    imageUrls.add(match[1]);
  }

  const productsBlock = source.match(
    /export const generatedProducts\s*:\s*GeneratedProduct\[\]\s*=\s*\[([\s\S]*?)\n\];/,
  );
  const productCount = productsBlock
    ? [...productsBlock[1].matchAll(/\bslug\s*:/g)].length
    : 0;

  return { imageUrls, productCount };
}

function normalizeUploadUrl(raw, base) {
  let parsed;
  try {
    parsed = new URL(raw, base);
  } catch {
    return null;
  }

  assertFirstParty(parsed);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(parsed.pathname);
  } catch {
    throw new Error(`Invalid encoded image path: ${raw}`);
  }

  if (!decodedPath.startsWith("/wp-content/uploads/")) return null;
  if (decodedPath.includes("\\") || decodedPath.includes("\0")) {
    throw new Error(`Unsafe image path: ${raw}`);
  }

  const segments = decodedPath.split("/");
  if (segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error(`Unsafe image path: ${raw}`);
  }

  const extension = path.extname(decodedPath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(extension)) return null;

  parsed.search = "";
  parsed.hash = "";
  return parsed.href;
}

async function getWooCommerceProductImages(base) {
  const imageUrls = new Set();
  let productCount = 0;

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const endpoint = new URL("/wp-json/wc/store/v1/products", base);
    endpoint.searchParams.set("per_page", String(PER_PAGE));
    endpoint.searchParams.set("page", String(page));
    endpoint.searchParams.set("_fields", "id,slug,images");

    let response;
    try {
      response = await requestWithRetry(endpoint, `WooCommerce product page ${page}`);
    } catch (error) {
      // WordPress returns this when the requested page is just past the end of
      // a result set whose size is an exact multiple of PER_PAGE.
      if (page > 1 && error.status === 400 && error.code === "rest_post_invalid_page_number") {
        break;
      }
      throw error;
    }

    const products = await response.json();
    if (!Array.isArray(products)) {
      throw new Error(`WooCommerce product page ${page} did not return a JSON array.`);
    }
    if (products.length === 0) break;

    productCount += products.length;
    for (const product of products) {
      if (!Array.isArray(product.images)) continue;
      for (const image of product.images) {
        const source = image?.src ?? image?.source_url;
        if (typeof source !== "string" || !source) continue;
        const normalized = normalizeUploadUrl(source, base);
        if (normalized) imageUrls.add(normalized);
      }
    }

    const headerPageCount = Number(response.headers.get("X-WP-TotalPages"));
    if (headerPageCount > 0 && page >= headerPageCount) break;
    if (products.length < PER_PAGE) break;
  }

  if (productCount === 0 || imageUrls.size === 0) {
    throw new Error("The WooCommerce Store API returned no product images; gallery coverage cannot be verified.");
  }

  return { imageUrls, productCount };
}

function localPathForUpload(imageUrl) {
  const url = new URL(imageUrl);
  assertFirstParty(url);
  const decodedPath = decodeURIComponent(url.pathname);
  const destination = path.resolve(PUBLIC_DIR, decodedPath.slice(1));
  const uploadsRoot = `${path.resolve(UPLOADS_DIR)}${path.sep}`;
  if (!destination.startsWith(uploadsRoot)) {
    throw new Error(`Refusing to write outside public/wp-content/uploads: ${imageUrl}`);
  }
  return destination;
}

async function fileExists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

async function downloadImage(imageUrl, base) {
  const destination = localPathForUpload(imageUrl);
  if (await fileExists(destination)) return { skipped: true, bytes: 0 };

  const response = await requestWithRetry(imageUrl, `Image ${imageUrl}`, {
    Referer: `${base}/`,
  });
  const contentType = (response.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (!contentType.startsWith("image/")) {
    await response.body?.cancel();
    throw new Error(`Expected an image from ${imageUrl}, received ${contentType || "unknown content type"}.`);
  }

  const contentLength = Number(response.headers.get("content-length"));
  if (contentLength > MAX_IMAGE_BYTES) {
    await response.body?.cancel();
    throw new Error(`Image exceeds the ${MAX_IMAGE_BYTES / 1024 / 1024} MB safety limit: ${imageUrl}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) throw new Error(`The image response was empty: ${imageUrl}`);
  if (bytes.length > MAX_IMAGE_BYTES) {
    throw new Error(`Image exceeds the ${MAX_IMAGE_BYTES / 1024 / 1024} MB safety limit: ${imageUrl}`);
  }

  await mkdir(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.part-${process.pid}-${Date.now()}`;
  try {
    await writeFile(temporary, bytes, { flag: "wx" });
    await rename(temporary, destination);
  } catch (error) {
    await rm(temporary, { force: true });
    throw error;
  }

  return { skipped: false, bytes: bytes.length };
}

async function main() {
  const base = legacyOrigin();
  const source = await readFile(CATALOG_FILE, "utf8");
  const catalog = getBundledCatalog(source);
  const urls = new Set();
  let apiProductCount = 0;
  let apiError = null;

  for (const raw of catalog.imageUrls) {
    const normalized = normalizeUploadUrl(raw, base);
    if (normalized) urls.add(normalized);
  }

  try {
    const api = await getWooCommerceProductImages(base);
    apiProductCount = api.productCount;
    for (const imageUrl of api.imageUrls) urls.add(imageUrl);
    if (api.productCount < catalog.productCount) {
      throw new Error(
        `The Store API listed ${api.productCount} products, fewer than the ${catalog.productCount} products in the bundled catalog.`,
      );
    }
    console.log(
      `WordPress Store API: ${api.productCount} products, ${api.imageUrls.size} distinct gallery images.`,
    );
  } catch (error) {
    apiError = error;
    console.error(`Could not read the WordPress product/gallery API: ${error.message}`);
  }

  console.log(
    `Bundled catalog: ${catalog.productCount} products, ${catalog.imageUrls.size} distinct image URLs.`,
  );
  console.log(`Mirroring ${urls.size} first-party files into public/wp-content/uploads/.`);
  console.log("The downloader uses no outside image sources and creates no image files.\n");

  const images = [...urls];
  const failures = [];
  let cursor = 0;
  let finished = 0;
  let downloaded = 0;
  let skipped = 0;
  let totalBytes = 0;

  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= images.length) return;

      const imageUrl = images[index];
      try {
        const result = await downloadImage(imageUrl, base);
        if (result.skipped) skipped += 1;
        else {
          downloaded += 1;
          totalBytes += result.bytes;
        }
      } catch (error) {
        failures.push({ imageUrl, message: error.message });
        console.error(`FAILED ${imageUrl}: ${error.message}`);
      }

      finished += 1;
      if (finished % 25 === 0 || finished === images.length) {
        console.log(`Progress: ${finished}/${images.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log("\nImage mirror summary");
  console.log(`  Downloaded: ${downloaded}`);
  console.log(`  Already present: ${skipped}`);
  console.log(`  Failed: ${failures.length}`);
  console.log(`  New data: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  WordPress products listed: ${apiProductCount}`);

  if (failures.length) {
    const reportPath = path.join(ROOT, "product-image-download-failures.txt");
    const report = failures.map(({ imageUrl, message }) => `${imageUrl}\n  ${message}`).join("\n");
    await writeFile(reportPath, `${report}\n`, "utf8");
    console.error(`Failed URL report written to ${path.relative(ROOT, reportPath)}.`);
  }

  if (apiError || failures.length) {
    console.error(
      "\nDo not switch DNS yet. Resolve the API/download failures and rerun this command first.",
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    "\nAll discovered product photos are local. Add public/wp-content/uploads to the deployment, verify the Vercel URLs, then switch DNS.",
  );
}

main().catch((error) => {
  console.error(`Product image mirror stopped: ${error.message}`);
  process.exitCode = 1;
});
