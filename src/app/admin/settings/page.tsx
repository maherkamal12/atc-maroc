import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { saveSettingsAction } from "../catalog-actions";
import { defaultSite, getResolvedSite, SETTING_KEYS } from "@/lib/cms";

export const dynamic = "force-dynamic";

const labels: Partial<Record<(typeof SETTING_KEYS)[number], string>> = {
  nameAr: "اسم الموقع (عربي)",
  nameFr: "اسم الموقع (فرنسي)",
  taglineAr: "الشعار العربي",
  taglineFr: "الشعار الفرنسي",
  email: "البريد الإلكتروني",
  phone: "الهاتف (للاتصال)",
  phoneDisplay: "الهاتف المعروض",
  whatsapp: "واتساب (بدون +)",
  instagram: "رابط إنستغرام",
  facebook: "رابط فيسبوك",
  addressAr: "العنوان بالعربية",
  addressFr: "العنوان بالفرنسية",
  hoursAr: "أوقات العمل بالعربية",
  hoursFr: "أوقات العمل بالفرنسية",
  mapUrl: "رابط خرائط غوغل",
  seoTitleAr: "عنوان محركات البحث عربي",
  seoTitleFr: "عنوان محركات البحث فرنسي",
  seoDescAr: "وصف محركات البحث عربي",
  seoDescFr: "وصف محركات البحث فرنسي",
  heroSolar: "صورة الطاقة الشمسية",
  heroElectrical: "صورة الكهرباء",
  heroInterior: "صورة التصميم الداخلي",
};

const settingsKeys = SETTING_KEYS.filter((key) => key !== "logoUrl" && key !== "logoText");

export default async function SettingsPage() {
  const site = await getResolvedSite();
  const long = new Set(["addressAr", "addressFr", "hoursAr", "hoursFr", "seoDescAr", "seoDescFr"]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="إعدادات الموقع"
        subtitle="الحقول الفارغة تُظهر القيم الأصلية للموقع. لإدارة شعار الموقع استخدم معالج الشعار."
        action={{ href: "/admin/logo", label: "تغيير الشعار" }}
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActionForm action={saveSettingsAction}>
          <div className="grid gap-4 md:grid-cols-2">
            {settingsKeys.map((key) => (
              <Field
                key={key}
                label={labels[key] ?? key}
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
