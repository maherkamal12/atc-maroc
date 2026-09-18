import { setOrderStatus } from "../actions";
import { listAllOrderItems, listOrders } from "@/lib/data";

export const dynamic = "force-dynamic";

const statuses = [
  { value: "new", label: "Nouvelle" },
  { value: "contacted", label: "Contacté" },
  { value: "confirmed", label: "Confirmée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
];

export default async function AdminOrdersPage() {
  const [orders, items] = await Promise.all([listOrders(), listAllOrderItems()]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-950">Commandes</h1>
        <p className="text-sm text-slate-500">{orders.length} commande(s) enregistrée(s).</p>
      </header>

      {orders.length ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-start">Référence</th>
                <th className="px-4 py-3 text-start">Client</th>
                <th className="px-4 py-3 text-start">Produits</th>
                <th className="px-4 py-3 text-start">Articles</th>
                <th className="px-4 py-3 text-start">Date</th>
                <th className="px-4 py-3 text-start">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const orderProducts = items.filter((item) => item.orderId === order.id);
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3 font-extrabold text-brand-950">{order.reference}</td>
                    <td className="px-4 py-3">
                      <span className="block font-bold text-brand-900">{order.customerName}</span>
                      <span className="block text-xs text-slate-500">{order.email}</span>
                      <span className="block text-xs text-slate-500">{order.phone}</span>
                      {order.address && (
                        <span className="block text-xs text-slate-400">
                          {order.city} — {order.address}
                        </span>
                      )}
                      {order.note && (
                        <span className="mt-1 block text-xs italic text-slate-400">{order.note}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1 text-xs text-slate-600">
                        {orderProducts.map((item) => (
                          <li key={item.id}>
                            {item.quantity} × {item.nameFr}
                          </li>
                        ))}
                        {!orderProducts.length && <li>—</li>}
                      </ul>
                    </td>
                    <td className="px-4 py-3 font-extrabold text-brand-900">
                      {order.itemsCount} article(s)
                      <span className="block text-[11px] font-semibold text-slate-400">prix sur demande</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <form action={setOrderStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={order.id} />
                        <select
                          name="status"
                          defaultValue={order.status}
                          className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold"
                        >
                          {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="rounded-lg bg-brand-950 px-3 py-1.5 text-xs font-bold text-white"
                        >
                          OK
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Aucune commande. Les commandes passées depuis le panier apparaîtront ici.
        </p>
      )}
    </div>
  );
}
