import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleFr: text("title_fr").notNull(),
  shortAr: text("short_ar").notNull(),
  shortFr: text("short_fr").notNull(),
  bodyAr: text("body_ar").notNull().default(""),
  bodyFr: text("body_fr").notNull().default(""),
  image: text("image").notNull().default(""),
  icon: varchar("icon", { length: 16 }).notNull().default("⚡"),
  bulletsAr: text("bullets_ar").notNull().default(""),
  bulletsFr: text("bullets_fr").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameFr: text("name_fr").notNull(),
  descAr: text("desc_ar").notNull().default(""),
  descFr: text("desc_fr").notNull().default(""),
  image: text("image").notNull().default(""),
  icon: varchar("icon", { length: 16 }).notNull().default("📦"),
  sort: integer("sort").notNull().default(0),
});

/** Catalog products imported from atc-maroc.com — no prices, quote only. */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  categorySlug: varchar("category_slug", { length: 140 }).notNull(),
  nameAr: text("name_ar").notNull(),
  nameFr: text("name_fr").notNull(),
  descAr: text("desc_ar").notNull().default(""),
  descFr: text("desc_fr").notNull().default(""),
  brand: varchar("brand", { length: 120 }).notNull().default("ATC"),
  image: text("image").notNull().default(""),
  specsAr: text("specs_ar").notNull().default(""),
  specsFr: text("specs_fr").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
  sort: integer("sort").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleFr: text("title_fr").notNull(),
  excerptAr: text("excerpt_ar").notNull().default(""),
  excerptFr: text("excerpt_fr").notNull().default(""),
  bodyAr: text("body_ar").notNull().default(""),
  bodyFr: text("body_fr").notNull().default(""),
  image: text("image").notNull().default(""),
  tagAr: varchar("tag_ar", { length: 80 }).notNull().default(""),
  tagFr: varchar("tag_fr", { length: 80 }).notNull().default(""),
  readMinutes: integer("read_minutes").notNull().default(4),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  published: boolean("published").notNull().default(true),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull().default(""),
  locale: varchar("locale", { length: 5 }).notNull().default("ar"),
  isRead: boolean("is_read").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Quote requests ("demande de devis") — no amounts, prices are given on request. */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  city: text("city").notNull().default(""),
  address: text("address").notNull().default(""),
  note: text("note").notNull().default(""),
  itemsCount: integer("items_count").notNull().default(0),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  locale: varchar("locale", { length: 5 }).notNull().default("ar"),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id"),
  slug: varchar("slug", { length: 200 }).notNull().default(""),
  nameAr: text("name_ar").notNull().default(""),
  nameFr: text("name_fr").notNull().default(""),
  quantity: integer("quantity").notNull().default(1),
});

/** Key/value site-wide settings (contact, SEO, social). Database wins over `src/lib/site.ts`. */
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull().unique(),
  value: text("value").notNull().default(""),
});

/** Bilingual page copy. Empty values fall back to the hardcoded dictionary. */
export const contentBlocks = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 160 }).notNull().unique(),
  valueAr: text("value_ar").notNull().default(""),
  valueFr: text("value_fr").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type Order = typeof orders.$inferSelect;
/** Public header main menu. Empty table → fallback to `navLinks` in site.ts. */
export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  href: varchar("href", { length: 240 }).notNull(),
  labelAr: text("label_ar").notNull(),
  labelFr: text("label_fr").notNull(),
  parentHref: varchar("parent_href", { length: 240 }).notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/** Custom marketing pages created in /admin/pages (same layout as Design / À propos). */
export const customPages = pgTable("custom_pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleFr: text("title_fr").notNull(),
  subtitleAr: text("subtitle_ar").notNull().default(""),
  subtitleFr: text("subtitle_fr").notNull().default(""),
  heroImage: text("hero_image").notNull().default(""),
  /** JSON array of PageSection */
  sections: text("sections").notNull().default("[]"),
  published: boolean("published").notNull().default(true),
  sort: integer("sort").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Uploaded / registered files for the media library. */
export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  url: text("url").notNull().unique(),
  pathname: text("pathname").notNull().default(""),
  filename: text("filename").notNull().default(""),
  contentType: varchar("content_type", { length: 120 }).notNull().default(""),
  size: integer("size").notNull().default(0),
  storage: varchar("storage", { length: 20 }).notNull().default("url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type NavItem = typeof navItems.$inferSelect;
export type CustomPage = typeof customPages.$inferSelect;
/** Back-office accounts: manager (full) or user (CMS without user admin). */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 80 }).notNull().unique(),
  displayName: text("display_name").notNull().default(""),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
