import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { saveContentAction } from "../catalog-actions";
import { CONTENT_KEYS, fallbackBlock, getContentMap } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const map = await getContentMap();
  const groups = [...new Set(CONTENT_KEYS.map((item) => item.group))];
  return (
    <div className="space-y-6">
      <AdminHeader
        title="نصوص وصور الصفحات"
        subtitle="Chaque page du site : AR + FR, et URL d'image. Vide = texte d'origine."
      />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActionForm action={saveContentAction}>
          <div className="space-y-10">
            {groups.map((group) => (
              <section key={group} id={group} className="scroll-mt-8">
                <h2 className="mb-4 text-lg font-extrabold text-brand-950">{group}</h2>
                <div className="space-y-4">
                  {CONTENT_KEYS.filter((block) => block.group === group).map((block) => {
                    const stored = map[block.key];
                    const fb = fallbackBlock(block.key);
                    if (block.kind === "image") {
                      const url = stored?.valueFr || stored?.valueAr || fb.fr;
                      return (
                        <fieldset key={block.key} className="rounded-xl border border-slate-100 p-4">
                          <legend className="px-1 text-sm font-extrabold">{block.label}</legend>
                          <input type="hidden" name="key" value={block.key} />
                          <input type="hidden" name="valueAr" value={url} />
                          <label className="mt-2 block space-y-1">
                            <span className="text-xs font-bold">URL de l&apos;image</span>
                            <input name="valueFr" className="field" defaultValue={url} />
                          </label>
                          {url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={url} alt="" className="mt-3 h-28 w-full rounded-xl object-cover" />
                          ) : null}
                        </fieldset>
                      );
                    }
                    return (
                      <fieldset key={block.key} className="rounded-xl border border-slate-100 p-4">
                        <legend className="px-1 text-sm font-extrabold">{block.label}</legend>
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
              </section>
            ))}
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
