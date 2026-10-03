import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { saveCategoryAction } from "../catalog-actions";
import type { Category } from "@/db/schema";

export function CategoryForm({ category }: { category?: Category }) {
  return (
    <ActionForm action={saveCategoryAction}>
      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="الاسم بالفرنسية" name="nameFr" defaultValue={category?.nameFr} required />
        <Field label="الاسم بالعربية" name="nameAr" defaultValue={category?.nameAr} required dir="rtl" />
        <Field label="المعرّف" name="slug" defaultValue={category?.slug} />
        <Field label="الأيقونة" name="icon" defaultValue={category?.icon ?? "📦"} />
        <Field label="الترتيب" name="sort" type="number" defaultValue={category?.sort ?? 0} />
        <Field label="Image (URL)" name="image" defaultValue={category?.image} />
        <Field label="الوصف بالفرنسية" name="descFr" defaultValue={category?.descFr} textarea />
        <Field label="الوصف بالعربية" name="descAr" defaultValue={category?.descAr} textarea dir="rtl" />
      </div>
    </ActionForm>
  );
}
