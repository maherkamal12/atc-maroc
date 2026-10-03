import { asc, eq } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { contentBlocks, navItems, siteSettings, type NavItem } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { dict } from "@/lib/i18n";
import { navLinks, site, type Locale, type NavLink } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const SETTING_KEYS = [
  "nameAr",
  "nameFr",
  "taglineAr",
  "taglineFr",
  "email",
  "phone",
  "phoneDisplay",
  "whatsapp",
  "instagram",
  "facebook",
  "addressAr",
  "addressFr",
  "hoursAr",
  "hoursFr",
  "mapUrl",
  "seoTitleAr",
  "seoTitleFr",
  "seoDescAr",
  "seoDescFr",
  "heroSolar",
  "heroElectrical",
  "heroInterior",
  "logoUrl",
  "logoText",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

export type ResolvedSite = {
  nameAr: string;
  nameFr: string;
  taglineAr: string;
  taglineFr: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  addressAr: string;
  addressFr: string;
  hoursAr: string;
  hoursFr: string;
  mapUrl: string;
  seoTitleAr: string;
  seoTitleFr: string;
  seoDescAr: string;
  seoDescFr: string;
  heroSolar: string;
  heroElectrical: string;
  heroInterior: string;
  logoUrl: string;
  logoText: string;
};

const defaultHoursAr = site.hours.map((h) => h.ar).join("\n");
const defaultHoursFr = site.hours.map((h) => h.fr).join("\n");

export const defaultSite: ResolvedSite = {
  nameAr: site.nameAr,
  nameFr: site.nameFr,
  taglineAr: site.taglineAr,
  taglineFr: site.taglineFr,
  email: site.email,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  facebook: "",
  addressAr: site.addressAr,
  addressFr: site.addressFr,
  hoursAr: defaultHoursAr,
  hoursFr: defaultHoursFr,
  mapUrl: site.mapUrl,
  seoTitleAr: "أطلس تك كونسيبت | حلول تقنية متكاملة للمباني",
  seoTitleFr: "ATLAS TECH CONCEPT | Solutions techniques intégrées pour le bâtiment",
  seoDescAr:
    "كهرباء، سباكة، تدفئة مركزية، تكييف وتهوية، طاقة شمسية، تجهيز داخلي وتصميم في طنجة وكل المغرب.",
  seoDescFr:
    "Électricité, plomberie, chauffage central, climatisation, énergie solaire, aménagement intérieur et design à Tanger et partout au Maroc.",
  heroSolar: heroImages.solar,
  heroElectrical: heroImages.electrical,
  heroInterior: heroImages.interior,
  logoUrl: "",
  logoText: site.shortName,
};

export const CONTENT_KEYS: {
  key: string;
  label: string;
  group: string;
  kind: "text" | "image";
}[] = [
  { key: "home.heroTitle1", label: "Hero 1 — titre", group: "Accueil", kind: "text" },
  { key: "home.heroSub1", label: "Hero 1 — texte", group: "Accueil", kind: "text" },
  { key: "home.heroTitle2", label: "Hero 2 — titre", group: "Accueil", kind: "text" },
  { key: "home.heroSub2", label: "Hero 2 — texte", group: "Accueil", kind: "text" },
  { key: "home.heroTitle3", label: "Hero 3 — titre", group: "Accueil", kind: "text" },
  { key: "home.heroSub3", label: "Hero 3 — texte", group: "Accueil", kind: "text" },
  { key: "home.hero1.image", label: "Hero 1 — image (électricité)", group: "Accueil", kind: "image" },
  { key: "home.hero2.image", label: "Hero 2 — image (solaire)", group: "Accueil", kind: "image" },
  { key: "home.hero3.image", label: "Hero 3 — image (intérieur)", group: "Accueil", kind: "image" },
  { key: "home.whyUs", label: "Pourquoi nous — titre", group: "Accueil", kind: "text" },
  { key: "home.whyUsText", label: "Pourquoi nous — texte", group: "Accueil", kind: "text" },
  { key: "home.ctaTitle", label: "Bandeau CTA — titre", group: "Accueil", kind: "text" },
  { key: "home.ctaText", label: "Bandeau CTA — texte", group: "Accueil", kind: "text" },
  { key: "about.intro", label: "Introduction", group: "À propos", kind: "text" },
  { key: "about.mission", label: "Mission", group: "À propos", kind: "text" },
  { key: "about.vision", label: "Vision", group: "À propos", kind: "text" },
  { key: "about.goals", label: "Objectifs", group: "À propos", kind: "text" },
  { key: "about.hero.image", label: "Image d'en-tête", group: "À propos", kind: "image" },
  { key: "design.heroTitle", label: "Titre d'en-tête", group: "Design", kind: "text" },
  { key: "design.heroSub", label: "Sous-titre d'en-tête", group: "Design", kind: "text" },
  { key: "design.hero.image", label: "Image d'en-tête", group: "Design", kind: "image" },
  { key: "design.block1.title", label: "Bloc 1 — titre", group: "Design", kind: "text" },
  { key: "design.block1.text", label: "Bloc 1 — texte", group: "Design", kind: "text" },
  { key: "design.block1.image", label: "Bloc 1 — image", group: "Design", kind: "image" },
  { key: "design.block2.title", label: "Bloc 2 — titre", group: "Design", kind: "text" },
  { key: "design.block2.text", label: "Bloc 2 — texte", group: "Design", kind: "text" },
  { key: "design.block2.image", label: "Bloc 2 — image", group: "Design", kind: "image" },
  { key: "design.block3.title", label: "Bloc 3 — titre", group: "Design", kind: "text" },
  { key: "design.block3.text", label: "Bloc 3 — texte", group: "Design", kind: "text" },
  { key: "design.block3.image", label: "Bloc 3 — image", group: "Design", kind: "image" },
  { key: "contact.lead", label: "Chapô", group: "Contact", kind: "text" },
  { key: "contact.hero.image", label: "Image d'en-tête", group: "Contact", kind: "image" },
  { key: "footer.about", label: "Texte à propos", group: "Pied de page", kind: "text" },
];

const fallbackCopy: Record<string, { ar: string; fr: string }> = {
  "home.heroTitle1": { ar: dict.ar.heroTitle1, fr: dict.fr.heroTitle1 },
  "home.heroSub1": { ar: dict.ar.heroSub1, fr: dict.fr.heroSub1 },
  "home.heroTitle2": { ar: dict.ar.heroTitle2, fr: dict.fr.heroTitle2 },
  "home.heroSub2": { ar: dict.ar.heroSub2, fr: dict.fr.heroSub2 },
  "home.heroTitle3": { ar: dict.ar.heroTitle3, fr: dict.fr.heroTitle3 },
  "home.heroSub3": { ar: dict.ar.heroSub3, fr: dict.fr.heroSub3 },
  "home.whyUs": { ar: dict.ar.whyUs, fr: dict.fr.whyUs },
  "home.whyUsText": { ar: dict.ar.whyUsText, fr: dict.fr.whyUsText },
  "home.ctaTitle": { ar: dict.ar.ctaTitle, fr: dict.fr.ctaTitle },
  "home.ctaText": { ar: dict.ar.ctaText, fr: dict.fr.ctaText },
  "about.intro": {
    ar: "مقرنا بطنجة، ويتدخل فريقنا في كل المغرب لفائدة المشاريع السكنية والفندقية والتجارية والصناعية.",
    fr: "Basée à Tanger, notre équipe intervient dans tout le Maroc pour les projets résidentiels, hôteliers, commerciaux et industriels.",
  },
  "about.mission": {
    ar: "مهمتنا في ATLAS TECH CONCEPT هي تقديم حلول متكاملة ومبتكرة في مجال البناء، التجهيزات التقنية، والتصميم الداخلي.",
    fr: "Notre mission chez ATLAS TECH CONCEPT est de fournir des solutions intégrées et innovantes dans le domaine de la construction, des équipements techniques et du design intérieur.",
  },
  "about.vision": {
    ar: "رؤية ATLAS TECH CONCEPT هي أن نصبح الرائدين في تقديم الحلول التقنية والبنائية المتكاملة على مستوى المنطقة.",
    fr: "La vision d'ATLAS TECH CONCEPT est de devenir le leader des solutions techniques et constructives intégrées au niveau de la région.",
  },
  "about.goals": {
    ar: "هدف ATLAS TECH CONCEPT هو تقديم حلول متكاملة وشاملة في مجالات الكهرباء، السباكة، التكييف، التدفئة المركزية، الطاقة الشمسية، والتصميم الداخلي.",
    fr: "L'objectif d'ATLAS TECH CONCEPT est de fournir des solutions complètes dans les domaines de l'électricité, la plomberie, la climatisation, le chauffage central, l'énergie solaire et le design intérieur.",
  },
  "home.hero1.image": { ar: heroImages.electrical, fr: heroImages.electrical },
  "home.hero2.image": { ar: heroImages.solar, fr: heroImages.solar },
  "home.hero3.image": { ar: heroImages.interior, fr: heroImages.interior },
  "about.hero.image": { ar: heroImages.electrical, fr: heroImages.electrical },
  "design.heroTitle": { ar: dict.ar.designSection, fr: dict.fr.designSection },
  "design.heroSub": {
    ar: "تصميم داخلي، ديكور وتجهيز: من الفكرة إلى التنفيذ.",
    fr: "Design intérieur, décoration et aménagement : de l'idée à la réalisation.",
  },
  "design.hero.image": { ar: heroImages.interior, fr: heroImages.interior },
  "design.block1.title": { ar: dict.ar.designTitle1, fr: dict.fr.designTitle1 },
  "design.block1.text": { ar: dict.ar.designText1, fr: dict.fr.designText1 },
  "design.block1.image": { ar: heroImages.interior, fr: heroImages.interior },
  "design.block2.title": { ar: dict.ar.designTitle3, fr: dict.fr.designTitle3 },
  "design.block2.text": { ar: dict.ar.designText3, fr: dict.fr.designText3 },
  "design.block2.image": { ar: heroImages.solar, fr: heroImages.solar },
  "design.block3.title": { ar: dict.ar.designTitle2, fr: dict.fr.designTitle2 },
  "design.block3.text": { ar: dict.ar.designText2, fr: dict.fr.designText2 },
  "design.block3.image": { ar: heroImages.electrical, fr: heroImages.electrical },
  "contact.lead": { ar: dict.ar.contactLead, fr: dict.fr.contactLead },
  "contact.hero.image": { ar: heroImages.solar, fr: heroImages.solar },
  "footer.about": { ar: dict.ar.footerAbout, fr: dict.fr.footerAbout },
};

export async function getSettingsMap(): Promise<Record<string, string>> {
  await ensureSeeded();
  if (!canQueryDatabase()) return {};
  try {
    const rows = await db.select().from(siteSettings);
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    markDatabaseUnavailable("getSettingsMap", error);
    return {};
  }
}

export async function getResolvedSite(): Promise<ResolvedSite> {
  const map = await getSettingsMap();
  const merged = { ...defaultSite };
  for (const key of SETTING_KEYS) {
    const value = map[key];
    if (value && value.trim()) merged[key] = value;
  }
  return merged;
}

export async function saveSettings(values: Partial<Record<SettingKey, string>>): Promise<boolean> {
  await ensureSeeded();
  if (!canQueryDatabase()) return false;
  try {
    for (const key of SETTING_KEYS) {
      if (values[key] === undefined) continue;
      const value = values[key] ?? "";
      await db
        .insert(siteSettings)
        .values({ key, value })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value } });
    }
    return true;
  } catch (error) {
    markDatabaseUnavailable("saveSettings", error);
    return false;
  }
}

export async function getContentMap(): Promise<Record<string, { valueAr: string; valueFr: string }>> {
  await ensureSeeded();
  if (!canQueryDatabase()) return {};
  try {
    const rows = await db.select().from(contentBlocks);
    return Object.fromEntries(rows.map((row) => [row.key, { valueAr: row.valueAr, valueFr: row.valueFr }]));
  } catch (error) {
    markDatabaseUnavailable("getContentMap", error);
    return {};
  }
}

export function fallbackBlock(key: string) {
  return fallbackCopy[key] ?? { ar: "", fr: "" };
}

export async function getBlock(key: string, locale: Locale): Promise<string> {
  const map = await getContentMap();
  const stored = map[key];
  const raw = locale === "fr" ? stored?.valueFr : stored?.valueAr;
  if (raw && raw.trim()) return raw;
  const fb = fallbackBlock(key);
  return locale === "fr" ? fb.fr : fb.ar;
}

export async function saveContentBlocks(
  entries: { key: string; valueAr: string; valueFr: string }[],
): Promise<boolean> {
  await ensureSeeded();
  if (!canQueryDatabase()) return false;
  try {
    for (const entry of entries) {
      await db
        .insert(contentBlocks)
        .values({
          key: entry.key,
          valueAr: entry.valueAr,
          valueFr: entry.valueFr,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: contentBlocks.key,
          set: { valueAr: entry.valueAr, valueFr: entry.valueFr, updatedAt: new Date() },
        });
    }
    return true;
  } catch (error) {
    markDatabaseUnavailable("saveContentBlocks", error);
    return false;
  }
}

export async function replaceImageEverywhere(from: string, to: string): Promise<boolean> {
  await ensureSeeded();
  if (!canQueryDatabase() || !from) return false;
  try {
    const { sql } = await import("drizzle-orm");
    await db.execute(sql`UPDATE products SET image = ${to} WHERE image = ${from}`);
    await db.execute(sql`UPDATE categories SET image = ${to} WHERE image = ${from}`);
    await db.execute(sql`UPDATE services SET image = ${to} WHERE image = ${from}`);
    await db.execute(sql`UPDATE posts SET image = ${to} WHERE image = ${from}`);
    await db.update(siteSettings).set({ value: to }).where(eq(siteSettings.value, from));
    return true;
  } catch (error) {
    markDatabaseUnavailable("replaceImageEverywhere", error);
    return false;
  }
}

export type MenuRow = {
  id: number;
  href: string;
  labelAr: string;
  labelFr: string;
  parentHref: string;
  sort: number;
  visible: boolean;
};

function flattenNav(links: NavLink[], parentHref = "", start = 0): MenuRow[] {
  const rows: MenuRow[] = [];
  links.forEach((link, index) => {
    rows.push({
      id: 0,
      href: link.href,
      labelAr: link.labelAr,
      labelFr: link.labelFr,
      parentHref,
      sort: start + index,
      visible: true,
    });
    if (link.children?.length) {
      rows.push(...flattenNav(link.children, link.href, (start + index) * 10));
    }
  });
  return rows;
}

export function defaultMenuRows(): MenuRow[] {
  return flattenNav(navLinks);
}

export async function listNavRows(): Promise<MenuRow[]> {
  await ensureSeeded();
  if (!canQueryDatabase()) return defaultMenuRows();
  try {
    const [rows, settings] = await Promise.all([
      db.select().from(navItems).orderBy(asc(navItems.sort), asc(navItems.id)),
      getSettingsMap(),
    ]);
    const managed = settings.navManaged === "1";
    if (!managed && !rows.length) return defaultMenuRows();
    return rows.map((row: NavItem) => ({
      id: row.id,
      href: row.href,
      labelAr: row.labelAr,
      labelFr: row.labelFr,
      parentHref: row.parentHref,
      sort: row.sort,
      visible: row.visible,
    }));
  } catch (error) {
    markDatabaseUnavailable("listNavRows", error);
    return defaultMenuRows();
  }
}

export async function getHeaderNav(locale: Locale) {
  const rows = (await listNavRows()).filter((row) => row.visible);
  const tops = rows.filter((row) => !row.parentHref);
  return tops.map((row) => {
    const children = rows
      .filter((child) => child.parentHref === row.href)
      .map((child) => ({
        href: child.href,
        label: locale === "fr" ? child.labelFr : child.labelAr,
      }));
    return {
      href: row.href,
      label: locale === "fr" ? row.labelFr : row.labelAr,
      children: children.length ? children : undefined,
    };
  });
}

export async function saveNavRows(rows: Omit<MenuRow, "id">[]): Promise<boolean> {
  await ensureSeeded();
  if (!canQueryDatabase()) return false;
  try {
    await db.delete(navItems);
    const clean = rows.filter((row) => row.href.trim() && (row.labelAr.trim() || row.labelFr.trim()));
    if (clean.length) {
      await db.insert(navItems).values(
        clean.map((row, index) => ({
          href: row.href.trim(),
          labelAr: row.labelAr.trim(),
          labelFr: row.labelFr.trim(),
          parentHref: row.parentHref.trim(),
          sort: Number.isFinite(row.sort) ? row.sort : index,
          visible: row.visible,
        })),
      );
    }
    await db
      .insert(siteSettings)
      .values({ key: "navManaged", value: "1" })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: "1" } });
    return true;
  } catch (error) {
    markDatabaseUnavailable("saveNavRows", error);
    return false;
  }
}
