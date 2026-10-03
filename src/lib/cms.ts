import { eq } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { contentBlocks, siteSettings } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { dict } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";
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
};

export const CONTENT_KEYS = [
  { key: "home.heroTitle1", label: "Accueil — hero 1 titre" },
  { key: "home.heroSub1", label: "Accueil — hero 1 sous-titre" },
  { key: "home.heroTitle2", label: "Accueil — hero 2 titre" },
  { key: "home.heroSub2", label: "Accueil — hero 2 sous-titre" },
  { key: "home.heroTitle3", label: "Accueil — hero 3 titre" },
  { key: "home.heroSub3", label: "Accueil — hero 3 sous-titre" },
  { key: "home.whyUs", label: "Accueil — pourquoi nous (titre)" },
  { key: "home.whyUsText", label: "Accueil — pourquoi nous (texte)" },
  { key: "home.ctaTitle", label: "Accueil — bandeau CTA titre" },
  { key: "home.ctaText", label: "Accueil — bandeau CTA texte" },
  { key: "about.intro", label: "À propos — introduction" },
  { key: "about.mission", label: "À propos — mission" },
  { key: "about.vision", label: "À propos — vision" },
  { key: "about.goals", label: "À propos — objectifs" },
  { key: "design.intro", label: "Design — introduction" },
  { key: "contact.lead", label: "Contact — chapô" },
  { key: "footer.about", label: "Pied de page — à propos" },
] as const;

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
  "design.intro": { ar: dict.ar.designText1, fr: dict.fr.designText1 },
  "contact.lead": { ar: dict.ar.contactLead, fr: dict.fr.contactLead },
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
