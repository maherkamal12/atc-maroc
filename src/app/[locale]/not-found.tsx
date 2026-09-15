import Link from 'next/link';
import { ArrowRight, Compass, Home, Phone } from 'lucide-react';
import { defaultLocale, localeHref, locales, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';

/**
 * `not-found.tsx` inside a dynamic segment cannot read the locale param, so we
 * keep the 404 self-contained and bilingual-friendly by defaulting to Arabic
 * (the site's primary language) with a French fallback link.
 */
export default function NotFound() {
  const locale = defaultLocale;

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 end-[-6rem] h-96 w-96 rounded-full bg-accent-500/15 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container relative flex min-h-[78vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-500 text-brand-950">
          <Compass className="h-10 w-10" strokeWidth={1.8} />
        </span>

        <p className="mt-8 text-[4.5rem] font-black leading-none text-white/10 sm:text-[6rem]">
          404
        </p>
        <h1 className="mt-2 text-[1.75rem] font-extrabold text-white sm:text-[2.25rem]">
          {t(ui.notFound.title, locale)}
        </h1>
        <p className="mt-4 max-w-xl text-[.95rem] leading-[1.9] text-white/60">
          {t(ui.notFound.body, locale)}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={localeHref(locale)} className="btn-primary">
            <Home className="h-4 w-4" strokeWidth={2.4} />
            {t(ui.notFound.cta, locale)}
          </Link>
          <Link href={localeHref(locale, 'services')} className="btn-ghost-light">
            {t(ui.common.seeAllServices, locale)}
            <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
          </Link>
          <a href={site.phoneHref} className="btn-ghost-light" dir="ltr">
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            {site.phoneDisplay}
          </a>
        </div>

        {/* quick service access */}
        <div className="mt-14 w-full max-w-3xl border-t border-white/10 pt-10">
          <p className="text-[.76rem] font-extrabold uppercase tracking-[.16em] text-accent-400">
            {t(ui.common.ourServices, locale)}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localeHref(locale, `services/${service.slug}`)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[.78rem] font-bold text-white/80 backdrop-blur transition hover:border-accent-400/60 hover:text-white"
                >
                  <Icon name={service.icon} className="h-3.5 w-3.5 text-accent-400" />
                  {t(service.title, locale)}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={`/${l}`}
                  hrefLang={l}
                  className="text-[.82rem] font-bold text-white/60 transition hover:text-accent-400"
                >
                  {l === 'ar' ? 'العربية' : 'Français'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
