import { ActionForm } from "../_form";
import { Check, Field } from "../_ui";
import { saveProductAction } from "../catalog-actions";
import type { Category, Product } from "@/db/schema";

export function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  return (
    <ActionForm action={saveProductAction} submitLabel={product ? "تحديث" : "إنشاء المنتج"}>
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="الاسم (فرنسي)" name="nameFr" defaultValue={product?.nameFr} required />
        <Field label="الاسم (عربي)" name="nameAr" defaultValue={product?.nameAr} required dir="rtl" />
        <Field label="المعرّف" name="slug" defaultValue={product?.slug} hint="Laissé vide = généré automatiquement" />
        <label className="block space-y-1">
          <span className="text-xs font-bold text-brand-950">Catégorie</span>
          <select name="categorySlug" defaultValue={product?.categorySlug} className="field" required>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameFr}
              </option>
            ))}
          </select>
        </label>
        <Field label="العلامة" name="brand" defaultValue={product?.brand ?? "ATC"} />
        <Field label="الترتيب" name="sort" type="number" defaultValue={product?.sort ?? 0} />
        <div className="md:col-span-2">
          <Field
            label="Image (URL)"
            name="image"
            defaultValue={product?.image}
            hint="URL externe, ou importez un fichier depuis Images."
          />
        </div>
        <Field label="الوصف بالفرنسية" name="descFr" defaultValue={product?.descFr} textarea />
        <Field label="الوصف بالعربية" name="descAr" defaultValue={product?.descAr} textarea dir="rtl" />
        <Field
          label="Caractéristiques FR"
          name="specsFr"
          defaultValue={product?.specsFr}
          textarea
          hint="Séparées par |"
        />
        <Field
          label="Caractéristiques AR"
          name="specsAr"
          defaultValue={product?.specsAr}
          textarea
          dir="rtl"
          hint="Séparées par |"
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <Check name="featured" label="مميز" defaultChecked={product?.featured} />
        <Check name="inStock" label="متوفر" defaultChecked={product?.inStock ?? true} />
      </div>
    </ActionForm>
  );
}
