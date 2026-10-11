"use client";

import { bulkProductsAction } from "../catalog-actions";
import type { Category } from "@/db/schema";

export function BulkBar({ categories }: { categories: Category[] }) {
  return (
    <form action={bulkProductsAction} className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-sm">
      <span className="text-xs font-bold text-slate-500">التحديد:</span>
      <button name="op" value="delete" className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
        حذف
      </button>
      <button name="op" value="feature" className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
        إبراز
      </button>
      <button name="op" value="unfeature" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
        إلغاء الإبراز
      </button>
      <button name="op" value="stock" className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
        متوفر
      </button>
      <button name="op" value="unstock" className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold">
        غير متوفر
      </button>
      <select name="categorySlug" className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.nameFr}
          </option>
        ))}
      </select>
      <button name="op" value="category" className="rounded-lg bg-brand-950 px-3 py-1.5 text-xs font-bold text-white">
        تغيير التصنيف
      </button>
    </form>
  );
}
