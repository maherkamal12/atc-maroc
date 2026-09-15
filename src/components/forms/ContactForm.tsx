'use client';

import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Send,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';

type Errors = Partial<
  Record<'name' | 'email' | 'phone' | 'subject' | 'message' | 'consent', string>
>;

const fieldBase =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-[.9rem] text-brand-950 outline-none transition ' +
  'placeholder:text-slate-400 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15';

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const c = ui.contact;
  const subjectOptions = c.subjects;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2) next.name = t(c.errName, locale);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = t(c.errEmail, locale);
    if (phone && !/^[+()\d\s.-]{8,20}$/.test(phone)) next.phone = t(c.errPhone, locale);
    if (!subject) next.subject = t(c.errSubject, locale);
    if (message.length < 20) next.message = t(c.errMessage, locale);
    if (!data.get('consent')) next.consent = t(c.errConsent, locale);
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first invalid control for keyboard/screen-reader users.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          city: data.get('city'),
          subject: data.get('subject'),
          message: data.get('message'),
          consent: data.get('consent') === 'on',
          locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      form.reset();
    } catch {
      setState('error');
    }
  }

  /* ------------------------------------------------------------- success */
  if (state === 'done') {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </span>
        <h3 className="mt-6 text-[1.25rem] font-extrabold text-brand-950">
          {t(c.successTitle, locale)}
        </h3>
        <p className="mt-3 max-w-md text-[.92rem] leading-[1.9] text-ink-500">
          {t(c.successBody, locale)}
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="btn-outline mt-7"
        >
          <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
          {t(c.sendAnother, locale)}
        </button>
      </div>
    );
  }

  /* ----------------------------------------------------------------- form */
  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 text-[1.2rem] font-extrabold text-brand-950">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
          <Send className="h-5 w-5" strokeWidth={2} />
        </span>
        {t(c.formTitle, locale)}
      </h2>
      <p className="mt-3 text-[.88rem] leading-[1.85] text-ink-500">{t(c.formSubtitle, locale)}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* name */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.name, locale)} <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t(c.namePlaceholder, locale)}
            aria-invalid={Boolean(errors.name)}
            className={`${fieldBase} ${errors.name ? 'border-rose-300' : 'border-slate-200'}`}
          />
          {errors.name && <FieldError message={errors.name} />}
        </div>

        {/* email */}
        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.email, locale)} <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t(c.emailPlaceholder, locale)}
            aria-invalid={Boolean(errors.email)}
            className={`${fieldBase} ${errors.email ? 'border-rose-300' : 'border-slate-200'}`}
          />
          {errors.email && <FieldError message={errors.email} />}
        </div>

        {/* phone */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.phone, locale)}{' '}
            <span className="font-medium text-ink-500">({t(c.optional, locale)})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={t(c.phonePlaceholder, locale)}
            aria-invalid={Boolean(errors.phone)}
            className={`${fieldBase} ${errors.phone ? 'border-rose-300' : 'border-slate-200'}`}
          />
          {errors.phone && <FieldError message={errors.phone} />}
        </div>

        {/* city */}
        <div className="sm:col-span-1">
          <label htmlFor="city" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.city, locale)}{' '}
            <span className="font-medium text-ink-500">({t(c.optional, locale)})</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder={t(c.cityPlaceholder, locale)}
            className={`${fieldBase} border-slate-200`}
          />
        </div>

        {/* subject */}
        <div className="sm:col-span-2">
          <label htmlFor="subject" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.subject, locale)} <span className="text-rose-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue=""
            aria-invalid={Boolean(errors.subject)}
            className={`${fieldBase} ${errors.subject ? 'border-rose-300' : 'border-slate-200'}`}
          >
            <option value="" disabled>
              {t(c.subjectPlaceholder, locale)}
            </option>
            {subjectOptions.map((option, i) => (
              <option key={i} value={t(option, locale)}>
                {t(option, locale)}
              </option>
            ))}
          </select>
          {errors.subject && <FieldError message={errors.subject} />}
        </div>

        {/* message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-[.82rem] font-bold text-brand-950">
            {t(c.message, locale)} <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t(c.messagePlaceholder, locale)}
            aria-invalid={Boolean(errors.message)}
            className={`${fieldBase} resize-y ${errors.message ? 'border-rose-300' : 'border-slate-200'}`}
          />
          {errors.message && <FieldError message={errors.message} />}
        </div>

        {/* consent */}
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-accent-500 focus:ring-accent-500/30"
            />
            <span className="text-[.82rem] leading-relaxed text-ink-500">
              {t(c.consent, locale)}
            </span>
          </label>
          {errors.consent && <FieldError message={errors.consent} />}
        </div>
      </div>

      {state === 'error' && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-rose-50 p-4 text-rose-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.2} />
          <div className="text-[.84rem] leading-relaxed">
            <p className="font-bold">{t(c.errorTitle, locale)}</p>
            <p className="mt-1">{t(c.errorBody, locale)}</p>
          </div>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary !px-8 !py-3.5 disabled:opacity-60"
        >
          {state === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
          ) : (
            <Send className="rtl-flip h-4 w-4" strokeWidth={2.4} />
          )}
          {state === 'loading' ? t(c.sending, locale) : t(c.send, locale)}
        </button>
        <p className="text-[.74rem] leading-relaxed text-ink-500 sm:max-w-xs">
          {t(c.privacy, locale)}
        </p>
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-[.76rem] font-semibold text-rose-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
      {message}
    </p>
  );
}
