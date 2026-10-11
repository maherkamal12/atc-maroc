import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import {
  bulkProductsAction,
  deleteProductAction,
  duplicateProductAction,
  toggleProductFlagAction,
} from "../catalog-actions";
import { countProductsByCategory, getCategories, getProductsPage } from "@/lib/data";
import { imageUsageCounts } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string; db?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const [{ items, total, pages }, categories, usage] = await Promise.all([
    getProductsPage({ q: sp.q, category: sp.category, page, pageSize: 30, sort: "newest" }),
    getCategories(),
    imageUsageCounts(),
  ]);
  const counts = await countProductsByCategory();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="المنتجات"
        subtitle={`${total} منتج — عروض أسعار فقط، دون أسعار.`}
        action={{ href: "/admin/products/new", label: "منتج جديد" }}
      />
      <DbBanner failed={sp.db === "error"} />

      <form className="flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} placeholder="بحث…" className="field max-w-xs" />
        <select name="category" defaultValue={sp.category ?? ""} className="field max-w-xs">
          <option value="">كل التصنيفات</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.nameFr} ({counts[c.slug] ?? 0})
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          تصفية
        </button>
        <Link className="btn btn-outline" href="/admin/products/export">
          تصدير CSV
        </Link>
        <Link className="btn btn-outline" href="/admin/products/import">
          استيراد CSV
        </Link>
      </form>

      <form action={bulkProductsAction} className="space-y-3">
        <div className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-sm">
          <span className="text-xs font-bold text-slate-500">التحديد:</span>
          <button name="op" value="delete" className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
            حذف
          </button>
          <button name="op" value="feature" className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
            إبراز
          </button>
          <button name="op" value="unfeature" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
            إلغاء الإبراز
          </button>
          <button name="op" value="stock" className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            متوفر
          </button>
          <button name="op" value="unstock" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
            غير متوفر
          </button>
          <select name="categorySlug" className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameFr}
              </option>
            ))}
          </select>
          <button name="op" value="category" className="rounded-lg bg-brand-950 px-3 py-1.5 text-xs font-bold text-white">
            تغيير التصنيف
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[64rem] text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3" />
                <th className="px-3 py-3 text-start">صورة</th>
                <th className="px-3 py-3 text-start">المنتج</th>
                <th className="px-3 py-3 text-start">التصنيف</th>
                <th className="px-3 py-3">المخزون</th>
                <th className="px-3 py-3">إبراز</th>
                <th className="px-3 py-3 text-end">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((product) => {
                const dup = (usage[product.image] ?? 0) > 1;
                return (
                  <tr key={product.id}>
                    <td className="px-3 py-2">
                      <input type="checkbox" name="ids" value={product.id} />
                    </td>
                    <td className="px-3 py-2">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      ) : (
                        <span className="grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-xs">—</span>
                      )}
                      {dup ? (
                        <span className="mt-1 block text-[10px] font-bold text-amber-700">صورة مشتركة</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2">
                      <p className="font-bold text-brand-950">{product.nameFr}</p>
                      <p className="text-xs text-slate-500" dir="rtl">
                        {product.nameAr}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-xs">{product.categorySlug}</td>
                    <td className="px-3 py-2 text-center">
                      <button formAction={toggleProductFlagAction} name="id" value={product.id} className="text-xs font-bold">
                        <input type="hidden" name="field" value="inStock" />
                        <input type="hidden" name="value" value={String(product.inStock)} />
                        {product.inStock ? "متوفر" : "غير متوفر"}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button formAction={toggleProductFlagAction} name="id" value={product.id} className="text-xs font-bold">
                        <input type="hidden" name="field" value="featured" />
                        <input type="hidden" name="value" value={String(product.featured)} />
                        {product.featured ? "★" : "☆"}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-end">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className="text-xs font-bold text-brand-800">
                          تعديل
                        </Link>
                        <button formAction={duplicateProductAction} name="id" value={product.id} className="text-xs font-bold">
                          نسخ
                        </button>
                        <button
                          formAction={deleteProductAction}
                          name="id"
                          value={product.id}
                          className="text-xs font-bold text-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>

      {pages > 1 ? (
        <p className="text-sm text-slate-500">
          صفحة {page} / {pages}{" "}
          {page > 1 ? (
            <Link className="font-bold" href={`/admin/products?page=${page - 1}`}>
              السابق
            </Link>
          ) : null}{" "}
          {page < pages ? (
            <Link className="font-bold" href={`/admin/products?page=${page + 1}`}>
              التالي
            </Link>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
