import { desc, eq } from "drizzle-orm";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
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

export async function storeUpload(file: File): Promise<{ url: string } | { error: string }> {
  const filename = `${Date.now()}-${safeName(file.name)}`;
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const buffer = Buffer.from(await file.arrayBuffer());

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

  const dir = path.join(process.cwd(), "public", "media");
  try {
    await mkdir(dir, { recursive: true });
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
        if (value.startsWith("http") || value.startsWith("/media/")) {
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
      const rows = await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
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
