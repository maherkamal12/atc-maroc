import { asc, count, desc, eq, inArray } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import {
  categories,
  contactMessages,
  orderItems,
  orders,
  posts,
  products,
  services,
  type Category,
  type ContactMessage,
  type Order,
  type OrderItem,
  type Post,
  type Product,
  type Service,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { siteSettings } from "@/db/schema";

export type WriteResult = { ok: true } | { ok: false; error: string };

const NO_DB: WriteResult = {
  ok: false,
  error: "Base de données indisponible. Les modifications n'ont pas été enregistrées.",
};

function fail(label: string, error: unknown): WriteResult {
  markDatabaseUnavailable(label, error);
  return {
    ok: false,
    error: error instanceof Error ? error.message : "Erreur base de données.",
  };
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

async function uniqueSlug(table: typeof products | typeof categories | typeof services | typeof posts, base: string) {
  let slug = slugify(base) || `item-${Date.now()}`;
  for (let i = 0; i < 20; i++) {
    const candidate = i === 0 ? slug : `${slug}-${i + 1}`;
    const rows = await db.select({ id: table.id }).from(table).where(eq(table.slug, candidate)).limit(1);
    if (!rows.length) return candidate;
  }
  return `${slug}-${Date.now()}`;
}

/* -------------------------------- products -------------------------------- */

export type ProductInput = {
  slug?: string;
  categorySlug: string;
  nameAr: string;
  nameFr: string;
  descAr: string;
  descFr: string;
  brand: string;
  image: string;
  specsAr: string;
  specsFr: string;
  featured: boolean;
  inStock: boolean;
  sort: number;
};

export async function createProduct(input: ProductInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const slug = await uniqueSlug(products, input.slug || input.nameFr || input.nameAr);
    await db.insert(products).values({ ...input, slug });
    return { ok: true };
  } catch (error) {
    return fail("createProduct", error);
  }
}

export async function updateProduct(id: number, input: ProductInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db
      .update(products)
      .set({
        categorySlug: input.categorySlug,
        nameAr: input.nameAr,
        nameFr: input.nameFr,
        descAr: input.descAr,
        descFr: input.descFr,
        brand: input.brand,
        image: input.image,
        specsAr: input.specsAr,
        specsFr: input.specsFr,
        featured: input.featured,
        inStock: input.inStock,
        sort: input.sort,
        ...(input.slug ? { slug: slugify(input.slug) } : {}),
      })
      .where(eq(products.id, id));
    return { ok: true };
  } catch (error) {
    return fail("updateProduct", error);
  }
}

export async function deleteProduct(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.delete(products).where(eq(products.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deleteProduct", error);
  }
}

export async function duplicateProduct(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
    if (!row) return { ok: false, error: "Produit introuvable." };
    const slug = await uniqueSlug(products, `${row.slug}-copie`);
    const { id: _id, createdAt: _c, ...rest } = row;
    await db.insert(products).values({
      ...rest,
      slug,
      nameFr: `${row.nameFr} (copie)`,
      nameAr: `${row.nameAr} (نسخة)`,
      featured: false,
    });
    return { ok: true };
  } catch (error) {
    return fail("duplicateProduct", error);
  }
}

export async function bulkUpdateProducts(
  ids: number[],
  patch: { featured?: boolean; inStock?: boolean; categorySlug?: string },
): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  if (!ids.length) return { ok: false, error: "Aucun produit sélectionné." };
  try {
    await db.update(products).set(patch).where(inArray(products.id, ids));
    return { ok: true };
  } catch (error) {
    return fail("bulkUpdateProducts", error);
  }
}

export async function bulkDeleteProducts(ids: number[]): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  if (!ids.length) return { ok: false, error: "Aucun produit sélectionné." };
  try {
    await db.delete(products).where(inArray(products.id, ids));
    return { ok: true };
  } catch (error) {
    return fail("bulkDeleteProducts", error);
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getProductById", error);
    return null;
  }
}

export async function imageUsageCounts(): Promise<Record<string, number>> {
  await ensureSeeded();
  if (!canQueryDatabase()) return {};
  try {
    const rows = await db
      .select({ image: products.image, value: count() })
      .from(products)
      .groupBy(products.image);
    return rows.reduce<Record<string, number>>((acc, row) => {
      if (row.image) acc[row.image] = Number(row.value);
      return acc;
    }, {});
  } catch (error) {
    markDatabaseUnavailable("imageUsageCounts", error);
    return {};
  }
}

export async function listAllProductsForExport(): Promise<Product[]> {
  await ensureSeeded();
  if (!canQueryDatabase()) return [];
  try {
    return await db.select().from(products).orderBy(asc(products.id));
  } catch (error) {
    markDatabaseUnavailable("listAllProductsForExport", error);
    return [];
  }
}

/* ------------------------------- categories ------------------------------- */

export type CategoryInput = {
  slug?: string;
  nameAr: string;
  nameFr: string;
  descAr: string;
  descFr: string;
  image: string;
  icon: string;
  sort: number;
};

export async function createCategory(input: CategoryInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const slug = await uniqueSlug(categories, input.slug || input.nameFr);
    await db.insert(categories).values({ ...input, slug });
    return { ok: true };
  } catch (error) {
    return fail("createCategory", error);
  }
}

export async function updateCategory(id: number, input: CategoryInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db
      .update(categories)
      .set({
        nameAr: input.nameAr,
        nameFr: input.nameFr,
        descAr: input.descAr,
        descFr: input.descFr,
        image: input.image,
        icon: input.icon,
        sort: input.sort,
        slug: input.slug ? slugify(input.slug) : undefined,
      })
      .where(eq(categories.id, id));
    return { ok: true };
  } catch (error) {
    return fail("updateCategory", error);
  }
}

export async function deleteCategory(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const [cat] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!cat) return { ok: false, error: "Catégorie introuvable." };
    const [row] = await db
      .select({ value: count() })
      .from(products)
      .where(eq(products.categorySlug, cat.slug));
    if (Number(row?.value ?? 0) > 0) {
      return {
        ok: false,
        error: `Impossible de supprimer : ${row.value} produit(s) utilisent encore cette catégorie.`,
      };
    }
    await db.delete(categories).where(eq(categories.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deleteCategory", error);
  }
}

export async function getCategoryById(id: number): Promise<Category | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getCategoryById", error);
    return null;
  }
}

/* -------------------------------- services -------------------------------- */

export type ServiceInput = {
  slug?: string;
  titleAr: string;
  titleFr: string;
  shortAr: string;
  shortFr: string;
  bodyAr: string;
  bodyFr: string;
  bulletsAr: string;
  bulletsFr: string;
  image: string;
  icon: string;
  sort: number;
};

export async function createService(input: ServiceInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const slug = await uniqueSlug(services, input.slug || input.titleFr);
    await db.insert(services).values({ ...input, slug });
    return { ok: true };
  } catch (error) {
    return fail("createService", error);
  }
}

export async function updateService(id: number, input: ServiceInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db
      .update(services)
      .set({
        titleAr: input.titleAr,
        titleFr: input.titleFr,
        shortAr: input.shortAr,
        shortFr: input.shortFr,
        bodyAr: input.bodyAr,
        bodyFr: input.bodyFr,
        bulletsAr: input.bulletsAr,
        bulletsFr: input.bulletsFr,
        image: input.image,
        icon: input.icon,
        sort: input.sort,
        slug: input.slug ? slugify(input.slug) : undefined,
      })
      .where(eq(services.id, id));
    return { ok: true };
  } catch (error) {
    return fail("updateService", error);
  }
}

export async function deleteService(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.delete(services).where(eq(services.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deleteService", error);
  }
}

export async function getServiceById(id: number): Promise<Service | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getServiceById", error);
    return null;
  }
}

/* ---------------------------------- posts --------------------------------- */

export type PostInput = {
  slug?: string;
  titleAr: string;
  titleFr: string;
  excerptAr: string;
  excerptFr: string;
  bodyAr: string;
  bodyFr: string;
  image: string;
  tagAr: string;
  tagFr: string;
  readMinutes: number;
  publishedAt: Date;
  published: boolean;
};

export async function createPost(input: PostInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    const slug = await uniqueSlug(posts, input.slug || input.titleFr);
    await db.insert(posts).values({ ...input, slug });
    return { ok: true };
  } catch (error) {
    return fail("createPost", error);
  }
}

export async function updatePost(id: number, input: PostInput): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db
      .update(posts)
      .set({
        titleAr: input.titleAr,
        titleFr: input.titleFr,
        excerptAr: input.excerptAr,
        excerptFr: input.excerptFr,
        bodyAr: input.bodyAr,
        bodyFr: input.bodyFr,
        image: input.image,
        tagAr: input.tagAr,
        tagFr: input.tagFr,
        readMinutes: input.readMinutes,
        publishedAt: input.publishedAt,
        published: input.published,
        slug: input.slug ? slugify(input.slug) : undefined,
      })
      .where(eq(posts.id, id));
    return { ok: true };
  } catch (error) {
    return fail("updatePost", error);
  }
}

export async function deletePost(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.delete(posts).where(eq(posts.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deletePost", error);
  }
}

export async function listAdminPosts(): Promise<Post[]> {
  await ensureSeeded();
  if (!canQueryDatabase()) return [];
  try {
    return await db.select().from(posts).orderBy(desc(posts.publishedAt));
  } catch (error) {
    markDatabaseUnavailable("listAdminPosts", error);
    return [];
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getPostById", error);
    return null;
  }
}

/* --------------------------- messages & orders ---------------------------- */

export async function getMessageById(id: number): Promise<ContactMessage | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getMessageById", error);
    return null;
  }
}

export async function archiveMessage(id: number, archived: boolean): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.update(contactMessages).set({ archived }).where(eq(contactMessages.id, id));
    return { ok: true };
  } catch (error) {
    return fail("archiveMessage", error);
  }
}

export async function deleteMessage(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deleteMessage", error);
  }
}

export async function getOrderWithItems(id: number): Promise<{ order: Order; items: OrderItem[] } | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (!order) return null;
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { order, items };
  } catch (error) {
    markDatabaseUnavailable("getOrderWithItems", error);
    return null;
  }
}

export async function archiveOrder(id: number, archived: boolean): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.update(orders).set({ archived }).where(eq(orders.id, id));
    return { ok: true };
  } catch (error) {
    return fail("archiveOrder", error);
  }
}

export async function deleteOrder(id: number): Promise<WriteResult> {
  await ensureSeeded();
  if (!canQueryDatabase()) return NO_DB;
  try {
    await db.delete(orderItems).where(eq(orderItems.orderId, id));
    await db.delete(orders).where(eq(orders.id, id));
    return { ok: true };
  } catch (error) {
    return fail("deleteOrder", error);
  }
}

/* --------------------------------- media ---------------------------------- */

export type MediaRef = {
  url: string;
  kind: "product" | "category" | "service" | "post" | "settings";
  label: string;
  href: string;
};

export async function listMediaRefs(): Promise<MediaRef[]> {
  await ensureSeeded();
  if (!canQueryDatabase()) return [];
  try {
    const refs: MediaRef[] = [];
    const prods = await db.select({ id: products.id, nameFr: products.nameFr, image: products.image }).from(products);
    for (const row of prods) {
      if (row.image) refs.push({ url: row.image, kind: "product", label: row.nameFr, href: `/admin/products/${row.id}` });
    }
    const cats = await db.select({ id: categories.id, nameFr: categories.nameFr, image: categories.image }).from(categories);
    for (const row of cats) {
      if (row.image) refs.push({ url: row.image, kind: "category", label: row.nameFr, href: `/admin/categories/${row.id}` });
    }
    const svcs = await db.select({ id: services.id, titleFr: services.titleFr, image: services.image }).from(services);
    for (const row of svcs) {
      if (row.image) refs.push({ url: row.image, kind: "service", label: row.titleFr, href: `/admin/services/${row.id}` });
    }
    const blog = await db.select({ id: posts.id, titleFr: posts.titleFr, image: posts.image }).from(posts);
    for (const row of blog) {
      if (row.image) refs.push({ url: row.image, kind: "post", label: row.titleFr, href: `/admin/blog/${row.id}` });
    }
    const settings = await db.select().from(siteSettings);
    for (const row of settings) {
      if (row.value.startsWith("http")) {
        refs.push({ url: row.value, kind: "settings", label: row.key, href: "/admin/settings" });
      }
    }
    return refs;
  } catch (error) {
    markDatabaseUnavailable("listMediaRefs", error);
    return [];
  }
}

export { slugify };
