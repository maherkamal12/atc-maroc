import { AdminHeader } from "../../_ui";
import { PageEditor } from "../page-editor";

export default function NewPagePage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="صفحة جديدة" subtitle="Même gabarit : en-tête photo + blocs bilingues." />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <PageEditor />
      </div>
    </div>
  );
}
