import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import type { Locale } from '@/lib/i18n';

/**
 * Inner-page hero: dark blueprint background, eyebrow, title, lead paragraph
 * and a breadcrumb trail. Keeps every sub-page visually consistent.
 */
export function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
  size = 'md',
}: {
  locale: Locale;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  size?: 'sm' | 'md';
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 end-[-6rem] h-[22rem] w-[22rem] rounded-full bg-accent-500/15 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-8rem] start-[-4rem] h-[18rem] w-[18rem] rounded-full bg-brand-500/20 blur-[80px]"
        aria-hidden="true"
      />

      <div
        className={`container relative ${size === 'sm' ? 'py-12 lg:py-16' : 'py-14 lg:py-20'}`}
      >
        <Breadcrumbs locale={locale} items={crumbs} tone="dark" />

        <div className="mt-7 max-w-3xl">
          {eyebrow && <span className="eyebrow-dark">{eyebrow}</span>}
          <h1 className="mt-5 text-balance text-[1.9rem] font-extrabold leading-[1.25] text-white sm:text-[2.4rem] lg:text-[3rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-pretty text-[1rem] leading-[1.9] text-white/65 lg:text-[1.05rem]">
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="mt-9">{children}</div>}
      </div>

      {/* bottom fade into the page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white/10"
        aria-hidden="true"
      />
    </section>
  );
}
