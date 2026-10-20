import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { mediaAssets } from "@/db/schema";

export const dynamic = "force-dynamic";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

/**
 * Catch-all for legacy WordPress uploads:
 *   /wp-content/uploads/2026/09/<filename>.jpg
 *
 * Resolution order:
 *  1. Restored file on disk at `public/wp-content/uploads/<path>`
 *  2. Restored file in `public/media/<filename>`
 *  3. Uploaded asset in PostgreSQL `media_assets` matching `<filename>` (either
 *     bytea `data` stored in DB or redirect to Vercel Blob URL)
 *  4. A 404 when the original file has not been mirrored yet. The app never
 *     invents a replacement for a missing product photo.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const rel = segments.join("/");
  if (!rel || rel.includes("..") || rel.includes("\\")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = segments[segments.length - 1] ?? rel;
  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_BY_EXT[ext] || "application/octet-stream";

  // 1) Try restored file in public/wp-content/uploads/<rel>
  try {
    const diskPath = path.join(process.cwd(), "public", "wp-content", "uploads", rel);
    const data = await readFile(diskPath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // not in public/wp-content/uploads
  }

  // 2) Try file in public/media/<filename>
  try {
    const mediaPath = path.join(process.cwd(), "public", "media", path.basename(filename));
    const data = await readFile(mediaPath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // not in public/media
  }

  // 3) Check PostgreSQL media_assets for a re-uploaded file with the same filename
  if (canQueryDatabase()) {
    try {
      const [asset] = await db
        .select({
          url: mediaAssets.url,
          storage: mediaAssets.storage,
          contentType: mediaAssets.contentType,
          data: mediaAssets.data,
        })
        .from(mediaAssets)
        .where(eq(mediaAssets.filename, filename))
        .orderBy(desc(mediaAssets.createdAt))
        .limit(1);

      if (asset) {
        if (asset.data && asset.data.length > 0) {
          return new NextResponse(new Uint8Array(asset.data), {
            headers: {
              "Content-Type": asset.contentType || contentType,
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
            },
          });
        }
        if (asset.storage === "blob" && /^https?:\/\//i.test(asset.url)) {
          return NextResponse.redirect(asset.url, 307);
        }
      }
    } catch (error) {
      markDatabaseUnavailable("wpContentLookup", error);
    }
  }

  // 4) Never replace a missing product photo with fabricated artwork.
  return new NextResponse("Original image has not been mirrored.", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-ATC-Image-Source": "missing-original",
      "X-ATC-Original-Path": `/wp-content/uploads/${rel}`,
    },
  });
}
