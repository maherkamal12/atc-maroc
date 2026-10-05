import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { saveServiceAction } from "../catalog-actions";
import type { Service } from "@/db/schema";

export function ServiceForm({ service }: { service?: Service }) {
  return (
    <ActionForm action={saveServiceAction}>
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="العنوان بالفرنسية" name="titleFr" defaultValue={service?.titleFr} required />
        <Field label="العنوان بالعربية" name="titleAr" defaultValue={service?.titleAr} required dir="rtl" />
        <Field label="المعرّف" name="slug" defaultValue={service?.slug} />
        <Field label="الأيقونة" name="icon" defaultValue={service?.icon ?? "⚡"} />
        <Field label="الترتيب" name="sort" type="number" defaultValue={service?.sort ?? 0} />
        <Field label="رابط الصورة" name="image" defaultValue={service?.image} />
        <Field label="الملخص بالفرنسية" name="shortFr" defaultValue={service?.shortFr} textarea />
        <Field label="الملخص بالعربية" name="shortAr" defaultValue={service?.shortAr} textarea dir="rtl" />
        <Field label="المحتوى بالفرنسية" name="bodyFr" defaultValue={service?.bodyFr} textarea />
        <Field label="المحتوى بالعربية" name="bodyAr" defaultValue={service?.bodyAr} textarea dir="rtl" />
        <Field label="النقاط بالفرنسية (|)" name="bulletsFr" defaultValue={service?.bulletsFr} textarea />
        <Field label="النقاط بالعربية (|)" name="bulletsAr" defaultValue={service?.bulletsAr} textarea dir="rtl" />
      </div>
    </ActionForm>
  );
}
