import { NextResponse } from "next/server";
import { isAdmin } from "../../actions";
import { listMessages } from "@/lib/data";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const rows = await listMessages();
  const csv = [
    "id,name,email,phone,subject,message,locale,created_at",
    ...rows.map((m) =>
      [m.id, m.name, m.email, m.phone, m.subject, m.message, m.locale, m.createdAt]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=messages.csv",
    },
  });
}
