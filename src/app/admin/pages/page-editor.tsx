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
      {pending ? "جاري الحفظ…" : "حفظ الصفحة"}
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
          تم حفظ الصفحة. أضيفوها للقائمة من «القائمة والشعار» (الرابط <code>/p/المعرّف</code>).
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-xs font-bold">
          العنوان بالفرنسية
          <input name="titleFr" required defaultValue={titleFr} className="field mt-1" />
        </label>
        <label className="block text-xs font-bold">
          العنوان بالعربية
          <input name="titleAr" required defaultValue={titleAr} className="field mt-1" dir="rtl" />
        </label>
        <label className="block text-xs font-bold">
          المعرّف
          <input name="slug" defaultValue={slug} className="field mt-1" placeholder="our-team" />
          <span className="mt-1 block font-normal text-slate-400">الرابط: /ar/p/المعرّف و /fr/p/المعرّف</span>
        </label>
        <label className="block text-xs font-bold">
          صورة الرأس (رابط)
          <input name="heroImage" defaultValue={heroImage} className="field mt-1" />
        </label>
        <label className="block text-xs font-bold md:col-span-2">
          العنوان الفرعي بالفرنسية
          <textarea name="subtitleFr" defaultValue={subtitleFr} className="field mt-1 min-h-20" />
        </label>
        <label className="block text-xs font-bold md:col-span-2">
          العنوان الفرعي بالعربية
          <textarea name="subtitleAr" defaultValue={subtitleAr} className="field mt-1 min-h-20" dir="rtl" />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="published" defaultChecked={published ?? true} /> منشورة
        </label>
        <label className="block text-xs font-bold">
          الترتيب
          <input name="sort" type="number" defaultValue={sort ?? 0} className="field mt-1" />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold">الأقسام (نفس تصميم صفحة التصميم / من نحن)</h2>
        <button
          type="button"
          className="btn btn-outline !py-2 !text-xs"
          onClick={() => setBlocks((b) => [...b, emptySection()])}
        >
          + إضافة قسم
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <fieldset key={block.key} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-extrabold text-slate-400">القسم {index + 1}</span>
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
                  <option value="split">صورة ونص</option>
                  <option value="text">نص فقط</option>
                  <option value="cta">شريط دعوة</option>
                </select>
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                  onClick={() => setBlocks((list) => list.filter((item) => item.key !== block.key))}
                >
                  حذف
                </button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs font-bold">
                العنوان بالفرنسية
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
                العنوان بالعربية
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
                النص بالفرنسية
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
                النص بالعربية
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
                  رابط الصورة
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
