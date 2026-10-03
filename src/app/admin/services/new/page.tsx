import { AdminHeader } from "../../_ui";
import { ServiceForm } from "../service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Nouveau service" />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ServiceForm />
      </div>
    </div>
  );
}
