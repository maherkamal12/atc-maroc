import { asc, desc, eq } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { customPages, type CustomPage } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export type PageSection = {
  type: "split" | "text" | "cta";
  titleAr: string;
  titleFr: string;
  bodyAr: string;
  bodyFr: string;
  image: string;
};

export type PageInput = {
  slug: string;
  titleAr: string;
  titleFr: string;
  subtitleAr: string;
  subtitleFr: string;
  heroImage: string;
  sections: PageSection[];
  published: boolean;
  sort: number;
};

const RESERVED = new Set([
  "about",
  "blog",
  "cart",
  "contact",
  "design",
  "p",
  "products",
  "services",
  "admin",
  "api",
]);

export function slugifyPage(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140);
}

export function parseSections(raw: string): PageSection[] {
  try {
    const parsed = JSON.parse(raw || "[]") as PageSection[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      type: item.type === "cta" || item.type === "text" ? item.type : "split",
      titleAr: String(item.titleAr ?? ""),
      titleFr: String(item.titleFr ?? ""),
      bodyAr: String(item.bodyAr ?? ""),
      bodyFr: String(item.bodyFr ?? ""),
      image: String(item.image ?? ""),
    }));
  } catch {
    return [];
  }
}

export async function listCustomPages(): Promise<CustomPage[]> {
  await ensureSeeded();
  if (!canQueryDatabase()) return [];
  try {
    return await db.select().from(customPages).orderBy(asc(customPages.sort), desc(customPages.id));
  } catch (error) {
    markDatabaseUnavailable("listCustomPages", error);
    return [];
  }
}

export async function listPublishedPages(): Promise<CustomPage[]> {
  const all = await listCustomPages();
  return all.filter((page) => page.published);
}

export async function getCustomPageById(id: number): Promise<CustomPage | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(customPages).where(eq(customPages.id, id)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getCustomPageById", error);
    return null;
  }
}

export async function getCustomPageBySlug(slug: string): Promise<CustomPage | null> {
  await ensureSeeded();
  if (!canQueryDatabase()) return null;
  try {
    const [row] = await db.select().from(customPages).where(eq(customPages.slug, slug)).limit(1);
    return row ?? null;
  } catch (error) {
    markDatabaseUnavailable("getCustomPageBySlug", error);
    return null;
  }
}

export async function saveCustomPage(
  id: number | null,
  input: PageInput,
): Promise<{ ok: true; slug: string } | { ok: false; error: string }> {
  await ensureSeeded();
  if (!canQueryDatabase()) {
    return { ok: false, error: "Base de données indisponible. La page n'a pas été enregistrée." };
  }
  const slug = slugifyPage(input.slug || input.titleFr || input.titleAr);
  if (!slug) return { ok: false, error: "Le slug est obligatoire." };
  if (RESERVED.has(slug)) return { ok: false, error: `Le slug « ${slug} » est réservé.` };
  if (!input.titleFr.trim() || !input.titleAr.trim()) {
    return { ok: false, error: "Les titres français et arabe sont obligatoires." };
  }
  try {
    const payload = {
      slug,
      titleAr: input.titleAr,
      titleFr: input.titleFr,
      subtitleAr: input.subtitleAr,
      subtitleFr: input.subtitleFr,
      heroImage: input.heroImage,
      sections: JSON.stringify(input.sections),
      published: input.published,
      sort: input.sort,
      updatedAt: new Date(),
    };
    if (id) {
      await db.update(customPages).set(payload).where(eq(customPages.id, id));
    } else {
      await db.insert(customPages).values(payload);
    }
    return { ok: true, slug };
  } catch (error) {
    markDatabaseUnavailable("saveCustomPage", error);
    const message = error instanceof Error ? error.message : "Erreur base de données.";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { ok: false, error: "Ce slug existe déjà." };
    }
    return { ok: false, error: message };
  }
}

export async function deleteCustomPage(id: number): Promise<boolean> {
  await ensureSeeded();
  if (!canQueryDatabase()) return false;
  try {
    await db.delete(customPages).where(eq(customPages.id, id));
    return true;
  } catch (error) {
    markDatabaseUnavailable("deleteCustomPage", error);
    return false;
  }
}
