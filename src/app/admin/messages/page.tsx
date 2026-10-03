import Link from "next/link";
import { toggleMessage } from "../actions";
import { listMessages } from "@/lib/data";

export const dynamic = "force-dynamic";


function DatabaseErrorBanner({ failed }: { failed: boolean }) {
  if (!failed) return null;
  return (
    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      La base de données n&apos;a pas répondu : la modification n&apos;a pas été enregistrée. Vérifiez
      la connexion (tableau de bord → Base de données).
    </p>
  );
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ db?: string; q?: string; archived?: string }>;
}) {
  const sp = await searchParams;
  const messages = await listMessages({ archived: sp.archived === "1" });
  const q = (sp.q ?? "").toLowerCase();
  const filtered = q
    ? messages.filter((m) =>
        [m.name, m.email, m.subject, m.message, m.phone].join(" ").toLowerCase().includes(q),
      )
    : messages;
  const db = sp.db;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-950">Messages de contact</h1>
        <p className="text-sm text-slate-500">{filtered.length} message(s).</p>
      </header>
      <form className="flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} className="field max-w-xs" placeholder="بحث…" />
        <button className="btn btn-primary">Filtrer</button>
        <Link className="btn btn-outline" href="/admin/messages/export">
          Export CSV
        </Link>
      </form>

      <DatabaseErrorBanner failed={db === "error"} />

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
                message.isRead ? "border-slate-100" : "border-accent-300"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-brand-950">{message.name}</h2>
                  <p className="text-xs text-slate-500">
                    {message.email} {message.phone ? `· ${message.phone}` : ""}
                  </p>
                </div>
                <div className="text-end text-xs text-slate-400">
                  <p>{new Date(message.createdAt).toLocaleString("fr-FR")}</p>
                  <p className="font-bold uppercase text-brand-500">{message.locale}</p>
                </div>
              </div>
              {message.subject && (
                <p className="mt-3 text-sm font-bold text-brand-800">{message.subject}</p>
              )}
              {message.message && (
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {message.message}
                </p>
              )}
              <Link href={`/admin/messages/${message.id}`} className="mt-3 inline-block text-xs font-bold">
                Détail
              </Link>
              <form action={toggleMessage} className="mt-4">
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="isRead" value={String(message.isRead)} />
                <button
                  type="submit"
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-brand-800 transition hover:bg-slate-50"
                >
                  {message.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                </button>
              </form>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Aucun message reçu. Les envois via le formulaire de contact apparaîtront ici.
        </p>
      )}
    </div>
  );
}
