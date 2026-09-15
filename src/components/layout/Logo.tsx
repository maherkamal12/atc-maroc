import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { site } from '@/content/site';
import { ui } from '@/content/ui';

export function LogoMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="ATC">
      <defs>
        <linearGradient id="atcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d2b4d" />
          <stop offset="100%" stopColor="#1a4c84" />
        </linearGradient>
        <linearGradient id="atcBolt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f5a623" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="17" fill="url(#atcGrad)" />
      {/* stylised A — a roof / structural truss */}
      <path d="M32 13 L47 41 H38.5 L32 28.5 L25.5 41 H17 Z" fill="url(#atcBolt)" />
      <path d="M23 45h18v4.6H23z" fill="#ffffff" opacity="0.92" />
    </svg>
  );
}

export function Logo({
  locale,
  variant = 'dark',
  compact = false,
}: {
  locale: Locale;
  variant?: 'dark' | 'light';
  compact?: boolean;
}) {
  return (
    <Link
      href={localeHref(locale)}
      className="group flex items-center gap-3"
      aria-label={site.latinName}
    >
      <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[.62rem] font-extrabold uppercase tracking-[.24em] text-accent-600">
            {site.initials}
          </span>
          <span
            className={`mt-1.5 text-[1rem] font-black leading-none ${
              locale === 'ar' ? 'tracking-normal' : 'tracking-[.04em]'
            } ${variant === 'light' ? 'text-white' : 'text-brand-950'}`}
          >
            {t(ui.brandName, locale)}
          </span>
          <span
            className={`mt-1.5 text-[.6rem] font-semibold uppercase tracking-[.18em] ${
              variant === 'light' ? 'text-white/55' : 'text-ink-500'
            }`}
          >
            {site.latinName}
          </span>
        </span>
      )}
    </Link>
  );
}
