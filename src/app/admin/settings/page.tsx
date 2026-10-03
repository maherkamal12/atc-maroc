import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { saveSettingsAction } from "../catalog-actions";
import { defaultSite, getResolvedSite, SETTING_KEYS } from "@/lib/cms";

export const dynamic = "force-dynamic";

const labels: Record<(typeof SETTING_KEYS)[number], string> = {
  nameAr: "Nom du site (AR)",
  nameFr: "Nom du site (FR)",
  taglineAr: "Slogan AR",
  taglineFr: "Slogan FR",
  email: "E-mail",
  phone: "Téléphone (tel:)",
  phoneDisplay: "Téléphone affiché",
  whatsapp: "WhatsApp (sans +)",
  instagram: "Instagram URL",
  facebook: "Facebook URL",
  addressAr: "Adresse AR",
  addressFr: "Adresse FR",
  hoursAr: "Horaires AR (une ligne par jour)",
  hoursFr: "Horaires FR (une ligne par jour)",
  mapUrl: "URL Google Maps",
  seoTitleAr: "Titre SEO AR",
  seoTitleFr: "Titre SEO FR",
  seoDescAr: "Description SEO AR",
  seoDescFr: "Description SEO FR",
  heroSolar: "Image hero solaire",
  heroElectrical: "Image hero électricité",
  heroInterior: "Image hero intérieur",
  logoUrl: "Logo (URL) — laissez vide pour le monogramme",
  logoText: "Texte du monogramme (si pas d'image)",
};

export default async function SettingsPage() {
  const site = await getResolvedSite();
  const long = new Set(["addressAr", "addressFr", "hoursAr", "hoursFr", "seoDescAr", "seoDescFr"]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Réglages du site"
        subtitle="Les valeurs vides retombent sur les défauts de src/lib/site.ts."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActionForm action={saveSettingsAction}>
          <div className="grid gap-4 md:grid-cols-2">
            {SETTING_KEYS.map((key) => (
              <Field
                key={key}
                label={labels[key]}
                name={key}
                defaultValue={site[key] || defaultSite[key]}
                textarea={long.has(key)}
                dir={key.endsWith("Ar") ? "rtl" : undefined}
              />
            ))}
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
