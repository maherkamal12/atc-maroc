import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import { deletePostAction } from "../catalog-actions";
import { listAdminPosts } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage({ searchParams }: { searchParams: Promise<{ db?: string }> }) {
  const [{ db }, posts] = await Promise.all([searchParams, listAdminPosts()]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Articles de blog"
        subtitle={`${posts.length} article(s)`}
        action={{ href: "/admin/blog/new", label: "Nouvel article" }}
      />
      <DbBanner failed={db === "error"} />
      <div className="space-y-3">
        {posts.map((p) => (
          <article key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <p className="font-extrabold text-brand-950">{p.titleFr}</p>
              <p className="text-xs text-slate-500">
                {p.published ? "publié" : "brouillon"} · {new Date(p.publishedAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/blog/${p.id}`} className="text-xs font-bold">
                Modifier
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-xs font-bold text-red-600">Supprimer</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
