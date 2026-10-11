CREATE TABLE IF NOT EXISTS "custom_pages" (
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
);
