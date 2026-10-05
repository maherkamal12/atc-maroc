import Link from "next/link";
import { setOrderStatus } from "../actions";
import { listAllOrderItems, listOrders } from "@/lib/data";
import { DeleteOrderButton } from "./delete-order-button";

export const dynamic = "force-dynamic";

const statuses = [
  { value: "new", label: "جديدة" },
  { value: "contacted", label: "تم التواصل" },
  { value: "confirmed", label: "مؤكدة" },
  { value: "delivered", label: "مُسلَّمة" },
  { value: "cancelled", label: "ملغاة" },
];


function DatabaseErrorBanner({ failed }: { failed: boolean }) {
  if (!failed) return null;
  return (
    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      قاعدة البيانات لم تستجب: لم يُحفظ التعديل. تحققوا من الاتصال (لوحة التحكم ← قاعدة البيانات).
    </p>
  );
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ db?: string; q?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const [orders, items] = await Promise.all([listOrders(), listAllOrderItems()]);
  const q = (sp.q ?? "").toLowerCase();
  const filtered = orders.filter((o) => {
    if (sp.status && o.status !== sp.status) return false;
    if (!q) return true;
    return [o.reference, o.customerName, o.email, o.phone, o.city].join(" ").toLowerCase().includes(q);
  });
  const db = sp.db;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-950">الطلبات</h1>
        <p className="text-sm text-slate-500">{filtered.length} طلب — عروض أسعار دون أسعار.</p>
      </header>
      <form className="flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} className="field max-w-xs" placeholder="بحث…" />
        <select name="status" defaultValue={sp.status ?? ""} className="field max-w-xs">
          <option value="">كل الحالات</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary">تصفية</button>
        <Link className="btn btn-outline" href="/admin/orders/export">
          تصدير CSV
        </Link>
      </form>

      <DatabaseErrorBanner failed={db === "error"} />

      {filtered.length ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-start">المرجع</th>
                <th className="px-4 py-3 text-start">العميل</th>
                <th className="px-4 py-3 text-start">المنتجات</th>
                <th className="px-4 py-3 text-start">القطع</th>
                <th className="px-4 py-3 text-start">التاريخ</th>
                <th className="px-4 py-3 text-start">الحالة</th>
                <th className="px-4 py-3 text-start">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => {
                const orderProducts = items.filter((item) => item.orderId === order.id);
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3 font-extrabold text-brand-950">
                      <Link href={`/admin/orders/${order.id}`}>{order.reference}</Link>
                    </td>
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
                      {order.itemsCount} قطعة
                      <span className="block text-[11px] font-semibold text-slate-400">السعر عند الطلب</span>
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
                          موافق
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold"
                        >
                          فتح
                        </Link>
                        <DeleteOrderButton id={order.id} reference={order.reference} compact />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          لا طلبات. ستظهر هنا طلبات سلة العروض.
        </p>
      )}
    </div>
  );
}
