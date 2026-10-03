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
        subtitle={`${total} produit(s) — devis uniquement, jamais de prix.`}
        action={{ href: "/admin/products/new", label: "منتج جديد" }}
      />
      <DbBanner failed={sp.db === "error"} />

      <form className="flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} placeholder="بحث…" className="field max-w-xs" />
        <select name="category" defaultValue={sp.category ?? ""} className="field max-w-xs">
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.nameFr} ({counts[c.slug] ?? 0})
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          Filtrer
        </button>
        <Link className="btn btn-outline" href="/admin/products/export">
          Export CSV
        </Link>
        <Link className="btn btn-outline" href="/admin/products/import">
          Import CSV
        </Link>
      </form>

      <form action={bulkProductsAction} className="space-y-3">
        <div className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-sm">
          <span className="text-xs font-bold text-slate-500">Sélection :</span>
          <button name="op" value="delete" className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
            Supprimer
          </button>
          <button name="op" value="feature" className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
            Mettre en avant
          </button>
          <button name="op" value="unfeature" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
            Retirer mise en avant
          </button>
          <button name="op" value="stock" className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            Disponible
          </button>
          <button name="op" value="unstock" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
            Indisponible
          </button>
          <select name="categorySlug" className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameFr}
              </option>
            ))}
          </select>
          <button name="op" value="category" className="rounded-lg bg-brand-950 px-3 py-1.5 text-xs font-bold text-white">
            Changer catégorie
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[64rem] text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3" />
                <th className="px-3 py-3 text-start">Image</th>
                <th className="px-3 py-3 text-start">Produit</th>
                <th className="px-3 py-3 text-start">Catégorie</th>
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Avant</th>
                <th className="px-3 py-3 text-end">Actions</th>
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
                        <span className="mt-1 block text-[10px] font-bold text-amber-700">image partagée</span>
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
                        {product.inStock ? "disponible" : "indisponible"}
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
                          Modifier
                        </Link>
                        <button formAction={duplicateProductAction} name="id" value={product.id} className="text-xs font-bold">
                          Dupliquer
                        </button>
                        <button
                          formAction={deleteProductAction}
                          name="id"
                          value={product.id}
                          className="text-xs font-bold text-red-600"
                        >
                          Supprimer
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
          Page {page} / {pages}{" "}
          {page > 1 ? (
            <Link className="font-bold" href={`/admin/products?page=${page - 1}`}>
              précédent
            </Link>
          ) : null}{" "}
          {page < pages ? (
            <Link className="font-bold" href={`/admin/products?page=${page + 1}`}>
              suivant
            </Link>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
