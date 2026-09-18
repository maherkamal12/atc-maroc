import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export type Database = NodePgDatabase<Record<string, never>>;

/** How long a broken/unreachable database is skipped before we try it again. */
const DEGRADED_TTL_MS = 30_000;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: Database;
  __arenaNextJsPostgresqlDegradedUntil?: number;
};

/** True when a Postgres connection string is configured. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function degradedUntil(): number {
  return globalForDb.__arenaNextJsPostgresqlDegradedUntil ?? 0;
}

/**
 * Marks the database as temporarily unusable so the following requests serve the
 * bundled catalog immediately instead of waiting for a connection to time out.
 * Only the first failure of each window is logged, to keep the logs readable.
 */
export function markDatabaseUnavailable(label: string, error?: unknown) {
  const alreadyDegraded = Date.now() < degradedUntil();
  globalForDb.__arenaNextJsPostgresqlDegradedUntil = Date.now() + DEGRADED_TTL_MS;
  if (alreadyDegraded) return;
  const message = error instanceof Error ? error.message : error;
  console.error(
    `[db] ${label}: database unavailable (${message ?? "unknown error"}) — serving bundled data, retrying in ${DEGRADED_TTL_MS / 1000}s`,
  );
}

/** True when a query should be attempted: configured and not recently broken. */
export function canQueryDatabase(): boolean {
  return isDatabaseConfigured() && Date.now() >= degradedUntil();
}

function initDb(): Database {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  const pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
      // Never let a slow or unreachable database hang a page render: the data
      // layer falls back to the bundled catalog as soon as this fails.
      connectionTimeoutMillis: 3_000,
      idleTimeoutMillis: 30_000,
      max: 5,
    });
  const database = globalForDb.__arenaNextJsPostgresqlDb ?? drizzle(pool);

  globalForDb.__arenaNextJsPostgresqlPool = pool;
  globalForDb.__arenaNextJsPostgresqlDb = database;

  return database;
}

let moduleDb: Database | null = null;

function getDb(): Database {
  // In development drop the module cache so edits to .env are picked up on reload.
  if (!moduleDb || process.env.NODE_ENV !== "production") {
    moduleDb = initDb();
  }
  return moduleDb;
}

/**
 * Lazily-connected Drizzle client.
 *
 * The pool is only created on the first real query and never at import time.
 * `next build` imports every route while collecting page data (including
 * `/sitemap.xml`); throwing from module scope there failed the whole build when
 * DATABASE_URL was unset on the host. Deferring the connection means the build
 * always succeeds and, at runtime, `@/lib/data` simply falls back to the
 * bundled catalog whenever the database is missing or unreachable.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, property) {
    const client = getDb() as unknown as Record<PropertyKey | symbol, unknown>;
    const value = client[property];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
