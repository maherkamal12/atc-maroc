import { NextResponse } from "next/server";
import { createMessage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!name || !email || !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    await createMessage({
      name,
      email,
      phone: String(body.phone ?? "").trim().slice(0, 40),
      subject: String(body.subject ?? "").trim().slice(0, 160),
      message: String(body.message ?? "").trim().slice(0, 4000),
      locale: String(body.locale ?? "ar") === "fr" ? "fr" : "ar",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
