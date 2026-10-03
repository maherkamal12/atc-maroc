"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { savePageAction, type ActionState } from "../catalog-actions";
import type { PageSection } from "@/lib/pages";

const initial: ActionState = { error: null };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Enregistrement…" : "Enregistrer la page"}
    </button>
  );
}

function emptySection(): PageSection & { key: string } {
  return {
    key: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: "split",
    titleAr: "",
    titleFr: "",
    bodyAr: "",
    bodyFr: "",
    image: "",
  };
}

type SectionDraft = PageSection & { key: string };

export function PageEditor({
  id,
  slug,
  titleAr,
  titleFr,
  subtitleAr,
  subtitleFr,
  heroImage,
  sections,
  published,
  sort,
}: {
  id?: number;
  slug?: string;
  titleAr?: string;
  titleFr?: string;
  subtitleAr?: string;
  subtitleFr?: string;
  heroImage?: string;
  sections?: PageSection[];
  published?: boolean;
  sort?: number;
}) {
  const [state, formAction] = useActionState(savePageAction, initial);
  const [blocks, setBlocks] = useState<SectionDraft[]>(() =>
    (sections ?? []).map((s, i) => ({ ...s, key: `s-${i}` })),
  );

  return (
    <form action={formAction} className="space-y-6">
      {id ? <input type="hidden" name="id" value={id} /> : null}
      <input type="hidden" name="sections" value={JSON.stringify(blocks.map(({ key: _k, ...rest }) => rest))} />

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Page enregistrée. Ajoutez-la au menu via Menu & logo (lien <code>/p/votre-slug</code>).
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-xs font-bold">
          Titre FR
          <input name="titleFr" required defaultValue={titleFr} className="field mt-1" />
        </label>
        <label className="block text-xs font-bold">
          Titre AR
          <input name="titleAr" required defaultValue={titleAr} className="field mt-1" dir="rtl" />
        </label>
        <label className="block text-xs font-bold">
          Slug
          <input name="slug" defaultValue={slug} className="field mt-1" placeholder="notre-equipe" />
          <span className="mt-1 block font-normal text-slate-400">URL : /fr/p/slug et /ar/p/slug</span>
        </label>
        <label className="block text-xs font-bold">
          Image d&apos;en-tête (URL)
          <input name="heroImage" defaultValue={heroImage} className="field mt-1" />
        </label>
        <label className="block text-xs font-bold md:col-span-2">
          Sous-titre FR
          <textarea name="subtitleFr" defaultValue={subtitleFr} className="field mt-1 min-h-20" />
        </label>
        <label className="block text-xs font-bold md:col-span-2">
          Sous-titre AR
          <textarea name="subtitleAr" defaultValue={subtitleAr} className="field mt-1 min-h-20" dir="rtl" />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="published" defaultChecked={published ?? true} /> Publiée
        </label>
        <label className="block text-xs font-bold">
          Ordre
          <input name="sort" type="number" defaultValue={sort ?? 0} className="field mt-1" />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold">Blocs (même design que Design / À propos)</h2>
        <button
          type="button"
          className="btn btn-outline !py-2 !text-xs"
          onClick={() => setBlocks((b) => [...b, emptySection()])}
        >
          + Ajouter un bloc
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <fieldset key={block.key} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-extrabold uppercase text-slate-400">Bloc {index + 1}</span>
              <div className="flex gap-1">
                <select
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold"
                  value={block.type}
                  onChange={(e) =>
                    setBlocks((list) =>
                      list.map((item) =>
                        item.key === block.key ? { ...item, type: e.target.value as PageSection["type"] } : item,
                      ),
                    )
                  }
                >
                  <option value="split">Image + texte</option>
                  <option value="text">Texte seul</option>
                  <option value="cta">Bandeau CTA</option>
                </select>
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                  onClick={() => setBlocks((list) => list.filter((item) => item.key !== block.key))}
                >
                  Supprimer
                </button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs font-bold">
                Titre FR
                <input
                  className="field mt-1"
                  value={block.titleFr}
                  onChange={(e) =>
                    setBlocks((list) =>
                      list.map((item) => (item.key === block.key ? { ...item, titleFr: e.target.value } : item)),
                    )
                  }
                />
              </label>
              <label className="text-xs font-bold">
                Titre AR
                <input
                  className="field mt-1"
                  dir="rtl"
                  value={block.titleAr}
                  onChange={(e) =>
                    setBlocks((list) =>
                      list.map((item) => (item.key === block.key ? { ...item, titleAr: e.target.value } : item)),
                    )
                  }
                />
              </label>
              <label className="text-xs font-bold">
                Texte FR
                <textarea
                  className="field mt-1 min-h-24"
                  value={block.bodyFr}
                  onChange={(e) =>
                    setBlocks((list) =>
                      list.map((item) => (item.key === block.key ? { ...item, bodyFr: e.target.value } : item)),
                    )
                  }
                />
              </label>
              <label className="text-xs font-bold">
                Texte AR
                <textarea
                  className="field mt-1 min-h-24"
                  dir="rtl"
                  value={block.bodyAr}
                  onChange={(e) =>
                    setBlocks((list) =>
                      list.map((item) => (item.key === block.key ? { ...item, bodyAr: e.target.value } : item)),
                    )
                  }
                />
              </label>
              {block.type !== "text" ? (
                <label className="text-xs font-bold md:col-span-2">
                  Image (URL)
                  <input
                    className="field mt-1"
                    value={block.image}
                    onChange={(e) =>
                      setBlocks((list) =>
                        list.map((item) => (item.key === block.key ? { ...item, image: e.target.value } : item)),
                      )
                    }
                  />
                </label>
              ) : null}
            </div>
          </fieldset>
        ))}
      </div>
      <Submit />
    </form>
  );
}
