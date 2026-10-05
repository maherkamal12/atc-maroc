#!/usr/bin/env node
/**
 * Bulk product import: upsert by slug. Never stores prices.
 *
 *   npm run db:import -- file.csv
 *   npm run db:import -- file.csv --dry-run
 *   npm run db:import -- --template
 */
import { readFileSync, writeFileSync } from "node:fs";
import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const template = args.includes("--template");
const file = args.find((a) => !a.startsWith("--"));

const HEADER =
  "slug,category_slug,name_ar,name_fr,desc_ar,desc_fr,brand,image,specs_ar,specs_fr,featured,in_stock,sort";

if (template) {
  writeFileSync("products-template.csv", `${HEADER}\n`);
  console.log("Wrote products-template.csv");
  process.exit(0);
}

if (!file) {
  console.error("Usage: npm run db:import -- file.csv [--dry-run]");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cur = "";
    } else cur += c;
  }
  if (cur || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim()));
}

const raw = readFileSync(file, "utf8");
const table = parseCsv(raw);
const header = table[0].map((h) => h.trim().toLowerCase());
if (header.includes("price") || header.includes("prix")) {
  console.error("Refusing to import: catalog is quote-only, no price column allowed.");
  process.exit(1);
}

const idx = (name) => header.indexOf(name);
const records = table.slice(1).map((cells) => ({
  slug: cells[idx("slug")]?.trim(),
  categorySlug: cells[idx("category_slug")]?.trim(),
  nameAr: cells[idx("name_ar")] ?? "",
  nameFr: cells[idx("name_fr")] ?? "",
  descAr: cells[idx("desc_ar")] ?? "",
  descFr: cells[idx("desc_fr")] ?? "",
  brand: cells[idx("brand")] || "ATC",
  image: cells[idx("image")] ?? "",
  specsAr: cells[idx("specs_ar")] ?? "",
  specsFr: cells[idx("specs_fr")] ?? "",
  featured: /^(1|true|yes|oui)$/i.test(cells[idx("featured")] ?? ""),
  inStock: !/^(0|false|no|non)$/i.test(cells[idx("in_stock")] ?? "true"),
  sort: Number(cells[idx("sort")] ?? 0) || 0,
}));

console.log(`${records.length} row(s)${dryRun ? " (dry-run)" : ""}`);
if (dryRun) {
  console.log(records.slice(0, 5));
  process.exit(0);
}

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  for (const r of records) {
    if (!r.slug || !r.categorySlug) continue;
    await client.query(
      `INSERT INTO products (slug, category_slug, name_ar, name_fr, desc_ar, desc_fr, brand, image, specs_ar, specs_fr, featured, in_stock, sort)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (slug) DO UPDATE SET
         category_slug = EXCLUDED.category_slug,
         name_ar = EXCLUDED.name_ar,
         name_fr = EXCLUDED.name_fr,
         desc_ar = EXCLUDED.desc_ar,
         desc_fr = EXCLUDED.desc_fr,
         brand = EXCLUDED.brand,
         image = EXCLUDED.image,
         specs_ar = EXCLUDED.specs_ar,
         specs_fr = EXCLUDED.specs_fr,
         featured = EXCLUDED.featured,
         in_stock = EXCLUDED.in_stock,
         sort = EXCLUDED.sort`,
      [
        r.slug,
        r.categorySlug,
        r.nameAr,
        r.nameFr,
        r.descAr,
        r.descFr,
        r.brand,
        r.image,
        r.specsAr,
        r.specsFr,
        r.featured,
        r.inStock,
        r.sort,
      ],
    );
  }
  console.log("Import done.");
} finally {
  await client.end();
}
