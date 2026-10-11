import { AdminHeader } from "../_ui";
import { LogoWizard } from "./logo-wizard";
import { getResolvedSite } from "@/lib/cms";
import { logoUploadHint, logoUploadsEnabled } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function LogoAdminPage() {
  const site = await getResolvedSite();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="معالج تغيير شعار الموقع"
        subtitle="اتبع الخطوات لاختيار الشعار، معاينته بالعربية والفرنسية، ثم نشره على الموقع."
      />
      <LogoWizard
        currentLogoUrl={site.logoUrl}
        logoText={site.logoText}
        nameAr={site.nameAr}
        nameFr={site.nameFr}
        taglineAr={site.taglineAr}
        taglineFr={site.taglineFr}
        uploadHint={logoUploadHint()}
        uploadsEnabled={logoUploadsEnabled()}
      />
      <aside className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
        <h2 className="font-extrabold">ملاحظة حول الملفات</h2>
        <p className="mt-1">
          الشعار يظهر في رأس الموقع وتذييله باللغتين. استخدم صورة شفافة وواضحة، ويفضل PNG أو SVG أو WebP.
          عند اختيار صورة من المكتبة الإعلامية، انسخ رابطها والصقه في الخطوة الأولى.
        </p>
      </aside>
    </div>
  );
}
