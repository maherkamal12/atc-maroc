import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessageById } from "@/lib/admin-data";
import { archiveMessageAction, deleteMessageAction } from "../../catalog-actions";
import { toggleMessage } from "../../actions";
import { AdminHeader } from "../../_ui";

export const dynamic = "force-dynamic";

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const message = await getMessageById(Number((await params).id));
  if (!message) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={message.name} subtitle={message.email} />
      <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-xs text-slate-500">
          {new Date(message.createdAt).toLocaleString("fr-FR")} · {message.locale} · {message.phone}
        </p>
        <h2 className="mt-3 text-lg font-extrabold">{message.subject || "—"}</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{message.message}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <form action={toggleMessage}>
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="isRead" value={String(message.isRead)} />
            <button className="btn btn-outline">{message.isRead ? "غير مقروء" : "تعيين كمقروء"}</button>
          </form>
          <form action={archiveMessageAction}>
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="archived" value={String(message.archived)} />
            <button className="btn btn-outline">{message.archived ? "إلغاء الأرشفة" : "أرشفة"}</button>
          </form>
          <form action={deleteMessageAction}>
            <input type="hidden" name="id" value={message.id} />
            <button className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700">حذف</button>
          </form>
          <Link href="/admin/messages" className="btn btn-outline">
            رجوع
          </Link>
        </div>
      </article>
    </div>
  );
}
