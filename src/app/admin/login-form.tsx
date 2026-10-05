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
      className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-l from-accent-600 to-accent-500 text-sm font-extrabold text-white shadow-[0_16px_32px_-12px_rgba(249,115,22,0.65)] transition hover:brightness-110 disabled:opacity-60"
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
    <div
      dir="rtl"
      lang="ar"
      className="relative min-h-screen overflow-hidden bg-brand-950 text-white lg:grid lg:grid-cols-[1.05fr_minmax(28rem,32rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(47,131,239,0.35), transparent 50%), radial-gradient(ellipse at 90% 90%, rgba(249,115,22,0.22), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <section className="relative z-10 hidden flex-col justify-between p-12 lg:flex xl:p-16">
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-sm font-black text-brand-950 shadow-lg">
              ATC
            </span>
            <div>
              <p className="text-sm font-extrabold tracking-wide">أطلس تك كونسيبت</p>
              <p className="text-[11px] font-semibold text-white/55">Atlas Tech Concept — Maroc</p>
            </div>
          </div>
          <h1 className="mt-16 max-w-md text-4xl font-black leading-[1.25] tracking-tight">
            منصة إدارة المحتوى
            <span className="mt-2 block text-accent-400">للطاقة الشمسية والتجهيزات.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            الكتالوج، الطلبات، الرسائل، الصفحات والوسائط — من مكان واحد، بالعربية، دون أسعار على الموقع.
          </p>
          <ul className="mt-10 grid max-w-md gap-3 text-sm">
            {[
              ["كتالوج ثنائي اللغة", "منتجات وخدمات وتصنيفات"],
              ["عروض الأسعار", "طلبات الزبائن دون مبالغ"],
              ["محتوى الموقع", "صفحات، قائمة، شعار ووسائط"],
            ].map(([title, hint]) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/20 text-[11px] font-black text-accent-400">
                  ✓
                </span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="text-xs text-white/50">{hint}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[11px] font-semibold text-white/40">جلسة آمنة · ٨ ساعات · وصول مقيّد للفريق</p>
      </section>

      <section className="relative z-10 flex min-h-screen items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-xs font-black text-brand-950">
              ATC
            </span>
            <div>
              <p className="text-sm font-extrabold">أطلس تك كونسيبت</p>
              <p className="text-[11px] text-white/55">لوحة الإدارة</p>
            </div>
          </div>

          <form
            action={formAction}
            className="rounded-[1.75rem] border border-white/10 bg-white p-7 text-brand-950 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:p-9"
          >
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-accent-600">ADMIN</p>
            <h2 className="mt-1 text-2xl font-black text-brand-950">تسجيل الدخول</h2>
            <p className="mt-1.5 text-sm text-slate-500">أدخلوا بيانات الحساب للمتابعة إلى المكتب الخلفي.</p>

            <label className="mt-7 mb-1.5 block text-xs font-extrabold text-brand-950" htmlFor="username">
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

            <label className="mt-4 mb-1.5 block text-xs font-extrabold text-brand-950" htmlFor="password">
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

            <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
              {showDefaultHint
                ? "بيئة التطوير: المستخدم admin · كلمة المرور atc2026"
                : "الوصول محصور في فريق أطلس تك كونسيبت."}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
