import Link from 'next/link';
import { ArrowRight, Palette, Sofa, SunMedium } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { designGallery } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';

const icons = [Palette, Sofa, SunMedium];

export function DesignTeaser({ locale }: { locale: Locale }) {
  const items = [
    { title: ui.design.step1, body: ui.design.step1Body },
    { title: ui.design.step2, body: ui.design.step2Body },
    { title: ui.design.step3, body: ui.design.step3Body },
  ];

  return (
    <section className="section bg-slate-50/70">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* -------------------------------------------------- copy column */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow={t(ui.design.eyebrow, locale)}
                title={t(ui.design.title, locale)}
                subtitle={t(ui.design.subtitle, locale)}
                align="start"
              />
            </Reveal>

            <ul className="mt-9 space-y-5">
              {items.map((item, i) => {
                const IconCmp = icons[i];
                return (
                  <Reveal key={i} delay={i * 90} as="li">
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-soft ring-1 ring-slate-200">
                        <IconCmp className="h-5 w-5" strokeWidth={2.1} />
                      </span>
                      <div>
                        <h3 className="text-[1rem] font-extrabold text-brand-950">
                          {t(item.title, locale)}
                        </h3>
                        <p className="mt-2 text-[.88rem] leading-[1.85] text-ink-500">
                          {t(item.body, locale)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={280}>
              <Link
                href={localeHref(locale, 'design')}
                className="btn-dark mt-10 !px-7 !py-3.5"
              >
                {t(ui.design.gallery, locale)}
                <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
              </Link>
            </Reveal>
          </div>

          {/* ----------------------------------------------- gallery mosaic */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {designGallery.map((tile, i) => (
                <Reveal
                  key={tile.src}
                  delay={i * 70}
                  className={`${
                    i === 0 ? 'col-span-2 sm:col-span-2' : ''
                  } ${i === 4 ? 'col-span-2 sm:col-span-2' : ''}`}
                >
                  <figure className="group relative h-full overflow-hidden rounded-3xl bg-brand-950 shadow-soft">
                    <div className={`relative ${i === 0 || i === 4 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                      <SmartImage
                        src={tile.src}
                        alt={t(tile.title, locale)}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.08]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/15 to-transparent" />
                      <figcaption className="absolute inset-x-4 bottom-4">
                        <p className="text-[.86rem] font-extrabold leading-snug text-white">
                          {t(tile.title, locale)}
                        </p>
                        <p className="mt-1 text-[.72rem] font-semibold text-white/60">
                          {t(tile.place, locale)}
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
