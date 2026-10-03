import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import { deleteServiceAction } from "../catalog-actions";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ db?: string }>;
}) {
  const [{ db }, services] = await Promise.all([searchParams, getServices()]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Services"
        subtitle={`${services.length} service(s)`}
        action={{ href: "/admin/services/new", label: "Nouveau service" }}
      />
      <DbBanner failed={db === "error"} />
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-extrabold">
                  {s.icon} {s.titleFr}
                </p>
                <p className="text-sm text-slate-500" dir="rtl">
                  {s.titleAr}
                </p>
              </div>
              <Link href={`/admin/services/${s.id}`} className="text-xs font-bold">
                Modifier
              </Link>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{s.shortFr}</p>
            <form action={deleteServiceAction} className="mt-3">
              <input type="hidden" name="id" value={s.id} />
              <button className="text-xs font-bold text-red-600">Supprimer</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
