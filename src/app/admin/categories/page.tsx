import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import { deleteCategoryAction } from "../catalog-actions";
import { countProductsByCategory, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; db?: string }>;
}) {
  const sp = await searchParams;
  const [cats, counts] = await Promise.all([getCategories(), countProductsByCategory()]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="التصنيفات"
        subtitle={`${cats.length} catégorie(s)`}
        action={{ href: "/admin/categories/new", label: "تصنيف جديد" }}
      />
      <DbBanner failed={Boolean(sp.error) || sp.db === "error"} message={sp.error} />
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Catégorie</th>
              <th className="px-4 py-3">Produits</th>
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cats.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {c.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <span className="text-xl">{c.icon}</span>
                    )}
                    <div>
                      <p className="font-bold">{c.nameFr}</p>
                      <p className="text-xs text-slate-500" dir="rtl">
                        {c.nameAr}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-bold">{counts[c.slug] ?? 0}</td>
                <td className="px-4 py-3 text-center">{c.sort}</td>
                <td className="px-4 py-3 text-end">
                  <Link href={`/admin/categories/${c.id}`} className="me-3 text-xs font-bold">
                    Modifier
                  </Link>
                  <form action={deleteCategoryAction} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="text-xs font-bold text-red-600">Supprimer</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
