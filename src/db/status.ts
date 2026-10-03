import { sql } from "drizzle-orm";
import {
  canQueryDatabase,
  databaseTarget,
  db,
  isDatabaseConfigured,
  markDatabaseUnavailable,
} from "@/db";
import { autoMigrateEnabled, ensureSchema } from "@/db/migrate";
import { ensureSeeded } from "@/db/seed";

/**
 * Human readable state of the database, used by `/api/health` and by the admin
 * dashboard. The point is to make the difference between "no DATABASE_URL",
 * "the host answers but the tables are missing" and "everything works"
 * visible, instead of silently serving the bundled catalog.
 */
export type DatabaseStatus = {
  configured: boolean;
  reachable: boolean;
  /** `ready` = every table exists, `missing` = tables have to be created. */
  schema: "ready" | "missing" | "unknown";
  /** Tables still missing (empty when ready). */
  missingTables: string[];
  /** Rows currently stored, `null` when unknown. */
  rows: { products: number; messages: number; orders: number } | null;
  target: string | null;
  autoMigrate: boolean;
  error: string | null;
};

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function databaseStatus(): Promise<DatabaseStatus> {
  const target = databaseTarget();
  const autoMigrate = autoMigrateEnabled();
  const base = { target, autoMigrate };

  if (!isDatabaseConfigured()) {
    return {
      ...base,
      configured: false,
      reachable: false,
      schema: "unknown",
      missingTables: [],
      rows: null,
      error: null,
    };
  }

  if (!canQueryDatabase()) {
    return {
      ...base,
      configured: true,
      reachable: false,
      schema: "unknown",
      missingTables: [],
      rows: null,
      error: "connection recently failed, retrying shortly",
    };
  }

  try {
    await db.execute(sql`select 1`);
  } catch (error) {
    markDatabaseUnavailable("databaseStatus", error);
    return {
      ...base,
      configured: true,
      reachable: false,
      schema: "unknown",
      missingTables: [],
      rows: null,
      error: message(error),
    };
  }

  const schema = await ensureSchema();
  if (!schema.ready) {
    return {
      ...base,
      configured: true,
      reachable: true,
      schema: "missing",
      missingTables: schema.missing,
      rows: null,
      error: schema.error ?? null,
    };
  }

  // A health check is also the documented way to bootstrap a brand new
  // database: make sure the bundled catalog is imported before counting.
  await ensureSeeded();

  try {
    const [row] = await db.execute<{ products: number; messages: number; orders: number }>(sql`
      select
        (select count(*)::int from products) as products,
        (select count(*)::int from contact_messages) as messages,
        (select count(*)::int from orders) as orders
    `).then((result) => result.rows ?? []);
    return {
      ...base,
      configured: true,
      reachable: true,
      schema: "ready",
      missingTables: [],
      rows: row ?? null,
      error: null,
    };
  } catch (error) {
    return {
      ...base,
      configured: true,
      reachable: true,
      schema: "ready",
      missingTables: [],
      rows: null,
      error: message(error),
    };
  }
}
