import type { ReactNode } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';

export type LegalSection = { h: Record<Locale, string>; p: Record<Locale, string> };

export function LegalPage({
  locale,
  title,
  intro,
  sections,
  crumb,
}: {
  locale: Locale;
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  sections: LegalSection[];
  crumb: string;
}) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(ui.footer.legal, locale)}
        title={t(title, locale)}
        subtitle={t(intro, locale)}
        size="sm"
        crumbs={[{ label: crumb }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="space-y-9">
                {sections.map((section, i) => (
                  <Reveal key={i} delay={i * 40}>
                    <div>
                      <h2 className="text-[1.15rem] font-extrabold leading-snug text-brand-950">
                        {t(section.h, locale)}
                      </h2>
                      <p className="mt-3 text-[.93rem] leading-[1.95] text-ink-700">
                        {t(section.p, locale)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <Reveal>
                <div className="card p-6 lg:sticky lg:top-28">
                  <h2 className="text-[1rem] font-extrabold text-brand-950">
                    {t(ui.footer.contact, locale)}
                  </h2>
                  <ul className="mt-5 space-y-4 text-[.86rem] text-ink-700">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                      {t(site.address, locale)}
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                      <a href={site.phoneHref} dir="ltr" className="hover:text-accent-700">
                        {site.phoneDisplay}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                      <a href={site.emailHref} className="hover:text-accent-700">
                        {site.email}
                      </a>
                    </li>
                  </ul>

                  <nav className="mt-7 space-y-2 border-t border-slate-100 pt-5">
                    {[
                      { label: ui.footer.legal, href: 'mentions-legales' },
                      { label: ui.footer.privacy, href: 'confidentialite' },
                      { label: ui.footer.terms, href: 'conditions' },
                      { label: ui.footer.sitemap, href: 'plan-du-site' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={localeHref(locale, link.href)}
                        className="block text-[.85rem] font-semibold text-ink-500 transition hover:text-accent-700"
                      >
                        {t(link.label, locale)}
                      </Link>
                    ))}
                  </nav>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalFootnote({ locale }: { locale: Locale }) {
  return (
    <section className="bg-slate-50/70 py-10">
      <div className="container">
        <p className="text-center text-[.82rem] text-ink-500">
          {locale === 'ar'
            ? 'آخر تحديث لهذه الوثيقة: يناير 2026. للاستفسار، تواصل معنا عبر البريد الإلكتروني.'
            : 'Dernière mise à jour de ce document : janvier 2026. Pour toute question, contactez-nous par e-mail.'}
        </p>
      </div>
    </section>
  );
}

/** Small helper so pages can render a styled bullet list inside a section. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[.9rem] leading-[1.85] text-ink-700">
          <span className="mt-[.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}
