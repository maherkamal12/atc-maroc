import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import type { Service } from '@/content/services';
import { Icon, tones } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';

export function ServiceCard({
  service,
  locale,
  index = 0,
}: {
  service: Service;
  locale: Locale;
  index?: number;
}) {
  const tone = tones[service.tone];
  const href = localeHref(locale, `services/${service.slug}`);

  return (
    <article className="group card card-hover flex h-full flex-col overflow-hidden">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <SmartImage
          src={service.image}
          alt={t(service.title, locale)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <span
          className={`absolute inset-0 bg-gradient-to-t ${tone.grad} opacity-25 mix-blend-multiply`}
          aria-hidden="true"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />

        <span
          className={`absolute start-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-soft backdrop-blur ${tone.text}`}
        >
          <Icon name={service.icon} className="h-6 w-6" />
        </span>

        <span className="absolute end-4 top-4 rounded-full bg-brand-950/70 px-2.5 py-1 text-[.68rem] font-bold text-white/90 backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.12rem] font-extrabold leading-snug text-brand-950">
          <Link href={href} className="transition hover:text-brand-700">
            {t(service.title, locale)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[.9rem] leading-[1.85] text-ink-500">
          {t(service.short, locale)}
        </p>
        <Link
          href={href}
          className={`mt-5 inline-flex items-center gap-2 text-[.85rem] font-extrabold ${tone.text} transition-all duration-300 hover:gap-3`}
        >
          {t(ui.common.viewDetails, locale)}
          <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
        </Link>
      </div>
    </article>
  );
}
