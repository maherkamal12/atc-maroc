import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import { deletePageAction } from "../catalog-actions";
import { listCustomPages } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex({
  searchParams,
}: {
  searchParams: Promise<{ db?: string }>;
}) {
  const [{ db }, pages] = await Promise.all([searchParams, listCustomPages()]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Pages"
        subtitle="Textes et images des pages existantes + création de pages au même design."
        action={{ href: "/admin/pages/new", label: "صفحة جديدة" }}
      />
      <DbBanner failed={db === "error"} />

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { href: "/admin/content#Accueil", title: "Accueil", hint: "Hero, textes, images" },
          { href: "/admin/content#À propos", title: "À propos", hint: "Mission, vision, image" },
          { href: "/admin/content#Design", title: "Design", hint: "Blocs + photos" },
          { href: "/admin/content#Contact", title: "Contact", hint: "Chapô et visuel" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="font-extrabold text-brand-950">{item.title}</p>
            <p className="text-xs text-slate-500">{item.hint} — modifier textes & photos</p>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-extrabold text-brand-950">Pages créées</h2>
      {pages.length ? (
        <div className="space-y-3">
          {pages.map((page) => (
            <article
              key={page.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-extrabold">{page.titleFr}</p>
                <p className="text-xs text-slate-500">
                  /p/{page.slug} · {page.published ? "publiée" : "brouillon"}
                </p>
              </div>
              <div className="flex gap-3 text-xs font-bold">
                <Link href={`/fr/p/${page.slug}`} className="text-brand-700">
                  Voir
                </Link>
                <Link href={`/admin/pages/${page.id}`}>Modifier</Link>
                <form action={deletePageAction}>
                  <input type="hidden" name="id" value={page.id} />
                  <button className="text-red-600">Supprimer</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          Aucune page personnalisée. Créez-en une : en-tête + blocs image/texte comme la page Design.
        </p>
      )}
    </div>
  );
}
