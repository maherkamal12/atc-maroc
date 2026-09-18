import { sql } from "drizzle-orm";
import { db } from "@/db";
import { categories, posts, products, services } from "@/db/schema";
import { postSeed, serviceSeed } from "./seed-data";
import { generatedCategories, generatedProducts } from "./products.generated";

const FEATURED_SLUGS = [
  "alfa-545w-half-cut-gunes-paneli",
  "tg-inverter-031-growatt-5kva-5000w-trifaze-hibrit-akilli-inverter",
  "tg-aku-021-pylontech-3-5kwh-lifepo4-lityum-aku",
  "tg-solar-sarj-kontol-cihazi-046-victron-smartsolar-mppt-100-50ah-12-24-volt",
  "tg-kablokonnektor-005-mc4-konnektor-uclu-baglanti-seti-1",
  "tg-kombi-016-proteus-premix-30-kw-yogusmali",
  "tg-dalgic-pompa-053-48-volt-dc-solar-gunes-enerjili-70mm-dis-cap-650-watt-panolu-80mss-3m3-h",
  "lexron-625w-half-cut-gunes-paneli",
];

let seedPromise: Promise<void> | null = null;

async function tableCount(table: typeof services | typeof categories | typeof products | typeof posts) {
  const rows = await db.select({ value: sql<number>`count(*)::int` }).from(table);
  return rows[0]?.value ?? 0;
}

async function seedNow() {
  const [serviceCount, categoryCount, productCount, postCount] = await Promise.all([
    tableCount(services),
    tableCount(categories),
    tableCount(products),
    tableCount(posts),
  ]);

  if (serviceCount === 0) {
    await db.insert(services).values(serviceSeed).onConflictDoNothing();
  }

  if (categoryCount === 0) {
    await db.insert(categories).values(generatedCategories).onConflictDoNothing();
  }

  if (productCount === 0) {
    const bySlug = new Map(generatedCategories.map((category) => [category.slug, category]));
    await db
      .insert(products)
      .values(
        generatedProducts.map((product, index) => {
          const category = bySlug.get(product.categorySlug);
          return {
            slug: product.slug,
            categorySlug: product.categorySlug,
            nameAr: product.nameAr,
            nameFr: product.nameFr,
            descAr: category ? `${product.nameAr} — ${category.descAr}` : product.nameAr,
            descFr: category ? `${product.nameFr} — ${category.descFr}` : product.nameFr,
            brand: product.brand,
            image: product.image,
            specsAr: product.specsAr,
            specsFr: product.specsFr,
            featured: FEATURED_SLUGS.includes(product.slug),
            inStock: true,
            sort: index + 1,
          };
        }),
      )
      .onConflictDoNothing();
  }

  if (postCount === 0) {
    const now = Date.now();
    await db
      .insert(posts)
      .values(
        postSeed.map((post, index) => ({
          ...post,
          publishedAt: new Date(now - index * 1000 * 60 * 60 * 24 * 9),
        })),
      )
      .onConflictDoNothing();
  }
}

export function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seedNow().catch((error) => {
      seedPromise = null;
      console.error("[seed] failed:", error);
    });
  }
  return seedPromise;
}
