import { AdminHeader } from "../_ui";
import { getResolvedSite, listNavRows } from "@/lib/cms";
import { MenuEditor } from "./menu-editor";

export const dynamic = "force-dynamic";

export default async function MenuAdminPage() {
  const [site, rows] = await Promise.all([getResolvedSite(), listNavRows()]);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Menu principal & logo"
        subtitle="Ajoutez, supprimez ou réordonnez n'importe quel lien de la barre de navigation."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <MenuEditor logoUrl={site.logoUrl} logoText={site.logoText} rows={rows} />
      </div>
    </div>
  );
}
