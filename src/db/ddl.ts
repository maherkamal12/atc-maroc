/**
 * DDL used to provision a brand new database (a fresh Neon branch, for example)
 * without running any command line tool.
 *
 * This mirrors `src/db/schema.ts` exactly — it was produced with
 * `npx drizzle-kit generate` and every statement is idempotent
 * (`CREATE TABLE IF NOT EXISTS`), so applying it to an existing database is a
 * no-op. `npm run db:push` remains the canonical way to migrate an existing
 * database; this list only ever creates what is missing.
 *
 * Tables are ordered so that referenced tables are created first
 * (`orders` before `order_items`).
 */
export const DDL_STATEMENTS: readonly string[] = [
  `CREATE TABLE IF NOT EXISTS "categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(140) NOT NULL,
    "name_ar" text NOT NULL,
    "name_fr" text NOT NULL,
    "desc_ar" text DEFAULT '' NOT NULL,
    "desc_fr" text DEFAULT '' NOT NULL,
    "image" text DEFAULT '' NOT NULL,
    "icon" varchar(16) DEFAULT '📦' NOT NULL,
    "sort" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "categories_slug_unique" UNIQUE("slug")
  )`,

  `CREATE TABLE IF NOT EXISTS "services" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(140) NOT NULL,
    "title_ar" text NOT NULL,
    "title_fr" text NOT NULL,
    "short_ar" text NOT NULL,
    "short_fr" text NOT NULL,
    "body_ar" text DEFAULT '' NOT NULL,
    "body_fr" text DEFAULT '' NOT NULL,
    "image" text DEFAULT '' NOT NULL,
    "icon" varchar(16) DEFAULT '⚡' NOT NULL,
    "bullets_ar" text DEFAULT '' NOT NULL,
    "bullets_fr" text DEFAULT '' NOT NULL,
    "sort" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "services_slug_unique" UNIQUE("slug")
  )`,

  `CREATE TABLE IF NOT EXISTS "products" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(200) NOT NULL,
    "category_slug" varchar(140) NOT NULL,
    "name_ar" text NOT NULL,
    "name_fr" text NOT NULL,
    "desc_ar" text DEFAULT '' NOT NULL,
    "desc_fr" text DEFAULT '' NOT NULL,
    "brand" varchar(120) DEFAULT 'ATC' NOT NULL,
    "image" text DEFAULT '' NOT NULL,
    "specs_ar" text DEFAULT '' NOT NULL,
    "specs_fr" text DEFAULT '' NOT NULL,
    "featured" boolean DEFAULT false NOT NULL,
    "in_stock" boolean DEFAULT true NOT NULL,
    "sort" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "products_slug_unique" UNIQUE("slug")
  )`,

  `CREATE TABLE IF NOT EXISTS "posts" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(160) NOT NULL,
    "title_ar" text NOT NULL,
    "title_fr" text NOT NULL,
    "excerpt_ar" text DEFAULT '' NOT NULL,
    "excerpt_fr" text DEFAULT '' NOT NULL,
    "body_ar" text DEFAULT '' NOT NULL,
    "body_fr" text DEFAULT '' NOT NULL,
    "image" text DEFAULT '' NOT NULL,
    "tag_ar" varchar(80) DEFAULT '' NOT NULL,
    "tag_fr" varchar(80) DEFAULT '' NOT NULL,
    "read_minutes" integer DEFAULT 4 NOT NULL,
    "published_at" timestamp with time zone DEFAULT now() NOT NULL,
    "published" boolean DEFAULT true NOT NULL,
    CONSTRAINT "posts_slug_unique" UNIQUE("slug")
  )`,

  `CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "phone" text DEFAULT '' NOT NULL,
    "subject" text DEFAULT '' NOT NULL,
    "message" text DEFAULT '' NOT NULL,
    "locale" varchar(5) DEFAULT 'ar' NOT NULL,
    "is_read" boolean DEFAULT false NOT NULL,
    "archived" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS "orders" (
    "id" serial PRIMARY KEY NOT NULL,
    "reference" varchar(24) NOT NULL,
    "customer_name" text NOT NULL,
    "email" text NOT NULL,
    "phone" text DEFAULT '' NOT NULL,
    "city" text DEFAULT '' NOT NULL,
    "address" text DEFAULT '' NOT NULL,
    "note" text DEFAULT '' NOT NULL,
    "items_count" integer DEFAULT 0 NOT NULL,
    "status" varchar(24) DEFAULT 'new' NOT NULL,
    "locale" varchar(5) DEFAULT 'ar' NOT NULL,
    "archived" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "orders_reference_unique" UNIQUE("reference")
  )`,

  `CREATE TABLE IF NOT EXISTS "order_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "order_id" integer NOT NULL,
    "product_id" integer,
    "slug" varchar(200) DEFAULT '' NOT NULL,
    "name_ar" text DEFAULT '' NOT NULL,
    "name_fr" text DEFAULT '' NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id")
      REFERENCES "orders"("id") ON DELETE cascade
  )`,

  `CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar(120) NOT NULL,
    "value" text DEFAULT '' NOT NULL,
    CONSTRAINT "site_settings_key_unique" UNIQUE("key")
  )`,

  `CREATE TABLE IF NOT EXISTS "content_blocks" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar(160) NOT NULL,
    "value_ar" text DEFAULT '' NOT NULL,
    "value_fr" text DEFAULT '' NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "content_blocks_key_unique" UNIQUE("key")
  )`,

  `CREATE TABLE IF NOT EXISTS "nav_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "href" varchar(240) NOT NULL,
    "label_ar" text NOT NULL,
    "label_fr" text NOT NULL,
    "parent_href" varchar(240) DEFAULT '' NOT NULL,
    "sort" integer DEFAULT 0 NOT NULL,
    "visible" boolean DEFAULT true NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS "custom_pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(160) NOT NULL,
    "title_ar" text NOT NULL,
    "title_fr" text NOT NULL,
    "subtitle_ar" text DEFAULT '' NOT NULL,
    "subtitle_fr" text DEFAULT '' NOT NULL,
    "hero_image" text DEFAULT '' NOT NULL,
    "sections" text DEFAULT '[]' NOT NULL,
    "published" boolean DEFAULT true NOT NULL,
    "sort" integer DEFAULT 0 NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "custom_pages_slug_unique" UNIQUE("slug")
  )`,

  `CREATE TABLE IF NOT EXISTS "media_assets" (
    "id" serial PRIMARY KEY NOT NULL,
    "url" text NOT NULL,
    "pathname" text DEFAULT '' NOT NULL,
    "filename" text DEFAULT '' NOT NULL,
    "content_type" varchar(120) DEFAULT '' NOT NULL,
    "size" integer DEFAULT 0 NOT NULL,
    "storage" varchar(20) DEFAULT 'url' NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "media_assets_url_unique" UNIQUE("url")
  )`,

  `CREATE TABLE IF NOT EXISTS "admin_users" (
    "id" serial PRIMARY KEY NOT NULL,
    "username" varchar(80) NOT NULL,
    "display_name" text DEFAULT '' NOT NULL,
    "role" varchar(20) DEFAULT 'user' NOT NULL,
    "password_hash" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "admin_users_username_unique" UNIQUE("username")
  )`,
];

/** Idempotent column additions for databases created before this schema. */
export const DDL_ALTER_STATEMENTS: readonly string[] = [
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "published" boolean DEFAULT true NOT NULL`,
  `ALTER TABLE "contact_messages" ADD COLUMN IF NOT EXISTS "archived" boolean DEFAULT false NOT NULL`,
  `ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "archived" boolean DEFAULT false NOT NULL`,
];

/** Tables the application expects to find, in creation order. */
export const EXPECTED_TABLES: readonly string[] = [
  "categories",
  "services",
  "products",
  "posts",
  "contact_messages",
  "orders",
  "order_items",
  "site_settings",
  "content_blocks",
  "nav_items",
  "custom_pages",
  "media_assets",
  "admin_users",
];
