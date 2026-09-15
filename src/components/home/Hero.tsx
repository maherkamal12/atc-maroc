import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, Phone, Play, Star } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { services } from '@/content/services';

export function Hero({ locale }: { locale: Locale }) {
  const quickPoints = [
    { ar: 'دراسة فنية مجانية', fr: 'Étude technique offerte' },
    { ar: 'ضمان على الأشغال', fr: 'Garantie sur les travaux' },
    { ar: 'تدخل في كل المغرب', fr: 'Intervention partout au Maroc' },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {/* ------------------------------------------------------- background layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/main.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/92 via-brand-950/80 to-brand-950/95" />
        <div className="absolute inset-0 bg-gradient-to-e from-brand-950/85 via-brand-950/30 to-transparent" />
        <div className="bg-blueprint absolute inset-0 opacity-60" />
      </div>

      <div className="absolute -top-40 start-[-10rem] h-[26rem] w-[26rem] rounded-full bg-accent-500/15 blur-[110px]" aria-hidden="true" />

      <div className="container relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24 xl:py-28">
          {/* ---------------------------------------------------------- copy */}
          <div className="lg:col-span-7">
            <span className="eyebrow-dark animate-fade-up">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.6} />
              {t(ui.hero.badge, locale)}
            </span>

            <h1 className="mt-7 text-balance text-[2.1rem] font-black leading-[1.18] text-white sm:text-[2.7rem] lg:text-[3.4rem] xl:text-[3.75rem]">
              <span className="animate-fade-up block">{t(ui.hero.titleTop, locale)}</span>
              <span
                className="animate-fade-up mt-2 block bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent"
                style={{ animationDelay: '120ms' }}
              >
                {t(ui.hero.titleBottom, locale)}
              </span>
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-white/70 lg:text-[1.08rem]"
              style={{ animationDelay: '220ms' }}
            >
              {t(ui.hero.subtitle, locale)}
            </p>

            {/* service chips */}
            <ul
              className="animate-fade-up mt-8 flex flex-wrap gap-2"
              style={{ animationDelay: '300ms' }}
            >
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localeHref(locale, `services/${s.slug}`)}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/[.06] px-3.5 py-1.5 text-[.76rem] font-semibold text-white/75 backdrop-blur transition hover:border-accent-400/60 hover:bg-white/10 hover:text-white"
                  >
                    {t(s.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '380ms' }}
            >
              <Link href={localeHref(locale, 'contact')} className="btn-primary !px-7 !py-3.5">
                {t(ui.hero.ctaPrimary, locale)}
                <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
              </Link>
              <Link href={localeHref(locale, 'services')} className="btn-ghost-light !px-7 !py-3.5">
                <Play className="h-4 w-4" strokeWidth={2.6} />
                {t(ui.hero.ctaSecondary, locale)}
              </Link>
            </div>

            {/* quick points */}
            <ul
              className="animate-fade-up mt-9 flex flex-wrap gap-x-7 gap-y-3"
              style={{ animationDelay: '460ms' }}
            >
              {quickPoints.map((p) => (
                <li
                  key={t(p, locale)}
                  className="inline-flex items-center gap-2 text-[.82rem] font-semibold text-white/70"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent-400" strokeWidth={2.4} />
                  {t(p, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------ stat panel */}
          <div className="lg:col-span-5">
            <div className="animate-fade-up rounded-4xl border border-white/12 bg-white/[.07] p-6 backdrop-blur-xl sm:p-8" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between">
                <p className="text-[.78rem] font-extrabold uppercase tracking-[.16em] text-accent-400">
                  {t(ui.stats.eyebrow, locale)}
                </p>
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[.7rem] font-bold text-white">
                  <Star className="h-3 w-3 fill-accent-400 text-accent-400" />
                  4.9
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
                {site.stats.map((stat) => (
                  <div key={t(stat.label, locale)}>
                    <p className="text-[1.9rem] font-black leading-none text-white" dir="ltr">
                      {stat.value}
                      <span className="text-accent-400">{stat.suffix}</span>
                    </p>
                    <p className="mt-2 text-[.78rem] font-semibold leading-snug text-white/55">
                      {t(stat.label, locale)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-3 border-t border-white/12 pt-6">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 rounded-2xl bg-white/[.06] p-3.5 transition hover:bg-white/[.11]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-brand-950">
                    <Phone className="h-4.5 w-4.5" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[.7rem] font-bold uppercase tracking-[.1em] text-white/45">
                      {t(ui.common.callUs, locale)}
                    </span>
                    <span className="block truncate text-[.95rem] font-extrabold text-white" dir="ltr">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>
                <p className="text-center text-[.74rem] text-white/45">
                  {t(ui.topbar.hours, locale)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
