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

export type Service = typeof services.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
