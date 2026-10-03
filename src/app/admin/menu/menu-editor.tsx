"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveNavAction, type ActionState } from "../catalog-actions";
import type { MenuRow } from "@/lib/cms";

const initial: ActionState = { error: null };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Enregistrement…" : "Enregistrer le menu et le logo"}
    </button>
  );
}

type Draft = {
  key: string;
  href: string;
  labelAr: string;
  labelFr: string;
  parentHref: string;
  sort: number;
  visible: boolean;
};

function toDraft(rows: MenuRow[]): Draft[] {
  return rows.map((row, index) => ({
    key: `${row.id || "n"}-${index}-${row.href}`,
    href: row.href,
    labelAr: row.labelAr,
    labelFr: row.labelFr,
    parentHref: row.parentHref,
    sort: row.sort,
    visible: row.visible,
  }));
}

export function MenuEditor({
  logoUrl,
  logoText,
  rows,
}: {
  logoUrl: string;
  logoText: string;
  rows: MenuRow[];
}) {
  const [state, formAction] = useActionState(saveNavAction, initial);
  const [items, setItems] = useState<Draft[]>(() => toDraft(rows));

  function addItem(parentHref = "") {
    setItems((current) => [
      ...current,
      {
        key: `new-${Date.now()}`,
        href: "",
        labelAr: "",
        labelFr: "",
        parentHref,
        sort: current.length,
        visible: true,
      },
    ]);
  }

  function removeItem(key: string) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function move(key: string, dir: -1 | 1) {
    setItems((current) => {
      const index = current.findIndex((item) => item.key === key);
      const next = index + dir;
      if (index < 0 || next < 0 || next >= current.length) return current;
      const copy = [...current];
      const [row] = copy.splice(index, 1);
      copy.splice(next, 0, row);
      return copy.map((item, i) => ({ ...item, sort: i }));
    });
  }

  function patch(key: string, field: keyof Draft, value: string | boolean | number) {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, [field]: value } : item)));
  }

  const topHrefs = items.filter((item) => !item.parentHref && item.href).map((item) => item.href);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Menu enregistré. Les changements apparaissent sur /ar et /fr.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-bold text-brand-950">Logo (URL image)</span>
          <input name="logoUrl" defaultValue={logoUrl} className="field" placeholder="https://…" />
          <span className="block text-[11px] text-slate-400">Vide = monogramme texte.</span>
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-brand-950">Monogramme</span>
          <input name="logoText" defaultValue={logoText || "ATC"} className="field" />
        </label>
      </div>
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="" className="h-16 w-auto object-contain" />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Liens du menu</p>
          <p className="text-xs text-slate-500">
            Ajoutez, supprimez ou réordonnez. Parent vide = entrée principale. Sous-menu : choisissez le lien parent.
          </p>
        </div>
        <button type="button" className="btn btn-primary !py-2 !text-xs" onClick={() => addItem()}>
          + Ajouter un lien
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Aucun lien. Cliquez sur « Ajouter un lien » puis enregistrez.
          </p>
        ) : null}
        {items.map((item, index) => (
          <fieldset key={item.key} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase text-slate-400">
                {item.parentHref ? "Sous-menu" : "Menu principal"} · #{index + 1}
              </span>
              <div className="flex flex-wrap gap-1">
                <button type="button" className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold" onClick={() => move(item.key, -1)}>
                  ↑
                </button>
                <button type="button" className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold" onClick={() => move(item.key, 1)}>
                  ↓
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold"
                  onClick={() => addItem(item.href || item.parentHref)}
                >
                  + sous-lien
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                  onClick={() => removeItem(item.key)}
                >
                  Supprimer
                </button>
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-6">
              <label className="block text-xs font-bold md:col-span-2">
                Lien
                <input
                  name="href"
                  value={item.href}
                  onChange={(e) => patch(item.key, "href", e.target.value)}
                  className="field mt-1"
                  placeholder="/about"
                />
              </label>
              <label className="block text-xs font-bold">
                FR
                <input
                  name="labelFr"
                  value={item.labelFr}
                  onChange={(e) => patch(item.key, "labelFr", e.target.value)}
                  className="field mt-1"
                  placeholder="À propos"
                />
              </label>
              <label className="block text-xs font-bold">
                AR
                <input
                  name="labelAr"
                  value={item.labelAr}
                  onChange={(e) => patch(item.key, "labelAr", e.target.value)}
                  className="field mt-1"
                  dir="rtl"
                  placeholder="من نحن"
                />
              </label>
              <label className="block text-xs font-bold">
                Parent
                <select
                  name="parentHref"
                  value={item.parentHref}
                  onChange={(e) => patch(item.key, "parentHref", e.target.value)}
                  className="field mt-1"
                >
                  <option value="">— principal —</option>
                  {topHrefs
                    .filter((href) => href !== item.href)
                    .map((href) => (
                      <option key={href} value={href}>
                        {href}
                      </option>
                    ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs font-bold">
                  Ordre
                  <input name="sort" type="number" value={item.sort} onChange={(e) => patch(item.key, "sort", Number(e.target.value))} className="field mt-1" />
                </label>
                <label className="block text-xs font-bold">
                  Visible
                  <select
                    name="visible"
                    value={item.visible ? "1" : "0"}
                    onChange={(e) => patch(item.key, "visible", e.target.value === "1")}
                    className="field mt-1"
                  >
                    <option value="1">Oui</option>
                    <option value="0">Non</option>
                  </select>
                </label>
              </div>
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline" onClick={() => addItem()}>
          + Ajouter un lien
        </button>
        <Submit />
      </div>
    </form>
  );
}
