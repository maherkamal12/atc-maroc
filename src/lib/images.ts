/**
 * Central image handling for the ATC site.
 *
 * The catalog was originally on WordPress at https://atc-maroc.com/wp-content/uploads/…
 * After the Namecheap → Vercel migration the DNS now points to Vercel, so every
 * old URL returned 404 and the browser showed the alt text (the product/file name).
 *
 * This module:
 *  - detects legacy URLs (any atc-maroc.com/wp-content URL or /wp-content/uploads path)
 *  - if `LEGACY_IMAGE_BASE` / `NEXT_PUBLIC_LEGACY_IMAGE_BASE` is set, rewrites legacy
 *    URLs to that host
 *  - otherwise normalizes `https://atc-maroc.com/wp-content/uploads/...` to a relative
 *    `/wp-content/uploads/...` path so the Next.js route `/wp-content/uploads/[...path]`
 *    intercepts it on every domain (production, Vercel preview, localhost) and serves
 *    either a restored file, a DB-uploaded asset, or a product-specific SVG illustration
 */

export const LEGACY_HOST_MARKERS = [
  "atc-maroc.com/wp-content/uploads",
  "atc-maroc.com/wp-content",
  "/wp-content/uploads",
];

export const PLACEHOLDER_GENERIC = "/placeholders/product-generic.svg";

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  "panneaux-solaires": "/placeholders/panneaux-solaires.svg",
  onduleurs: "/placeholders/onduleurs.svg",
  batteries: "/placeholders/batteries.svg",
  "regulateurs-charge": "/placeholders/regulateurs-charge.svg",
  "pompes-solaires": "/placeholders/pompes-solaires.svg",
  "equipements-solaires": "/placeholders/equipements-solaires.svg",
  chauffage: "/placeholders/chauffage.svg",
};

export function isLegacyImage(url: string | null | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return LEGACY_HOST_MARKERS.some((m) => lower.includes(m));
}

export function isExternalHttp(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Map a category slug to its local placeholder */
export function placeholderForCategory(slug?: string | null): string {
  if (slug && CATEGORY_PLACEHOLDERS[slug]) return CATEGORY_PLACEHOLDERS[slug];
  return PLACEHOLDER_GENERIC;
}

/** Return the host override if the user configured one */
export function getLegacyBase(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_LEGACY_IMAGE_BASE ||
    process.env.NEXT_PUBLIC_IMAGE_PROXY ||
    process.env.LEGACY_IMAGE_BASE ||
    process.env.IMAGE_PROXY_BASE ||
    "";
  const trimmed = raw.trim().replace(/\/$/, "");
  return trimmed || undefined;
}

/**
 * Resolve a DB / CMS image URL to a working URL.
 *
 * - Empty URL → category placeholder or generic placeholder.
 * - Legacy WordPress upload (`https://atc-maroc.com/wp-content/uploads/...`):
 *    - When `LEGACY_IMAGE_BASE` is set → rewrite origin to that host.
 *    - Otherwise → strip `https://atc-maroc.com` so it becomes `/wp-content/uploads/...`,
 *      which hits our `/wp-content/uploads/[...path]` route on any domain.
 */
export function resolveImage(
  url: string | null | undefined,
  opts?: { categorySlug?: string | null; fallback?: string },
): string {
  const fallback =
    opts?.fallback ??
    (opts?.categorySlug ? placeholderForCategory(opts.categorySlug) : PLACEHOLDER_GENERIC);

  if (!url || !url.trim()) return fallback;

  const trimmed = url.trim();

  if (isLegacyImage(trimmed)) {
    const base = getLegacyBase();
    if (base) {
      if (trimmed.startsWith("/")) {
        return `${base}${trimmed}`;
      }
      try {
        const u = new URL(trimmed);
        const baseUrl = new URL(base);
        return `${baseUrl.origin}${u.pathname}${u.search}`;
      } catch {
        return trimmed.replace(/^https?:\/\/[^/]+/i, base);
      }
    }

    // Normalize absolute https://(www.)atc-maroc.com/wp-content/... to relative /wp-content/...
    // so the local App Router handler serves it on production, preview, and dev alike.
    if (/^https?:\/\/(?:www\.)?atc-maroc\.com\/wp-content\//i.test(trimmed)) {
      return trimmed.replace(/^https?:\/\/(?:www\.)?atc-maroc\.com/i, "");
    }
    return trimmed;
  }

  return trimmed;
}

export function displayImage(
  url: string | null | undefined,
  categorySlug?: string | null,
): string {
  return resolveImage(url, { categorySlug });
}

/**
 * For wide dark hero banners (PageHero): if the image passed is a square legacy
 * product thumbnail and no legacy host is configured, use a high-res hero background
 * fallback so the banner looks like a full-bleed photograph.
 */
export function heroFallback(url: string | null | undefined, fallback: string): string {
  if (!url || !url.trim()) return fallback;
  if (isLegacyImage(url)) {
    const base = getLegacyBase();
    if (base) return resolveImage(url, { fallback });
    return fallback;
  }
  return url;
}
