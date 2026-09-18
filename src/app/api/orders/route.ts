import { NextResponse } from "next/server";
import { createOrder } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const customerName = String(body.customerName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const rawItems = Array.isArray(body.items) ? body.items : [];

    const items = rawItems
      .map((entry) => {
        const item = entry as Record<string, unknown>;
        return {
          slug: String(item.slug ?? ""),
          quantity: Number(item.quantity ?? 1),
        };
      })
      .filter((item) => item.slug.length > 0 && Number.isFinite(item.quantity) && item.quantity > 0);

    if (!customerName || !email || !phone || !items.length) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const { order, itemsCount } = await createOrder({
      customerName,
      email,
      phone,
      city: String(body.city ?? "").trim().slice(0, 120),
      address: String(body.address ?? "").trim().slice(0, 300),
      note: String(body.note ?? "").trim().slice(0, 2000),
      locale: String(body.locale ?? "ar") === "fr" ? "fr" : "ar",
      items,
    });

    return NextResponse.json({
      ok: true,
      reference: order.reference,
      itemsCount,
    });
  } catch (error) {
    console.error("[api/orders]", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
