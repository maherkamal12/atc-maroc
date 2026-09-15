'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';

export function FloatingActions({ locale }: { locale: Locale }) {
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    t(ui.common.whatsappMessage, locale),
  )}`;

  return (
    <div className="fixed bottom-4 end-4 z-[65] flex flex-col items-end gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t(ui.common.home, locale)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200
                    bg-white text-brand-950 shadow-card transition-all duration-300 hover:-translate-y-0.5
                    hover:border-brand-300 ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.4} />
      </button>

      {expanded && (
        <div className="flex flex-col items-end gap-2.5">
          <a
            href={site.phoneHref}
            className="flex items-center gap-3 rounded-full bg-white py-2.5 pe-5 ps-2.5 text-[.84rem] font-bold text-brand-950 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-950 text-white">
              <Phone className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <span dir="ltr">{site.phoneDisplay}</span>
          </a>
          <Link
            href={localeHref(locale, 'contact')}
            className="flex items-center gap-3 rounded-full bg-white py-2.5 pe-5 ps-2.5 text-[.84rem] font-bold text-brand-950 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-brand-950">
              <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            </span>
            {t(ui.common.freeQuote, locale)}
          </Link>
        </div>
      )}

      <div className="flex items-center gap-2">
        {!expanded && (
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#25D366]" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]" />
          </span>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={t(ui.common.contactUs, locale)}
          aria-expanded={expanded}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-950 shadow-card ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          <ChevronDown
            className={`h-4.5 w-4.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            strokeWidth={2.6}
          />
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(ui.common.whatsapp, locale)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_34px_-10px_rgba(37,211,102,.85)] transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2.3} />
        </a>
      </div>
    </div>
  );
}
