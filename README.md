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

| Variable                          | Required | Purpose                                                                 |
| --------------------------------- | -------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`                    | optional | Postgres connection string (Neon…). Needed for `/admin`, contact messages and quote requests. Without it the site still builds and serves the bundled catalog read-only. |
| `DATABASE_AUTO_MIGRATE`           | optional | `false` disables the automatic creation of missing tables (see below).  |
| `NEXT_PUBLIC_SITE_URL`            | optional | Canonical origin used by `sitemap.xml` / `robots.txt` (defaults to `https://atc-maroc.com`). |
| `ADMIN_PASSWORD`                  | optional | Password for the `/admin` area (defaults to `atc2026`).                 |
| `SERVER_ACTIONS_ALLOWED_ORIGINS`  | optional | Extra origins allowed to submit the admin forms (previews, tunnels, custom proxies), comma separated — e.g. `my-preview.example.com,*.my-proxy.dev`. |

Never commit real credentials: `.env*` files are git-ignored.

## Database (Neon)

1. Create a project on [neon.tech](https://console.neon.tech) and copy the connection string
   (**Connect** → *Connection string*), keeping the `?sslmode=require` suffix:

   ```
   postgresql://USER:PASSWORD@ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

2. Put it in `.env.local` (local development) and/or in the environment variables of your host
   (Vercel → *Project → Settings → Environment Variables*):

   ```bash
   DATABASE_URL="postgresql://…?sslmode=require"
   ```

3. **Nothing else to do.** On the first query the app:
   - creates the missing tables (idempotent DDL, `src/db/migrate.ts`),
   - imports the catalog, the services, the categories and the blog posts (`src/db/seed.ts`).

   Visiting `/api/health` is the quickest way to trigger and verify that bootstrap:

   ```json
   { "ok": true, "database": "up", "tables": "ready",
     "rows": { "products": 314, "messages": 0, "orders": 0 } }
   ```

   Prefer explicit migrations? Set `DATABASE_AUTO_MIGRATE=false` and run:

   ```bash
   npm run db:push      # create/update the tables from src/db/schema.ts
   npm run db:migrate   # …or apply the SQL files in ./drizzle
   npm run db:check     # diagnose the connection and the tables
   ```

   `npm run db:push` reads `DATABASE_URL` from `.env.local` / `.env`; to target another
   database, override the variable instead of the connection string:

   ```bash
   DATABASE_URL="postgresql://…/neondb?sslmode=require" npm run db:push
   ```

### Behaviour without a database

The catalog (`src/db/products.generated.ts`) is bundled with the app, so pages always render.
When the database is missing or unreachable, reads fall back to the bundled catalog and writes
(contact form, quote request) answer `503 { "ok": false, "error": "database_unavailable" }`
instead of dropping the data. A short circuit breaker (`src/db/index.ts`, 30 s) keeps broken
databases from slowing requests down.

`GET /api/health` tells you exactly where you stand:

| Response                                                                 | Meaning                                  |
| ------------------------------------------------------------------------ | ---------------------------------------- |
| `200 { "ok": true, "database": "up" }`                                   | Connected **and** tables present.        |
| `503 { "database": "migration_required", "tables": { "missing": [ … ] } }` | Connected, but the tables do not exist.  |
| `503 { "database": "unavailable" }`                                       | Wrong credentials / host unreachable / suspended Neon project. |
| `503 { "database": "not_configured" }`                                   | `DATABASE_URL` is unset.                 |

The admin dashboard shows the same state at the top of `/admin`.

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js — no extra configuration).
2. Add the environment variables above in **Project → Settings → Environment Variables**
   (`DATABASE_URL` is enough to enable the contact form, quote requests and `/admin`).
3. Deploy. The build does not require a database: connections are opened lazily on the first
   query, so `/sitemap.xml` and the other routes build even when `DATABASE_URL` is unset.

## Admin area

`/admin` is protected by a password (`ADMIN_PASSWORD`, default `atc2026`). The login form shows
an explicit error when the password is wrong, and `Server Actions` accept the extra origins
listed in `next.config.ts` — reverse proxies (Vercel preview URLs, Cloudflare, tunnels, the
sandbox preview) otherwise reject the login with `Invalid Server Actions request.` and the
button appears to do nothing.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run db:push    # drizzle-kit push   — sync the tables with src/db/schema.ts
npm run db:generate# drizzle-kit generate — SQL migration into ./drizzle
npm run db:migrate # drizzle-kit migrate  — apply ./drizzle migrations
npm run db:check   # connection + schema diagnostic
```
