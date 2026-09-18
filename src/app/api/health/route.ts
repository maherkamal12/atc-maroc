import { canQueryDatabase, db, isDatabaseConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return Response.json({ ok: false, database: "not_configured" }, { status: 500 });
  }

  if (!canQueryDatabase()) {
    // Recently failed: don't make the health check wait for another timeout.
    return Response.json({ ok: false, database: "unavailable" }, { status: 500 });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "up" });
  } catch {
    return Response.json({ ok: false, database: "unavailable" }, { status: 500 });
  }
}
