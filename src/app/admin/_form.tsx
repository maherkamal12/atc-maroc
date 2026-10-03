"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "./catalog-actions";

const initial: ActionState = { error: null };

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Enregistrement…" : label}
    </button>
  );
}

export function ActionForm({
  action,
  children,
  submitLabel = "Enregistrer",
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, initial);
  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Enregistré.
        </p>
      ) : null}
      {children}
      <Submit label={submitLabel} />
    </form>
  );
}
