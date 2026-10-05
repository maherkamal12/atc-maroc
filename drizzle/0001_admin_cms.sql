CREATE TABLE IF NOT EXISTS "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(120) NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	CONSTRAINT "site_settings_key_unique" UNIQUE("key")
);

CREATE TABLE IF NOT EXISTS "content_blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(160) NOT NULL,
	"value_ar" text DEFAULT '' NOT NULL,
	"value_fr" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_blocks_key_unique" UNIQUE("key")
);

ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "published" boolean DEFAULT true NOT NULL;
ALTER TABLE "contact_messages" ADD COLUMN IF NOT EXISTS "archived" boolean DEFAULT false NOT NULL;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "archived" boolean DEFAULT false NOT NULL;
