import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { replaceMediaAction } from "../catalog-actions";
import { listMediaRefs } from "@/lib/admin-data";
import Link from "next/link";
import { UploadForm } from "./upload-form";

export const dynamic = "force-dynamic";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string }>;
}) {
  const sp = await searchParams;
  const refs = await listMediaRefs();
  const byUrl = new Map<string, typeof refs>();
  for (const ref of refs) {
    const list = byUrl.get(ref.url) ?? [];
    list.push(ref);
    byUrl.set(ref.url, list);
  }
  let urls = [...byUrl.keys()];
  if (sp.q) {
    const q = sp.q.toLowerCase();
    urls = urls.filter((u) => u.toLowerCase().includes(q));
  }
  if (sp.filter === "duplicated") urls = urls.filter((u) => (byUrl.get(u)?.length ?? 0) > 1);
  if (sp.filter === "unused") urls = urls.filter((u) => !byUrl.get(u)?.length);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Images du site"
        subtitle={`${urls.length} URL(s) — produits, catégories, services, articles, réglages.`}
      />

      <UploadForm />

      <form className="flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} className="field max-w-xs" placeholder="Filtrer une URL…" />
        <select name="filter" defaultValue={sp.filter ?? ""} className="field max-w-xs">
          <option value="">Toutes</option>
          <option value="duplicated">Dupliquées</option>
        </select>
        <button className="btn btn-primary">Filtrer</button>
      </form>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-extrabold">Remplacer une image partout</h2>
        <ActionForm action={replaceMediaAction} submitLabel="Remplacer partout">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="URL actuelle" name="from" />
            <Field label="Nouvelle URL" name="to" />
          </div>
        </ActionForm>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {urls.map((url) => {
          const used = byUrl.get(url) ?? [];
          return (
            <article key={url} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-36 w-full object-cover bg-slate-100" />
              <div className="space-y-1 p-3 text-xs">
                <p className="truncate font-mono text-[11px] text-slate-500">{url}</p>
                {used.length > 1 ? (
                  <p className="font-bold text-amber-700">utilisée {used.length} fois</p>
                ) : null}
                <ul className="space-y-0.5">
                  {used.slice(0, 6).map((u) => (
                    <li key={u.href + u.label}>
                      <Link href={u.href} className="font-semibold text-brand-800">
                        {u.kind} · {u.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
