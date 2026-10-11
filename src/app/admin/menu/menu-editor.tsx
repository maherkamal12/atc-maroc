"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveNavAction, type ActionState } from "../catalog-actions";
import type { MenuRow } from "@/lib/cms";

const initial: ActionState = { error: null };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "جاري الحفظ…" : "حفظ القائمة والشعار"}
    </button>
  );
}

type Node = {
  key: string;
  href: string;
  labelAr: string;
  labelFr: string;
  visible: boolean;
  children: Node[];
};

function uid() {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function emptyNode(): Node {
  return { key: uid(), href: "", labelAr: "", labelFr: "", visible: true, children: [] };
}

function rowsToTree(rows: MenuRow[]): Node[] {
  const roots = rows.filter((row) => !row.parentHref);
  const children = rows.filter((row) => row.parentHref);
  return roots.map((row) => ({
    key: uid(),
    href: row.href,
    labelAr: row.labelAr,
    labelFr: row.labelFr,
    visible: row.visible,
    children: children
      .filter((child) => child.parentHref === row.href)
      .map((child) => ({
        key: uid(),
        href: child.href,
        labelAr: child.labelAr,
        labelFr: child.labelFr,
        visible: child.visible,
        children: [],
      })),
  }));
}

function moveIn<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

function Fields({
  node,
  onChange,
  placeholderHref,
}: {
  node: Node;
  onChange: (patch: Partial<Node>) => void;
  placeholderHref: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <label className="block text-xs font-bold">
        الرابط
        <input
          className="field mt-1"
          value={node.href}
          placeholder={placeholderHref}
          onChange={(e) => onChange({ href: e.target.value })}
        />
      </label>
      <label className="block text-xs font-bold">
        التسمية بالفرنسية
        <input
          className="field mt-1"
          value={node.labelFr}
          placeholder="الرئيسية"
          onChange={(e) => onChange({ labelFr: e.target.value })}
        />
      </label>
      <label className="block text-xs font-bold">
        التسمية بالعربية
        <input
          className="field mt-1"
          dir="rtl"
          value={node.labelAr}
          placeholder="الرئيسية"
          onChange={(e) => onChange({ labelAr: e.target.value })}
        />
      </label>
      <label className="block text-xs font-bold">
        ظاهر
        <select
          className="field mt-1"
          value={node.visible ? "1" : "0"}
          onChange={(e) => onChange({ visible: e.target.value === "1" })}
        >
          <option value="1">نعم</option>
          <option value="0">لا</option>
        </select>
      </label>
    </div>
  );
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
  const [tree, setTree] = useState<Node[]>(() => rowsToTree(rows));

  const flat = useMemo(() => {
    const list: { href: string; labelAr: string; labelFr: string; parentHref: string; sort: number; visible: boolean }[] =
      [];
    tree.forEach((root, i) => {
      list.push({
        href: root.href,
        labelAr: root.labelAr,
        labelFr: root.labelFr,
        parentHref: "",
        sort: i,
        visible: root.visible,
      });
      root.children.forEach((child, j) => {
        list.push({
          href: child.href,
          labelAr: child.labelAr,
          labelFr: child.labelFr,
          parentHref: root.href,
          sort: i * 100 + j + 1,
          visible: child.visible,
        });
      });
    });
    return list;
  }, [tree]);

  function patchRoot(index: number, patch: Partial<Node>) {
    setTree((current) => current.map((node, i) => (i === index ? { ...node, ...patch } : node)));
  }

  function patchChild(rootIndex: number, childIndex: number, patch: Partial<Node>) {
    setTree((current) =>
      current.map((node, i) =>
        i === rootIndex
          ? {
              ...node,
              children: node.children.map((child, j) => (j === childIndex ? { ...child, ...patch } : child)),
            }
          : node,
      ),
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {flat.map((row) => (
        <span key={`${row.parentHref}-${row.href}-${row.sort}`} className="hidden">
          <input type="hidden" name="href" value={row.href} />
          <input type="hidden" name="labelAr" value={row.labelAr} />
          <input type="hidden" name="labelFr" value={row.labelFr} />
          <input type="hidden" name="parentHref" value={row.parentHref} />
          <input type="hidden" name="sort" value={row.sort} />
          <input type="hidden" name="visible" value={row.visible ? "1" : "0"} />
        </span>
      ))}

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          تم حفظ القائمة. تظهر التغييرات على /ar و /fr.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-bold text-brand-950">رابط صورة الشعار</span>
          <input name="logoUrl" defaultValue={logoUrl} className="field" placeholder="https://…" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-brand-950">الحروف المختصرة</span>
          <input name="logoText" defaultValue={logoText || "ATC"} className="field" />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-extrabold text-brand-950">القائمة الرئيسية</p>
          <p className="text-xs text-slate-500">الرئيسي = رابط في الشريط. الفرعي = قائمة منسدلة.</p>
        </div>
        <button type="button" className="btn btn-primary !py-2 !text-xs" onClick={() => setTree((t) => [...t, emptyNode()])}>
          + إضافة عنصر رئيسي
        </button>
      </div>

      {tree.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          لا عناصر رئيسية. اضغطوا «إضافة عنصر رئيسي».
        </p>
      ) : null}

      <ol className="space-y-4">
        {tree.map((root, rootIndex) => (
          <li key={root.key} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-brand-950 px-4 py-3 text-white">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide">
                  رئيسي {rootIndex + 1}
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold"
                    onClick={() => setTree((t) => moveIn(t, rootIndex, -1))}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold"
                    onClick={() => setTree((t) => moveIn(t, rootIndex, 1))}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-accent-500 px-2 py-1 text-xs font-bold text-brand-950"
                    onClick={() =>
                      patchRoot(rootIndex, { children: [...root.children, emptyNode()] })
                    }
                  >
                    + عنصر فرعي
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-red-500/90 px-2 py-1 text-xs font-bold"
                    onClick={() => setTree((t) => t.filter((_, i) => i !== rootIndex))}
                  >
                    حذف الرئيسي
                  </button>
                </div>
            </div>
            <div className="p-4">
              <Fields node={root} placeholderHref="/about" onChange={(patch) => patchRoot(rootIndex, patch)} />
            </div>

            <div className="space-y-3 bg-slate-50 p-4">
              {root.children.length === 0 ? (
                <p className="text-xs text-slate-500">لا عناصر فرعية. استخدموا «+ عنصر فرعي» للقائمة المنسدلة.</p>
              ) : null}
              <ol className="space-y-3">
                {root.children.map((child, childIndex) => (
                  <li
                    key={child.key}
                    className="relative rounded-xl border border-slate-200 bg-white p-3 ps-8"
                  >
                    <span className="absolute start-3 top-3 bottom-3 w-0.5 rounded bg-brand-200" aria-hidden />
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand-700">
                        فرعي {rootIndex + 1}.{childIndex + 1}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold"
                          onClick={() =>
                            patchRoot(rootIndex, { children: moveIn(root.children, childIndex, -1) })
                          }
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold"
                          onClick={() =>
                            patchRoot(rootIndex, { children: moveIn(root.children, childIndex, 1) })
                          }
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                          onClick={() =>
                            patchRoot(rootIndex, {
                              children: root.children.filter((_, i) => i !== childIndex),
                            })
                          }
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                    <Fields
                      node={child}
                      placeholderHref="/services/electricite"
                      onChange={(patch) => patchChild(rootIndex, childIndex, patch)}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline" onClick={() => setTree((t) => [...t, emptyNode()])}>
          + إضافة عنصر رئيسي
        </button>
        <Submit />
      </div>
    </form>
  );
}
