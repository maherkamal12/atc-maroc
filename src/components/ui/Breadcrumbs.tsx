import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  locale,
  items,
  tone = 'dark',
}: {
  locale: Locale;
  items: Crumb[];
  tone?: 'light' | 'dark';
}) {
  const Chevron = locale === 'ar' ? ChevronLeft : ChevronRight;
  const muted = tone === 'dark' ? 'text-white/55' : 'text-ink-500';
  const strong = tone === 'dark' ? 'text-white' : 'text-brand-950';

  return (
    <nav aria-label="Breadcrumb" className={`text-[.78rem] ${muted}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href={localeHref(locale)}
            className="inline-flex items-center gap-1.5 transition hover:text-accent-400"
          >
            <Home className="h-3.5 w-3.5" strokeWidth={2.2} />
            {t(ui.common.home, locale)}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
            <Chevron className="h-3.5 w-3.5 opacity-60" strokeWidth={2.4} />
            {item.href ? (
              <Link href={item.href} className="transition hover:text-accent-400">
                {item.label}
              </Link>
            ) : (
              <span className={`font-semibold ${strong}`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
