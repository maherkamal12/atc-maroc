"use client";

import { deleteOrderAction } from "../catalog-actions";

export function DeleteOrderButton({
  id,
  reference,
  compact,
}: {
  id: number;
  reference?: string;
  compact?: boolean;
}) {
  return (
    <form
      action={deleteOrderAction}
      onSubmit={(event) => {
        const label = reference ? `الطلب ${reference}` : "هذا الطلب";
        if (!window.confirm(`حذف ${label} نهائياً؟ لا يمكن التراجع.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          compact
            ? "rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700"
            : "rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700"
        }
      >
        حذف
      </button>
    </form>
  );
}
