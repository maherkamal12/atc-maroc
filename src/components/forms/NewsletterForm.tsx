'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';

export function NewsletterForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState('error');
      return;
    }
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error('request failed');
      setState('done');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="flex items-center gap-3 rounded-2xl bg-emerald-500/15 px-5 py-4 text-[.9rem] font-bold text-emerald-300">
        <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2.2} />
        {t(ui.footer.subscribed, locale)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          {t(ui.footer.emailPlaceholder, locale)}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t(ui.footer.emailPlaceholder, locale)}
          className="w-full rounded-full border border-white/15 bg-white/[.06] px-5 py-3 text-[.88rem] text-white
                     placeholder:text-white/40 focus:border-accent-500 focus:bg-white/10 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary shrink-0 disabled:opacity-60"
        >
          {state === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
          ) : (
            <Send className="rtl-flip h-4 w-4" strokeWidth={2.4} />
          )}
          {t(ui.footer.subscribe, locale)}
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-[.78rem] text-rose-300">{t(ui.contact.errEmail, locale)}</p>
      )}
    </form>
  );
}
