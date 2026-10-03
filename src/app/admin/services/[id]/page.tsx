import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/admin-data";
import { AdminHeader } from "../../_ui";
import { ServiceForm } from "../service-form";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const service = await getServiceById(Number((await params).id));
  if (!service) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={`Service · ${service.titleFr}`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
