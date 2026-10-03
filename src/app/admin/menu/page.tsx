import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { saveNavAction } from "../catalog-actions";
import { getResolvedSite, listNavRows } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function MenuAdminPage() {
  const [site, rows] = await Promise.all([getResolvedSite(), listNavRows()]);
  const extra = 4;
  const blanks = Array.from({ length: extra }, (_, i) => ({
    id: 0,
    href: "",
    labelAr: "",
    labelFr: "",
    parentHref: "",
    sort: rows.length + i,
    visible: true,
  }));
  const list = [...rows, ...blanks];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Menu principal & logo"
        subtitle="Contrôle la barre de navigation publique (AR/FR). Les lignes vides sont ignorées."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActionForm action={saveNavAction} submitLabel="Enregistrer le menu et le logo">
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <Field
              label="Logo (URL image)"
              name="logoUrl"
              defaultValue={site.logoUrl}
              hint="PNG/SVG/JPG. Vide = monogramme texte."
            />
            <Field label="Monogramme (si pas d'image)" name="logoText" defaultValue={site.logoText || "ATC"} />
          </div>
          {site.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.logoUrl} alt="" className="mb-6 h-16 w-auto object-contain" />
          ) : null}

          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Liens du menu</p>
          <p className="mb-4 text-xs text-slate-500">
            Lien parent vide = entrée principale. Pour un sous-menu, mettez le même chemin que le parent (ex.{" "}
            <code>/services</code>). Chemins sans locale : <code>/about</code>, <code>/products</code>.
          </p>
          <div className="space-y-3">
            {list.map((row, index) => (
              <fieldset key={`${row.id}-${index}`} className="grid gap-2 rounded-xl border border-slate-100 p-3 md:grid-cols-6">
                <label className="block text-xs font-bold md:col-span-2">
                  Lien
                  <input name="href" defaultValue={row.href} className="field mt-1" placeholder="/about" />
                </label>
                <label className="block text-xs font-bold">
                  FR
                  <input name="labelFr" defaultValue={row.labelFr} className="field mt-1" />
                </label>
                <label className="block text-xs font-bold">
                  AR
                  <input name="labelAr" defaultValue={row.labelAr} className="field mt-1" dir="rtl" />
                </label>
                <label className="block text-xs font-bold">
                  Parent
                  <input name="parentHref" defaultValue={row.parentHref} className="field mt-1" placeholder="" />
                </label>
                <div className="flex items-end gap-2">
                  <label className="block flex-1 text-xs font-bold">
                    Ordre
                    <input name="sort" type="number" defaultValue={row.sort} className="field mt-1" />
                  </label>
                  <label className="block text-xs font-bold">
                    Visible
                    <select name="visible" defaultValue={row.visible ? "1" : "0"} className="field mt-1">
                      <option value="1">Oui</option>
                      <option value="0">Non</option>
                    </select>
                  </label>
                </div>
              </fieldset>
            ))}
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
