import { sql } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { DDL_STATEMENTS, EXPECTED_TABLES } from "@/db/ddl";

/**
 * Provisioning of a brand new database.
 *
 * Pasting a Neon connection string in `DATABASE_URL` used to be enough to make
 * the app *think* it had a database, while every query failed with
 * `relation "contact_messages" does not exist` and the site silently fell back
 * to the bundled catalog. `ensureSchema()` closes that gap: it creates the
 * tables that are missing (idempotent DDL) and reports what it found.
 *
 * Set `DATABASE_AUTO_MIGRATE=false` to keep the database strictly under
 * `npm run db:push`.
 */

export type SchemaReport = {
  /** True when every expected table is present. */
  ready: boolean;
  /** True when this call is the one that created the missing tables. */
  created: boolean;
  /** Tables that are still missing (empty when ready). */
  missing: string[];
  /** Set when provisioning itself failed (bad credentials, network, ...). */
  error?: string;
};

const AUTO_MIGRATE_DISABLED = new Set(["0", "false", "off", "no"]);

export function autoMigrateEnabled(): boolean {
  const flag = (process.env.DATABASE_AUTO_MIGRATE ?? "").trim().toLowerCase();
  return !AUTO_MIGRATE_DISABLED.has(flag);
}

const TABLE_LIST_SQL = sql.raw(EXPECTED_TABLES.map((table) => `'${table}'`).join(", "));

async function missingTables(): Promise<string[]> {
  const result = await db.execute<{ table_name: string }>(sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public' and table_name in (${TABLE_LIST_SQL})
  `);
  const present = new Set((result.rows ?? []).map((row) => row.table_name));
  return EXPECTED_TABLES.filter((table) => !present.has(table));
}

/** Nothing else is writing to an idle database: the table already exists. */
function isAlreadyExistsError(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code;
  // 42P07 duplicate_table, 42710 duplicate_object, 42701 duplicate_column,
  // 23505 unique_violation — raised when two serverless instances migrate at
  // the very same moment.
  return code === "42P07" || code === "42710" || code === "42701" || code === "23505";
}

async function provision(): Promise<SchemaReport> {
  const missing = await missingTables();
  if (!missing.length) return { ready: true, created: false, missing: [] };

  if (!autoMigrateEnabled()) {
    return { ready: false, created: false, missing };
  }

  console.info(
    `[db] creating missing tables (${missing.join(", ")}) — set DATABASE_AUTO_MIGRATE=false to disable, or run npm run db:push`,
  );

  for (const statement of DDL_STATEMENTS) {
    try {
      await db.execute(sql.raw(statement));
    } catch (error) {
      if (isAlreadyExistsError(error)) continue;
      throw error;
    }
  }

  const stillMissing = await missingTables();
  if (stillMissing.length) {
    return { ready: false, created: false, missing: stillMissing };
  }
  console.info("[db] schema ready");
  return { ready: true, created: true, missing: [] };
}

let readyPromise: Promise<SchemaReport> | null = null;

/**
 * Makes sure the tables exist before the first query. The result is memoised
 * once the schema is ready; while tables are missing the check is retried on
 * the next call so that running `npm run db:push` on a live server is picked
 * up without a restart.
 */
export async function ensureSchema(): Promise<SchemaReport> {
  if (!canQueryDatabase()) {
    return { ready: false, created: false, missing: [...EXPECTED_TABLES] };
  }

  if (!readyPromise) {
    readyPromise = provision().catch((error) => {
      // Drop the cached promise so provisioning is retried once the database is back.
      readyPromise = null;
      markDatabaseUnavailable("ensureSchema", error);
      return {
        ready: false,
        created: false,
        missing: [...EXPECTED_TABLES],
        error: error instanceof Error ? error.message : String(error),
      } satisfies SchemaReport;
    });
  }

  const report = await readyPromise;
  if (!report.ready) readyPromise = null;
  return report;
}
