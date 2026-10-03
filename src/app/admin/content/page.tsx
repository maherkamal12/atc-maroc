import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { saveContentAction } from "../catalog-actions";
import { CONTENT_KEYS, fallbackBlock, getContentMap } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const map = await getContentMap();
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Textes des pages"
        subtitle="AR + FR. Un champ vide affiche le texte d'origine du site."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActionForm action={saveContentAction}>
          <div className="space-y-8">
            {CONTENT_KEYS.map((block) => {
              const stored = map[block.key];
              const fb = fallbackBlock(block.key);
              return (
                <fieldset key={block.key} className="rounded-xl border border-slate-100 p-4">
                  <legend className="px-1 text-sm font-extrabold text-brand-950">{block.label}</legend>
                  <input type="hidden" name="key" value={block.key} />
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs font-bold">Français</span>
                      <textarea
                        name="valueFr"
                        className="field min-h-24"
                        defaultValue={stored?.valueFr || fb.fr}
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-xs font-bold">العربية</span>
                      <textarea
                        name="valueAr"
                        className="field min-h-24"
                        dir="rtl"
                        defaultValue={stored?.valueAr || fb.ar}
                      />
                    </label>
                  </div>
                </fieldset>
              );
            })}
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
