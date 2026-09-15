'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';

const STORAGE_KEY = 'atc-cookie-consent';

export function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const id = window.setTimeout(() => setVisible(true), 1200);
        return () => window.clearTimeout(id);
      }
    } catch {
      /* storage blocked — banner stays hidden */
    }
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t(ui.cookies.title, locale)}
      className="fixed inset-x-3 bottom-3 z-[70] animate-fade-up sm:inset-x-auto sm:start-4 sm:bottom-4 sm:max-w-[430px]"
    >
      <div className="rounded-3xl border border-slate-200 bg-white/97 p-5 shadow-lift backdrop-blur-lg">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
            <Cookie className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <h2 className="text-[.92rem] font-extrabold text-brand-950">
              {t(ui.cookies.title, locale)}
            </h2>
            <p className="mt-2 text-[.8rem] leading-relaxed text-ink-500">
              {t(ui.cookies.body, locale)}{' '}
              <Link
                href={localeHref(locale, 'confidentialite')}
                className="font-bold text-accent-700 underline underline-offset-2"
              >
                {t(ui.cookies.more, locale)}
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={() => decide('declined')}
            aria-label={t(ui.common.close, locale)}
            className="ms-auto shrink-0 text-ink-500 transition hover:text-brand-950"
          >
            <X className="h-4 w-4" strokeWidth={2.6} />
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="btn-primary flex-1 !py-2.5 !text-[.82rem]"
          >
            {t(ui.cookies.accept, locale)}
          </button>
          <button
            type="button"
            onClick={() => decide('declined')}
            className="btn-outline flex-1 !py-2.5 !text-[.82rem]"
          >
            {t(ui.cookies.decline, locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
