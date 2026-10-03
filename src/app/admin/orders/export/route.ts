import { NextResponse } from "next/server";
import { isAdmin } from "../../actions";
import { listOrders } from "@/lib/data";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "auth" }, { status: 401 });
  const rows = await listOrders();
  const csv = [
    "id,reference,customer,email,phone,city,status,items,created_at",
    ...rows.map((o) =>
      [o.id, o.reference, o.customerName, o.email, o.phone, o.city, o.status, o.itemsCount, o.createdAt]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=orders.csv",
    },
  });
}
