import { AdminHeader } from "../../_ui";

export const dynamic = "force-dynamic";

export default function ImportPage() {
  return (
    <div className="space-y-4">
      <AdminHeader title="استيراد CSV" subtitle="استخدموا الأمر npm run db:import — file.csv (تحديث حسب المعرّف)." />
      <p className="rounded-2xl border border-slate-100 bg-white p-6 text-sm leading-relaxed text-slate-600">
        محلياً: <code className="rounded bg-slate-100 px-1">npm run db:import -- produits.csv</code>. الأعمدة:
        slug, category_slug, name_ar, name_fr, desc_ar, desc_fr, brand, image, specs_ar, specs_fr, featured,
        in_stock, sort. ممنوع عمود السعر. الخيار <code>--dry-run</code> للمعاينة.
      </p>
    </div>
  );
}
