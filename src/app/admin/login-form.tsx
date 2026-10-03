"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary mt-5 w-full" disabled={pending}>
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export function LoginForm({ showDefaultHint }: { showDefaultHint: boolean }) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
      <div className="mb-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-950 text-sm font-black text-white">
          ATC
        </span>
        <h1 className="mt-4 text-lg font-extrabold text-brand-950">Espace administrateur</h1>
        <p className="mt-1 text-xs text-slate-500">ATLAS TECH CONCEPT — back office</p>
      </div>

      <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="password">
        Mot de passe
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="field"
        placeholder="••••••••"
        autoComplete="current-password"
        required
      />

      {state.error ? (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />

      <p className="mt-4 text-center text-[11px] text-slate-400">
        {showDefaultHint
          ? "Mot de passe par défaut : atc2026 (variable ADMIN_PASSWORD)"
          : "Accès réservé à l'équipe ATLAS TECH CONCEPT."}
      </p>
    </form>
  );
}
