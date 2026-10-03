CREATE TABLE IF NOT EXISTS "media_assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"pathname" text DEFAULT '' NOT NULL,
	"filename" text DEFAULT '' NOT NULL,
	"content_type" varchar(120) DEFAULT '' NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"storage" varchar(20) DEFAULT 'url' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_assets_url_unique" UNIQUE("url")
);
