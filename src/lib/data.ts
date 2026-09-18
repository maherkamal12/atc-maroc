import { and, asc, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
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
import { postSeed, serviceSeed } from "@/db/seed-data";
import { generatedCategories, generatedProducts } from "@/db/products.generated";

/* ---------- fallbacks (used when the database is unavailable) ---------- */

const fallbackServices: Service[] = serviceSeed.map((item, index) => ({ id: index + 1, ...item }));

const fallbackCategories: Category[] = generatedCategories.map((item, index) => ({
  id: index + 1,
  ...item,
}));

const categoryBySlug = new Map(generatedCategories.map((category) => [category.slug, category]));

const fallbackProducts: Product[] = generatedProducts.map((item, index) => ({
  id: index + 1,
  descAr: item.nameAr,
  descFr: item.nameFr,
  featured: false,
  inStock: true,
  sort: index + 1,
  createdAt: new Date(Date.now() - index * 3600_000),
  ...item,
}));

const fallbackPosts: Post[] = postSeed.map((item, index) => ({
  id: index + 1,
  publishedAt: new Date(Date.now() - index * 9 * 86400_000),
  ...item,
}));

/* ---------------------------- public helpers --------------------------- */

export function serviceTitle(service: Service, locale: string) {
  return locale === "fr" ? service.titleFr : service.titleAr;
}
export function serviceShort(service: Service, locale: string) {
  return locale === "fr" ? service.shortFr : service.shortAr;
}
export function serviceBody(service: Service, locale: string) {
  return locale === "fr" ? service.bodyFr : service.bodyAr;
}
export function serviceBullets(service: Service, locale: string): string[] {
  return (locale === "fr" ? service.bulletsFr : service.bulletsAr).split("|").filter(Boolean);
}

export function categoryName(category: Category, locale: string) {
  return locale === "fr" ? category.nameFr : category.nameAr;
}
export function categoryDesc(category: Category, locale: string) {
  return locale === "fr" ? category.descFr : category.descAr;
}

export function productName(product: Product, locale: string) {
  return locale === "fr" ? product.nameFr : product.nameAr;
}
export function productDesc(product: Product, locale: string) {
  return locale === "fr" ? product.descFr : product.descAr;
}
export function productSpecs(product: Product, locale: string): string[] {
  return (locale === "fr" ? product.specsFr : product.specsAr).split("|").filter(Boolean);
}

export function postTitle(post: Post, locale: string) {
  return locale === "fr" ? post.titleFr : post.titleAr;
}
export function postExcerpt(post: Post, locale: string) {
  return locale === "fr" ? post.excerptFr : post.excerptAr;
}
export function postBody(post: Post, locale: string) {
  return locale === "fr" ? post.bodyFr : post.bodyAr;
}
export function postTag(post: Post, locale: string) {
  return locale === "fr" ? post.tagFr : post.tagAr;
}

/* ------------------------------- queries ------------------------------- */

export async function getServices(): Promise<Service[]> {
  await ensureSeeded();
  try {
    const rows = await db.select().from(services).orderBy(asc(services.sort));
    return rows.length ? rows : fallbackServices;
  } catch (error) {
    console.error("[data] getServices", error);
    return fallbackServices;
  }
}

export async function getService(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((service) => service.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  await ensureSeeded();
  try {
    const rows = await db.select().from(categories).orderBy(asc(categories.sort));
    return rows.length ? rows : fallbackCategories;
  } catch (error) {
    console.error("[data] getCategories", error);
    return fallbackCategories;
  }
}

export type ProductQuery = {
  category?: string;
  q?: string;
  sort?: "newest" | "name";
  featured?: boolean;
  limit?: number;
};

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pages: number;
  pageSize: number;
};

function filterFallback(query: ProductQuery) {
  let list = [...fallbackProducts];
  if (query.category) list = list.filter((item) => item.categorySlug === query.category);
  if (query.featured) list = list.filter((item) => item.featured);
  if (query.q?.trim()) {
    const term = (query.q ?? "").trim().toLowerCase();
    list = list.filter((item) =>
      [item.nameAr, item.nameFr, item.brand, item.categorySlug].join(" ").toLowerCase().includes(term),
    );
  }
  if (query.sort === "name") {
    list.sort((a, b) => a.nameFr.localeCompare(b.nameFr, "fr"));
  } else {
    list.sort((a, b) => a.id - b.id);
  }
  return list;
}

/** Paged catalog listing (no prices — quote only). */
export async function getProductsPage(
  query: ProductQuery & { page?: number; pageSize?: number },
): Promise<ProductPage> {
  await ensureSeeded();
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(60, Math.max(4, query.pageSize ?? 24));

  try {
    const filters = [];
    if (query.category) filters.push(eq(products.categorySlug, query.category));
    if (query.featured) filters.push(eq(products.featured, true));
    if (query.q?.trim()) {
      const term = `%${query.q.trim()}%`;
      filters.push(
        or(
          ilike(products.nameAr, term),
          ilike(products.nameFr, term),
          ilike(products.brand, term),
          ilike(products.specsAr, term),
          ilike(products.specsFr, term),
        )!,
      );
    }
    const where = filters.length ? and(...filters) : undefined;
    const orderBy = query.sort === "name" ? asc(products.nameFr) : desc(products.id);

    const totalRows = await db.select({ value: count() }).from(products).where(where);
    const total = Number(totalRows[0]?.value ?? 0);
    const items = await db
      .select()
      .from(products)
      .where(where)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    if (total === 0 && !query.category && !query.q) throw new Error("empty");
    return {
      items,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      pageSize,
    };
  } catch (error) {
    console.error("[data] getProductsPage", error);
    const list = filterFallback(query);
    const start = (page - 1) * pageSize;
    return {
      items: list.slice(start, start + pageSize),
      total: list.length,
      page,
      pages: Math.max(1, Math.ceil(list.length / pageSize)),
      pageSize,
    };
  }
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  await ensureSeeded();
  const { category, q, sort = "newest", featured, limit } = query;
  try {
    const filters = [];
    if (category) filters.push(eq(products.categorySlug, category));
    if (featured) filters.push(eq(products.featured, true));
    if (q && q.trim()) {
      const term = `%${q.trim()}%`;
      filters.push(
        or(
          ilike(products.nameAr, term),
          ilike(products.nameFr, term),
          ilike(products.brand, term),
          ilike(products.specsAr, term),
          ilike(products.specsFr, term),
        )!,
      );
    }

    const base = db
      .select()
      .from(products)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(sort === "name" ? asc(products.nameFr) : desc(products.id));

    const rows = limit ? await base.limit(limit) : await base;
    if (rows.length) return rows;
    if (category || q || featured) return [];
    throw new Error("empty");
  } catch (error) {
    console.error("[data] getProducts", error);
    const list = filterFallback(query);
    return limit ? list.slice(0, limit) : list;
  }
}

export async function countProductsByCategory(): Promise<Record<string, number>> {
  await ensureSeeded();
  try {
    const rows = await db
      .select({ slug: products.categorySlug, value: count() })
      .from(products)
      .groupBy(products.categorySlug);
    return rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.slug] = Number(row.value);
      return acc;
    }, {});
  } catch {
    return generatedProducts.reduce<Record<string, number>>((acc, item) => {
      acc[item.categorySlug] = (acc[item.categorySlug] ?? 0) + 1;
      return acc;
    }, {});
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  await ensureSeeded();
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (rows[0]) return rows[0];
  } catch (error) {
    console.error("[data] getProduct", error);
  }
  return fallbackProducts.find((item) => item.slug === slug) ?? null;
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4,
): Promise<Product[]> {
  const list = await getProducts({ category: categorySlug, limit: limit + 1 });
  return list.filter((item) => item.slug !== excludeSlug).slice(0, limit);
}

export async function getPosts(limit?: number): Promise<Post[]> {
  await ensureSeeded();
  try {
    const base = db.select().from(posts).orderBy(desc(posts.publishedAt));
    const rows = limit ? await base.limit(limit) : await base;
    if (rows.length) return rows;
    throw new Error("empty");
  } catch (error) {
    console.error("[data] getPosts", error);
    return limit ? fallbackPosts.slice(0, limit) : fallbackPosts;
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const list = await getPosts();
  return list.find((post) => post.slug === slug) ?? null;
}

/* ------------------------------- mutations ----------------------------- */

export async function createMessage(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  locale?: string;
}): Promise<ContactMessage> {
  await ensureSeeded();
  const [row] = await db
    .insert(contactMessages)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      subject: input.subject ?? "",
      message: input.message ?? "",
      locale: input.locale ?? "ar",
    })
    .returning();
  return row;
}

export async function listMessages(): Promise<ContactMessage[]> {
  try {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(200);
  } catch (error) {
    console.error("[data] listMessages", error);
    return [];
  }
}

export type NewOrderInput = {
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  note: string;
  locale: string;
  items: { slug: string; quantity: number }[];
};

/** Creates a quote request. No amounts: prices are communicated on request. */
export async function createOrder(input: NewOrderInput) {
  await ensureSeeded();
  const all = await getProducts();
  const resolved = input.items
    .map((item) => {
      const product = all.find((candidate) => candidate.slug === item.slug);
      if (!product) return null;
      return { product, quantity: Math.max(1, Math.min(99, item.quantity)) };
    })
    .filter((entry): entry is { product: Product; quantity: number } => entry !== null);

  const itemsCount = resolved.reduce((sum, entry) => sum + entry.quantity, 0);
  const reference = `ATC-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.floor(
    Math.random() * 90 + 10,
  )}`;

  const [order] = await db
    .insert(orders)
    .values({
      reference,
      customerName: input.customerName,
      email: input.email,
      phone: input.phone,
      city: input.city,
      address: input.address,
      note: input.note,
      itemsCount,
      locale: input.locale,
      status: "new",
    })
    .returning();

  if (resolved.length) {
    await db.insert(orderItems).values(
      resolved.map((entry) => ({
        orderId: order.id,
        productId: entry.product.id,
        slug: entry.product.slug,
        nameAr: entry.product.nameAr,
        nameFr: entry.product.nameFr,
        quantity: entry.quantity,
      })),
    );
  }

  return { order, itemsCount };
}

export async function listOrders(): Promise<Order[]> {
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(200);
  } catch (error) {
    console.error("[data] listOrders", error);
    return [];
  }
}

export async function listAllOrderItems(): Promise<OrderItem[]> {
  try {
    return await db.select().from(orderItems).limit(1000);
  } catch (error) {
    console.error("[data] listAllOrderItems", error);
    return [];
  }
}

export async function updateOrderStatus(id: number, status: string) {
  await db.update(orders).set({ status }).where(eq(orders.id, id));
}

export async function markMessageRead(id: number, isRead: boolean) {
  await db.update(contactMessages).set({ isRead }).where(eq(contactMessages.id, id));
}

export async function dashboardStats() {
  try {
    const [messageRow] = await db.select({ value: sql<number>`count(*)::int` }).from(contactMessages);
    const [unreadRow] = await db
      .select({ value: sql<number>`count(*)::int` })
      .from(contactMessages)
      .where(eq(contactMessages.isRead, false));
    const [orderRow] = await db.select({ value: sql<number>`count(*)::int` }).from(orders);
    const [itemRow] = await db.select({ value: sql<number>`count(*)::int` }).from(orderItems);
    const [productRow] = await db.select({ value: sql<number>`count(*)::int` }).from(products);
    const [categoryRow] = await db.select({ value: sql<number>`count(*)::int` }).from(categories);
    return {
      messages: messageRow?.value ?? 0,
      unread: unreadRow?.value ?? 0,
      orders: orderRow?.value ?? 0,
      orderItems: itemRow?.value ?? 0,
      products: productRow?.value ?? 0,
      categories: categoryRow?.value ?? 0,
    };
  } catch (error) {
    console.error("[data] dashboardStats", error);
    return {
      messages: 0,
      unread: 0,
      orders: 0,
      orderItems: 0,
      products: generatedProducts.length,
      categories: generatedCategories.length,
    };
  }
}

export { categoryBySlug };
