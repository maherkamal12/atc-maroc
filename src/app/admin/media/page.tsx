import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { registerMediaUrlAction, replaceMediaAction } from "../catalog-actions";
import { listLibrary, mediaUploadHint, mediaUploadsEnabled } from "@/lib/media";
import { MediaLibrary } from "./library-client";

export const dynamic = "force-dynamic";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const items = await listLibrary();
  const uploads = items.filter((item) => item.storage === "blob" || item.storage === "local").length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="المكتبة الإعلامية"
        subtitle={`${items.length} ملف · ${uploads} مخزّنة. بحث، معاينة، نسخ الرابط، وتنظيف غير المستخدم.`}
      />

      <MediaLibrary
        items={items}
        error={sp.error}
        uploadHint={mediaUploadHint()}
        uploadsEnabled={mediaUploadsEnabled()}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-extrabold">تسجيل رابط موجود</h2>
          <ActionForm action={registerMediaUrlAction} submitLabel="إضافة إلى المكتبة">
            <Field label="URL" name="url" hint="صورة مستضافة في مكان آخر" />
          </ActionForm>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-extrabold">استبدال صورة في كل مكان</h2>
          <ActionForm action={replaceMediaAction} submitLabel="استبدال في كل مكان">
            <div className="grid gap-3">
              <Field label="الرابط الحالي" name="from" />
              <Field label="الرابط الجديد" name="to" />
            </div>
          </ActionForm>
        </div>
      </div>
    </div>
  );
}
