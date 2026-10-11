import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { mediaAssets } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  if (!/^[a-f0-9-]{36}$/i.test(key)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await ensureSeeded();
  if (!canQueryDatabase()) {
    return NextResponse.json({ error: "Media storage unavailable" }, { status: 503 });
  }

  try {
    const [asset] = await db
      .select({ data: mediaAssets.data, contentType: mediaAssets.contentType })
      .from(mediaAssets)
      .where(eq(mediaAssets.pathname, `database/${key}`))
      .limit(1);
    if (!asset?.data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(asset.data), {
      headers: {
        "Content-Type": asset.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    markDatabaseUnavailable("getMediaAsset", error);
    return NextResponse.json({ error: "Media storage unavailable" }, { status: 503 });
  }
}
