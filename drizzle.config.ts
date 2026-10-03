import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js loads `.env.local` first and `.env` as a fallback — mirror that order
// so `npm run db:push` uses exactly the same database as the dev server.
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

if (!url) {
  console.warn(
    "[drizzle] DATABASE_URL is not set. Copy .env.example to .env.local and paste your Neon connection string, or pass --url=\"postgresql://…\".",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  // Empty string is only usable by `drizzle-kit generate`, which never connects.
  dbCredentials: { url: url || "postgresql://postgres:postgres@127.0.0.1:5432/postgres" },
  strict: false,
  verbose: true,
});
