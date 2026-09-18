"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site";

type Labels = {
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  privacyNote: string;
  thanksTitle: string;
  thanksText: string;
  errorMsg: string;
  requiredField: string;
  invalidEmail: string;
};

export function ContactForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = labels.requiredField;
    if (!email) nextErrors.email = labels.requiredField;
    else if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) nextErrors.email = labels.invalidEmail;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, locale }),
      });
      if (!response.ok) throw new Error("request failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-2xl text-white">
          ✓
        </div>
        <h3 className="text-xl font-extrabold text-emerald-900">{labels.thanksTitle}</h3>
        <p className="mt-2 text-sm text-emerald-800">{labels.thanksText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 md:p-8" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="name">
            {labels.yourName} *
          </label>
          <input id="name" name="name" className="field" required />
          {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="email">
            {labels.yourEmail} *
          </label>
          <input id="email" name="email" type="email" className="field" required />
          {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="phone">
            {labels.yourPhone}
          </label>
          <input id="phone" name="phone" className="field" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="subject">
            {labels.subject}
          </label>
          <input id="subject" name="subject" className="field" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="message">
            {labels.message}
          </label>
          <textarea id="message" name="message" rows={5} className="field resize-y" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "loading"} className="btn btn-primary disabled:opacity-70">
          {state === "loading" ? labels.sending : labels.send}
        </button>
        <p className="text-xs text-slate-500">{labels.privacyNote}</p>
      </div>
      {state === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{labels.errorMsg}</p>
      )}
    </form>
  );
}
