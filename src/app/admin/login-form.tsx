"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-l from-accent-600 to-accent-500 text-sm font-extrabold text-white shadow-[0_16px_32px_-12px_rgba(249,115,22,0.65)] transition hover:brightness-110 disabled:opacity-60"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          جاري التحقق…
        </span>
      ) : (
        "دخول لوحة الإدارة"
      )}
    </button>
  );
}

export function LoginForm({ showDefaultHint }: { showDefaultHint: boolean }) {
  const [state, formAction] = useActionState(login, initialState);
  const [visible, setVisible] = useState(false);

  return (
    <div dir="rtl" lang="ar" className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-950 px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(47,131,239,0.28), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(249,115,22,0.18), transparent 45%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[26rem]">
        <div className="mb-7 flex flex-col items-center text-center text-white">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-sm font-black text-brand-950 shadow-lg">
            ATC
          </span>
          <p className="mt-4 text-base font-extrabold">أطلس تك كونسيبت</p>
          <p className="mt-1 text-xs font-semibold text-white/55">Atlas Tech Concept — Maroc</p>
        </div>

        <form
          action={formAction}
          className="rounded-[1.75rem] border border-white/10 bg-white p-8 text-brand-950 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
        >
          <h1 className="text-center text-2xl font-black text-brand-950">تسجيل الدخول</h1>

          <label className="mt-7 mb-1.5 block text-xs font-extrabold" htmlFor="username">
            اسم المستخدم
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none ring-accent-500/30 transition focus:border-accent-500 focus:bg-white focus:ring-4"
            placeholder="admin"
            autoComplete="username"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            required
          />

          <label className="mt-4 mb-1.5 block text-xs font-extrabold" htmlFor="password">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={visible ? "text" : "password"}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pe-16 text-sm font-semibold outline-none ring-accent-500/30 transition focus:border-accent-500 focus:bg-white focus:ring-4"
              placeholder="••••••••"
              autoComplete="current-password"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 px-4 text-xs font-extrabold text-slate-500 hover:text-brand-900"
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? "إخفاء" : "إظهار"}
            </button>
          </div>

          {state.error ? (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
            >
              {state.error}
            </p>
          ) : null}

          <div className="mt-6">
            <SubmitButton />
          </div>

          {showDefaultHint ? (
            <p className="mt-5 text-center text-[11px] text-slate-400">بيئة التطوير: admin · atc2026</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
