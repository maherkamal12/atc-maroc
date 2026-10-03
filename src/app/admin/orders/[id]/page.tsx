import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderWithItems } from "@/lib/admin-data";
import { archiveOrderAction, deleteOrderAction } from "../../catalog-actions";
import { setOrderStatus } from "../../actions";
import { AdminHeader } from "../../_ui";

export const dynamic = "force-dynamic";

const statuses = [
  { value: "new", label: "جديدة" },
  { value: "contacted", label: "تم التواصل" },
  { value: "confirmed", label: "مؤكدة" },
  { value: "delivered", label: "مُسلَّمة" },
  { value: "cancelled", label: "ملغاة" },
  { value: "archived", label: "مؤرشفة" },
];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const data = await getOrderWithItems(Number((await params).id));
  if (!data) notFound();
  const { order, items } = data;
  return (
    <div className="space-y-6">
      <AdminHeader title={order.reference} subtitle={`${order.customerName} · عرض سعر دون أسعار`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-sm">
          {order.email} · {order.phone}
        </p>
        <p className="text-sm text-slate-500">
          {order.city} {order.address}
        </p>
        {order.note ? <p className="mt-2 italic text-slate-500">{order.note}</p> : null}
        <ul className="mt-4 space-y-1 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              {item.quantity} × {item.nameFr}
            </li>
          ))}
        </ul>
        <form action={setOrderStatus} className="mt-6 flex flex-wrap gap-2">
          <input type="hidden" name="id" value={order.id} />
          <select name="status" defaultValue={order.status} className="field max-w-xs">
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button className="btn btn-primary">تحديث</button>
        </form>
        <div className="mt-4 flex gap-2">
          <form action={archiveOrderAction}>
            <input type="hidden" name="id" value={order.id} />
            <input type="hidden" name="archived" value={String(order.archived)} />
            <button className="btn btn-outline">{order.archived ? "إلغاء الأرشفة" : "أرشفة"}</button>
          </form>
          <form action={deleteOrderAction}>
            <input type="hidden" name="id" value={order.id} />
            <button className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700">حذف</button>
          </form>
          <Link href="/admin/orders" className="btn btn-outline">
            رجوع
          </Link>
        </div>
      </div>
    </div>
  );
}
