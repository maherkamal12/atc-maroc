import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';

export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -bottom-32 start-1/4 h-96 w-96 rounded-full bg-accent-500/15 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container relative py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow-dark">{t(ui.cta.eyebrow, locale)}</span>
              <h2 className="mt-6 text-balance text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.25rem] lg:text-[2.6rem]">
                {t(ui.cta.title, locale)}
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.9] text-white/65">
                {t(ui.cta.body, locale)}
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {[ui.cta.responseTime, ui.cta.noCommitment, ui.why.features[4]].map((f, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 text-[.84rem] font-semibold text-white/70"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent-400" strokeWidth={2.4} />
                    {t(f, locale)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-4xl border border-white/12 bg-white/[.06] p-7 backdrop-blur-xl">
                <div className="space-y-4">
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-4 rounded-2xl bg-white/[.06] p-4 transition hover:bg-white/[.12]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-brand-950">
                      <Phone className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[.7rem] font-bold uppercase tracking-[.1em] text-white/45">
                        {t(ui.cta.callNow, locale)}
                      </span>
                      <span className="block truncate text-[1rem] font-extrabold text-white" dir="ltr">
                        {site.phoneDisplay}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-4 rounded-2xl bg-white/[.06] p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                      <MapPin className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[.7rem] font-bold uppercase tracking-[.1em] text-white/45">
                        {t(ui.cta.visitOffice, locale)}
                      </span>
                      <span className="mt-0.5 block text-[.84rem] leading-snug text-white/80">
                        {t(site.address, locale)}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-white/[.06] p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                      <Clock className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <span className="min-w-0 text-[.84rem] leading-snug text-white/80">
                      {site.hours.map((h) => (
                        <span key={t(h.days, locale)} className="block">
                          {t(h.days, locale)}: <span dir="ltr">{t(h.time, locale)}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href={localeHref(locale, 'contact')} className="btn-primary flex-1">
                    {t(ui.common.freeQuote, locale)}
                  </Link>
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                      t(ui.common.whatsappMessage, locale),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1"
                  >
                    {t(ui.common.whatsapp, locale)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
