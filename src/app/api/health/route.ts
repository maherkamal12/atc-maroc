import { databaseStatus } from "@/db/status";

export const dynamic = "force-dynamic";

/**
 * Health check. Reports what is wrong with the database instead of a bare
 * `up`/`down`: a Neon project without tables used to look healthy while every
 * write was silently dropped.
 *
 * - 200 `{ ok: true, database: "up" }` — reachable and fully provisioned
 * - 503 `{ ok: false, database: "migration_required" }` — reachable, tables missing
 * - 503 `{ ok: false, database: "unavailable" }` — unreachable / wrong credentials
 * - 503 `{ ok: false, database: "not_configured" }` — DATABASE_URL is unset
 */
export async function GET() {
  const status = await databaseStatus();

  const state = !status.configured
    ? "not_configured"
    : !status.reachable
      ? "unavailable"
      : status.schema !== "ready"
        ? "migration_required"
        : "up";

  const body = {
    ok: state === "up",
    database: state,
    target: status.target,
    tables: status.missingTables.length ? { missing: status.missingTables } : "ready",
    rows: status.rows,
    autoMigrate: status.autoMigrate,
    error: status.error,
  };

  return Response.json(body, { status: state === "up" ? 200 : 503 });
}
