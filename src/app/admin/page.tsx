import Link from "next/link";
import { dashboardStats, listMessages, listOrders } from "@/lib/data";
import { databaseStatus } from "@/db/status";

export const dynamic = "force-dynamic";

function databaseBadge(status: Awaited<ReturnType<typeof databaseStatus>>) {
  if (!status.configured) {
    return {
      label: "Non configurée",
      dot: "bg-slate-400",
      chip: "bg-slate-100 text-slate-600",
      hint: "Ajoutez DATABASE_URL (Neon) dans les variables d'environnement puis redéployez. En attendant, les messages et commandes ne sont pas enregistrés.",
    };
  }
  if (!status.reachable) {
    return {
      label: "Injoignable",
      dot: "bg-red-500",
      chip: "bg-red-50 text-red-700",
      hint: `DATABASE_URL est définie mais la connexion échoue${status.error ? ` (${status.error})` : ""}. Vérifiez le mot de passe et le nom d'hôte Neon.`,
    };
  }
  if (status.schema !== "ready") {
    return {
      label: "Tables manquantes",
      dot: "bg-amber-500",
      chip: "bg-amber-50 text-amber-700",
      hint: `La connexion fonctionne mais les tables ${status.missingTables.join(", ")} n'existent pas. Lancez « npm run db:push » (ou autorisez la création automatique avec DATABASE_AUTO_MIGRATE).`,
    };
  }
  return {
    label: "Connectée",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
    hint: `${status.target ?? "base"} · ${status.rows?.messages ?? 0} message(s), ${status.rows?.orders ?? 0} commande(s), ${status.rows?.products ?? 0} produit(s).`,
  };
}

export default async function AdminDashboard() {
  const [stats, messages, orders, db] = await Promise.all([
    dashboardStats(),
    listMessages(),
    listOrders(),
    databaseStatus(),
  ]);

  const badge = databaseBadge(db);

  const cards = [
    { label: "Messages", value: stats.messages, hint: `${stats.unread} non lus`, href: "/admin/messages" },
    { label: "Commandes", value: stats.orders, hint: "toutes status", href: "/admin/orders" },
    { label: "Produits", value: stats.products, hint: "catalogue importé", href: "/admin/products" },
    { label: "Articles devis", value: stats.orderItems, hint: "lignes de devis", href: "/admin/orders" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-950">Tableau de bord</h1>
        <p className="text-sm text-slate-500">
          Suivi des demandes de contact et des commandes du site ATC.
        </p>
      </header>

      <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <span className={`h-2.5 w-2.5 rounded-full ${badge.dot}`} aria-hidden />
        <h2 className="text-sm font-extrabold text-brand-950">Base de données</h2>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${badge.chip}`}>
          {badge.label}
        </span>
        <p className="w-full text-xs leading-relaxed text-slate-500">{badge.hint}</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{card.label}</span>
            <span className="mt-2 block text-3xl font-black text-brand-950">{card.value}</span>
            <span className="mt-1 block text-xs text-slate-500">{card.hint}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-brand-950">Derniers messages</h2>
          {messages.length ? (
            <ul className="mt-4 divide-y divide-slate-100">
              {messages.slice(0, 6).map((message) => (
                <li key={message.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-bold text-brand-950">{message.name}</p>
                    <p className="text-xs text-slate-500">{message.email}</p>
                    <p className="mt-1 line-clamp-2-custom text-xs text-slate-600">
                      {message.subject || message.message}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                      message.isRead ? "bg-slate-100 text-slate-500" : "bg-accent-500/15 text-accent-700"
                    }`}
                  >
                    {message.isRead ? "lu" : "nouveau"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Aucun message pour le moment.</p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-brand-950">Dernières commandes</h2>
          {orders.length ? (
            <>
              <ul className="mt-4 divide-y divide-slate-100">
                {orders.slice(0, 6).map((order) => (
                  <li key={order.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-bold text-brand-950">{order.reference}</p>
                      <p className="text-xs text-slate-500">{order.customerName}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-extrabold text-brand-900">
                        {order.itemsCount} article(s)
                      </p>
                      <p className="text-[10px] font-bold uppercase text-slate-400">{order.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Aucune commande pour le moment.</p>
          )}
        </section>
      </div>
    </div>
  );
}
