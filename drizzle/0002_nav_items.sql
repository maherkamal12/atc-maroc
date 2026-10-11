CREATE TABLE IF NOT EXISTS "nav_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"href" varchar(240) NOT NULL,
	"label_ar" text NOT NULL,
	"label_fr" text NOT NULL,
	"parent_href" varchar(240) DEFAULT '' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL
);
