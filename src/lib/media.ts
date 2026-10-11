import { desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { canQueryDatabase, db, isDatabaseConfigured, markDatabaseUnavailable } from "@/db";
import { contentBlocks, customPages, mediaAssets, type MediaAsset } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { listMediaRefs } from "@/lib/admin-data";

export type LibraryItem = {
  id: number;
  url: string;
  filename: string;
  pathname: string;
  contentType: string;
  size: number;
  storage: string;
  createdAt: string;
  usedBy: { kind: string; label: string; href: string }[];
};

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120) || "file";
}

export async function registerAsset(input: {
  url: string;
  pathname?: string;
  filename?: string;
  contentType?: string;
  size?: number;
  storage?: string;
}): Promise<MediaAsset | null> {
  await ensureSeeded();
  if (!canQueryDatabase() || !input.url.trim()) return null;
  try {
    const [row] = await db
      .insert(mediaAssets)
      .values({
        url: input.url.trim(),
        pathname: input.pathname ?? "",
        filename: input.filename ?? input.url.split("/").pop() ?? "",
        contentType: input.contentType ?? "",
        size: input.size ?? 0,
        storage: input.storage ?? "url",
      })
      .onConflictDoUpdate({
        target: mediaAssets.url,
        set: {
          filename: input.filename ?? input.url.split("/").pop() ?? "",
          contentType: input.contentType ?? "",
          size: input.size ?? 0,
        },
      })
      .returning();
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("registerAsset", error);
    return null;
  }
}

function blobToken() {
  return (process.env.BLOB_READ_WRITE_TOKEN ?? "").trim() || undefined;
}

function isServerlessFs() {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT ||
      process.cwd() === "/var/task",
  );
}

export function mediaUploadHint() {
  if (blobToken()) return "تُرفع الملفات إلى Vercel Blob.";
  if (isServerlessFs()) {
    return "على Vercel أضيفوا BLOB_READ_WRITE_TOKEN (Storage → Blob) للرفع. إلى ذلك الحين سجّلوا رابط صورة أدناه.";
  }
  return "تخزين محلي /public/media أثناء التطوير. في الإنتاج استخدموا Vercel Blob.";
}

export function mediaUploadsEnabled() {
  return Boolean(blobToken()) || !isServerlessFs();
}

export function logoUploadHint() {
  if (blobToken()) return "تُرفع صورة الشعار إلى Vercel Blob.";
  if (isServerlessFs() && isDatabaseConfigured()) {
    return "لا يوجد Blob مفعّل؛ ستُحفظ صورة الشعار في قاعدة البيانات لتظل متاحة بعد إعادة النشر.";
  }
  if (isServerlessFs()) {
    return "اربط قاعدة البيانات لحفظ الشعار مباشرة، أو أضف BLOB_READ_WRITE_TOKEN لاستخدام Vercel Blob.";
  }
  return "تُحفظ الصورة محلياً في /public/media أثناء التطوير.";
}

export function logoUploadsEnabled() {
  return Boolean(blobToken()) || !isServerlessFs() || isDatabaseConfigured();
}

export async function storeUpload(file: File): Promise<{ url: string } | { error: string }> {
  const filename = `${Date.now()}-${safeName(file.name)}`;
  const token = blobToken();

  if (token) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`atc/${filename}`, file, {
        access: "public",
        token,
        contentType: file.type || "application/octet-stream",
      });
      await registerAsset({
        url: blob.url,
        pathname: blob.pathname ?? `atc/${filename}`,
        filename: file.name,
        contentType: file.type,
        size: file.size,
        storage: "blob",
      });
      return { url: blob.url };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Échec Blob" };
    }
  }

  if (isServerlessFs()) {
    return {
      error:
        "لا يمكن الكتابة على القرص في Vercel. أنشئوا Blob وأضيفوا BLOB_READ_WRITE_TOKEN، أو الصقوا رابط صورة.",
    };
  }

  const dir = path.join(process.cwd(), "public", "media");
  try {
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    const url = `/media/${filename}`;
    await registerAsset({
      url,
      pathname: `media/${filename}`,
      filename: file.name,
      contentType: file.type,
      size: file.size,
      storage: "local",
    });
    return { url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Échec d'écriture locale" };
  }
}

const imageContentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function uploadContentType(file: File) {
  if (file.type.startsWith("image/")) return file.type;
  return imageContentTypes[path.extname(file.name).toLowerCase()] ?? "application/octet-stream";
}

/**
 * Store a logo durably on serverless hosting even when Blob is not configured.
 * Logo files are intentionally small (the upload route caps them at 5 MB), so
 * PostgreSQL is a reasonable fallback for this single site-wide asset.
 */
export async function storeLogoUpload(file: File): Promise<{ url: string } | { error: string }> {
  if (blobToken() || !isServerlessFs()) return storeUpload(file);

  await ensureSeeded();
  if (!canQueryDatabase()) {
    return { error: "قاعدة البيانات غير متاحة لحفظ الشعار حالياً. حاول مرة أخرى أو أضف BLOB_READ_WRITE_TOKEN." };
  }

  const key = randomUUID();
  const url = `/api/media/${key}`;
  try {
    const [asset] = await db
      .insert(mediaAssets)
      .values({
        url,
        pathname: `database/${key}`,
        filename: file.name,
        contentType: uploadContentType(file),
        size: file.size,
        storage: "database",
        data: Buffer.from(await file.arrayBuffer()),
      })
      .returning({ url: mediaAssets.url });
    if (!asset) return { error: "تعذر حفظ الشعار في قاعدة البيانات." };
    return { url: asset.url };
  } catch (error) {
    markDatabaseUnavailable("storeLogoUpload", error);
    return { error: "تعذر تخزين الشعار في قاعدة البيانات. تحقق من تحديث مخطط قاعدة البيانات." };
  }
}

async function extraRefsFromPages() {
  const refs: { url: string; kind: string; label: string; href: string }[] = [];
  if (!canQueryDatabase()) return refs;
  try {
    const pages = await db.select().from(customPages);
    for (const page of pages) {
      if (page.heroImage) {
        refs.push({
          url: page.heroImage,
          kind: "page",
          label: page.titleFr,
          href: `/admin/pages/${page.id}`,
        });
      }
      try {
        const sections = JSON.parse(page.sections || "[]") as { image?: string; titleFr?: string }[];
        for (const section of sections) {
          if (section.image) {
            refs.push({
              url: section.image,
              kind: "page",
              label: `${page.titleFr} · ${section.titleFr || "bloc"}`,
              href: `/admin/pages/${page.id}`,
            });
          }
        }
      } catch {
        /* ignore */
      }
    }
    const blocks = await db.select().from(contentBlocks);
    for (const block of blocks) {
      for (const value of [block.valueAr, block.valueFr]) {
        if (value.startsWith("http") || value.startsWith("/media/") || value.startsWith("/api/media/")) {
          refs.push({ url: value, kind: "content", label: block.key, href: "/admin/content" });
        }
      }
    }
  } catch {
    /* ignore */
  }
  return refs;
}

export async function listLibrary(): Promise<LibraryItem[]> {
  await ensureSeeded();
  const [refs, extras] = await Promise.all([listMediaRefs(), extraRefsFromPages()]);
  const used = new Map<string, { kind: string; label: string; href: string }[]>();
  for (const ref of [...refs, ...extras]) {
    const list = used.get(ref.url) ?? [];
    list.push({ kind: ref.kind, label: ref.label, href: ref.href });
    used.set(ref.url, list);
  }

  const items: LibraryItem[] = [];
  if (canQueryDatabase()) {
    try {
      const rows = await db
        .select({
          id: mediaAssets.id,
          url: mediaAssets.url,
          pathname: mediaAssets.pathname,
          filename: mediaAssets.filename,
          contentType: mediaAssets.contentType,
          size: mediaAssets.size,
          storage: mediaAssets.storage,
          createdAt: mediaAssets.createdAt,
        })
        .from(mediaAssets)
        .orderBy(desc(mediaAssets.createdAt));
      for (const row of rows) {
        items.push({
          id: row.id,
          url: row.url,
          filename: row.filename,
          pathname: row.pathname,
          contentType: row.contentType,
          size: row.size,
          storage: row.storage,
          createdAt: row.createdAt.toISOString(),
          usedBy: used.get(row.url) ?? [],
        });
      }
    } catch (error) {
      markDatabaseUnavailable("listLibrary", error);
    }
  }

  const known = new Set(items.map((item) => item.url));
  let orphan = 0;
  for (const [url, uses] of used) {
    if (known.has(url)) continue;
    orphan += 1;
    items.push({
      id: -orphan,
      url,
      filename: url.split("/").pop() ?? url,
      pathname: "",
      contentType: "",
      size: 0,
      storage: "linked",
      createdAt: "",
      usedBy: uses,
    });
  }
  return items;
}

export async function deleteAsset(id: number, url: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await ensureSeeded();
  const library = await listLibrary();
  const item = library.find((entry) => (id > 0 && entry.id === id) || entry.url === url);
  if (!item) return { ok: false, error: "Fichier introuvable." };
  if (item.usedBy.length) {
    return {
      ok: false,
      error: `Encore utilisée (${item.usedBy.length}). Remplacez l'image dans les fiches avant de supprimer.`,
    };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (item.storage === "blob" && token && item.url.startsWith("http")) {
    try {
      const { del } = await import("@vercel/blob");
      await del(item.url, { token });
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : "Échec suppression Blob" };
    }
  }
  if (item.storage === "local" && item.pathname.startsWith("media/")) {
    try {
      await unlink(path.join(process.cwd(), "public", item.pathname));
    } catch {
      /* already gone */
    }
  }

  if (canQueryDatabase() && item.id > 0) {
    try {
      await db.delete(mediaAssets).where(eq(mediaAssets.id, item.id));
    } catch (error) {
      markDatabaseUnavailable("deleteAsset", error);
      return { ok: false, error: "Supprimé du stockage mais pas de la base." };
    }
  }
  return { ok: true };
}
