import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { services } from '@/content/services';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function ServicesGrid({ locale }: { locale: Locale }) {
  return (
    <section className="section bg-slate-50/70" id="services">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={t(ui.services.eyebrow, locale)}
            title={t(ui.services.title, locale)}
            subtitle={t(ui.services.subtitle, locale)}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70} className="h-full">
              <ServiceCard service={service} locale={locale} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Link href={localeHref(locale, 'services')} className="btn-dark !px-8 !py-3.5">
              {t(ui.common.seeAllServices, locale)}
              <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
