import { AdminHeader } from "../_ui";
import { listNavRows } from "@/lib/cms";
import { MenuEditor } from "./menu-editor";

export const dynamic = "force-dynamic";

export default async function MenuAdminPage() {
  const rows = await listNavRows();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="القائمة الرئيسية"
        subtitle="أضيفوا أو احذفوا أو أعيدوا ترتيب أي رابط في شريط التنقل."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <MenuEditor rows={rows} />
      </div>
    </div>
  );
}
