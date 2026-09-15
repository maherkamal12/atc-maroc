import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { isLocale, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.nav.contact, locale),
    description: t(ui.contact.subtitle, locale),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ar: '/ar/contact', fr: '/fr/contact', 'x-default': '/ar/contact' },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const cards = [
    {
      icon: Phone,
      title: ui.contact.phoneTitle,
      body: ui.contact.phoneBody,
      value: site.phoneDisplay,
      href: site.phoneHref,
      ltr: true,
    },
    {
      icon: Mail,
      title: ui.contact.emailTitle,
      body: ui.contact.emailBody,
      value: site.email,
      href: site.emailHref,
      ltr: true,
    },
  ];

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.contact.eyebrow, typed)}
        title={t(ui.contact.title, typed)}
        subtitle={t(ui.contact.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.contact, typed) }]}
      />

      {/* --------------------------------------------------------- quick contact */}
      <section className="bg-white pt-14">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {cards.map((card, i) => {
              const IconCmp = card.icon;
              return (
                <Reveal key={i} delay={i * 80} className="h-full">
                  <a
                    href={card.href}
                    className="card card-hover flex h-full items-start gap-5 p-6"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-brand-950">
                      <IconCmp className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[1.05rem] font-extrabold text-brand-950">
                        {t(card.title, typed)}
                      </span>
                      <span className="mt-2 block text-[.86rem] leading-[1.8] text-ink-500">
                        {t(card.body, typed)}
                      </span>
                      <span
                        className="mt-3 block text-[1rem] font-black text-accent-700"
                        dir={card.ltr ? 'ltr' : undefined}
                      >
                        {card.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- form + details */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm locale={typed} />
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={80}>
                <div className="card p-6">
                  <h2 className="text-[1.05rem] font-extrabold text-brand-950">
                    {t(ui.footer.contact, typed)}
                  </h2>
                  <ul className="mt-6 space-y-5">
                    <li className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                        <MapPin className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[.78rem] font-extrabold uppercase tracking-wide text-ink-500">
                          {t(ui.contact.addressTitle, typed)}
                        </span>
                        <span className="mt-1.5 block text-[.88rem] leading-[1.8] text-ink-700">
                          {t(site.address, typed)}
                        </span>
                        <a
                          href={site.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-[.78rem] font-bold text-accent-700 underline underline-offset-2"
                        >
                          {t(ui.contact.mapTitle, typed)}
                        </a>
                      </span>
                    </li>

                    <li className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                        <Clock className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[.78rem] font-extrabold uppercase tracking-wide text-ink-500">
                          {t(ui.contact.hoursTitle, typed)}
                        </span>
                        <span className="mt-1.5 block text-[.88rem] leading-[1.9] text-ink-700">
                          {site.hours.map((h) => (
                            <span key={t(h.days, typed)} className="block">
                              {t(h.days, typed)}: <span dir="ltr">{t(h.time, typed)}</span>
                            </span>
                          ))}
                        </span>
                      </span>
                    </li>

                    <li className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                        <Instagram className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[.78rem] font-extrabold uppercase tracking-wide text-ink-500">
                          Instagram
                        </span>
                        <a
                          href={site.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 block text-[.88rem] font-bold text-ink-700 hover:text-accent-700"
                        >
                          {site.instagramHandle}
                        </a>
                      </span>
                    </li>
                  </ul>

                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                      t(ui.common.whatsappMessage, typed),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-7 w-full"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                    {t(ui.common.whatsapp, typed)}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-6 rounded-3xl bg-brand-950 p-6 text-white">
                  <p className="text-[.94rem] leading-[1.85] text-white/75">
                    {t(ui.contact.buildTogether, typed)}
                  </p>
                  <p className="mt-4 text-[.86rem] leading-[1.85] text-white/55">
                    {t(ui.contact.findUs, typed)}
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- map */}
      <section className="bg-slate-50/70 pb-16">
        <div className="container">
          <Reveal>
            <div className="overflow-hidden rounded-4xl border border-slate-200 shadow-card">
              <iframe
                title={t(ui.contact.mapTitle, typed)}
                src={`https://www.google.com/maps?q=${site.mapsQuery}&output=embed&hl=${
                  typed === 'ar' ? 'ar' : 'fr'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 lg:h-[440px]"
              />
            </div>
          </Reveal>
          <p className="mt-5 text-center text-[.82rem] text-ink-500">
            {t(ui.contact.mapNote, typed)}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------- faq */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.services.faq, typed)}
              title={t(ui.services.faq, typed)}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mx-auto mt-12 max-w-3xl">
              <Accordion
                items={[
                  {
                    q: { ar: 'كم يستغرق الرد على طلبي؟', fr: 'En combien de temps répondez-vous ?' },
                    a: {
                      ar: 'نرد على كل الطلبات في غضون 24 ساعة، وعادة في نفس اليوم خلال ساعات العمل.',
                      fr: 'Nous répondons à toutes les demandes dans les 24 heures, et généralement le jour même pendant les heures ouvrables.',
                    },
                  },
                  {
                    q: { ar: 'هل الزيارة الميدانية مجانية؟', fr: 'La visite sur site est-elle gratuite ?' },
                    a: {
                      ar: 'نعم، الزيارة التقنية والدراسة الأولية مجانية في طنجة وضواحيها. للمناطق البعيدة تُحدَّد شروط التنقل مسبقًا بشكل واضح.',
                      fr: 'Oui, la visite technique et l’étude préliminaire sont gratuites à Tanger et sa région. Pour les zones éloignées, les conditions de déplacement sont précisées à l’avance.',
                    },
                  },
                  {
                    q: { ar: 'هل تعملون مع الشركات والمقاولين؟', fr: 'Travaillez-vous avec des entreprises et promoteurs ?' },
                    a: {
                      ar: 'نعم، نتعامل مع الأفراد والشركات والمنعشين العقاريين، ونوفّر عقود تنفيذ وصيانة سنوية للمشاريع الكبرى.',
                      fr: 'Oui, nous travaillons avec des particuliers, des entreprises et des promoteurs, et proposons des contrats d’exécution et de maintenance annuelle pour les grands projets.',
                    },
                  },
                  {
                    q: { ar: 'هل تقدّمون فواتير وعروض أسعار رسمية؟', fr: 'Fournissez-vous devis et factures officiels ?' },
                    a: {
                      ar: 'نعم، نسلّم عروض أسعار مفصّلة وفواتير رسمية مطابقة للقانون، مع إمكانية الأداء بالتحويل البنكي أو الشيك.',
                      fr: 'Oui, nous délivrons des devis détaillés et des factures officielles conformes, avec possibilité de règlement par virement bancaire ou chèque.',
                    },
                  },
                ].map((f) => ({ q: t(f.q, typed), a: t(f.a, typed) }))}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
