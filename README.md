# atc-maroc

Bilingual (Arabic / French) website and product catalog for **ATLAS TECH CONCEPT** (Tanger),
built with Next.js 16 (App Router), Tailwind CSS 4, Drizzle ORM and PostgreSQL.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: fill in DATABASE_URL
npm run dev
```

Open http://localhost:3000 — the site redirects to `/ar` (or `/fr`).

## Environment variables

| Variable               | Required | Purpose                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`         | optional | Postgres connection string. Needed for `/admin`, contact messages and quote requests. Without it the site still builds and serves the bundled catalog read-only. |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical origin used by `sitemap.xml` / `robots.txt` (defaults to `https://atc-maroc.com`). |
| `ADMIN_PASSWORD`       | optional | Password for the `/admin` area (defaults to `atc2026`).                 |

Never commit real credentials: `.env*` files are git-ignored.

## Database

The catalog (`src/db/products.generated.ts`, ~3 200 lines) is bundled with the app, so pages
always render. When a database **is** configured:

1. Create the tables once with Drizzle (the tables are not created automatically):

   ```bash
   npx drizzle-kit push
   # or, without editing drizzle.config.json:
   npx drizzle-kit push --url="$DATABASE_URL"
   ```

2. The app seeds services, categories, products and blog posts on the first query
   (`src/db/seed.ts`) — idempotent, skipped as soon as the tables contain rows.

If the database is missing or unreachable, reads fall back to the bundled catalog and writes
(contact form, quote request) return `503 { "ok": false, "error": "database_unavailable" }`.
A short circuit breaker (`src/db/index.ts`, 30 s) keeps broken databases from slowing requests
down. `GET /api/health` reports `{ "ok": true, "database": "up" }` when the connection works.

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js — no extra configuration).
2. Add the environment variables above in **Project → Settings → Environment Variables**
   (at minimum `DATABASE_URL` if you want the contact form, quote requests and `/admin`).
3. Run `npx drizzle-kit push --url="$DATABASE_URL"` once against the production database.
4. Deploy. The build does not require a database: connections are opened lazily on the first
   query, so `/sitemap.xml` and the other routes build even when `DATABASE_URL` is unset.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
