import Link from 'next/link';
import {
  ArrowUpRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { type Locale, localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { productCategories } from '@/content/products';
import { Logo } from './Logo';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white">
      <div className="bg-blueprint absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-32 end-0 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        {/* ------------------------------------------------------------- newsletter */}
        <div className="border-b border-white/10">
          <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="flex items-center gap-3 text-xl font-extrabold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-400">
                  <Send className="h-5 w-5" strokeWidth={2} />
                </span>
                {t(ui.footer.newsletter, locale)}
              </h2>
              <p className="mt-3 text-[.92rem] leading-relaxed text-white/65">
                {t(ui.footer.newsletterBody, locale)}
              </p>
            </div>
            <NewsletterForm locale={locale} />
          </div>
        </div>

        {/* ------------------------------------------------------------------ main */}
        <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo locale={locale} variant="light" />
            <p className="mt-6 text-[.88rem] leading-[1.9] text-white/60">
              {t(ui.footer.about, locale)}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-brand-950"
              >
                <Instagram className="h-4.5 w-4.5" strokeWidth={2.2} />
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-brand-950"
              >
                <Phone className="h-4.5 w-4.5" strokeWidth={2.2} />
              </a>
              <a
                href={site.emailHref}
                aria-label="E-mail"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-brand-950"
              >
                <Mail className="h-4.5 w-4.5" strokeWidth={2.2} />
              </a>
            </div>
          </div>

          {/* quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-[.8rem] font-extrabold uppercase tracking-[.14em] text-accent-400">
              {t(ui.footer.quickLinks, locale)}
            </h3>
            <ul className="mt-5 space-y-2.5 text-[.88rem]">
              {[
                { label: t(ui.nav.home, locale), href: localeHref(locale) },
                { label: t(ui.nav.about, locale), href: localeHref(locale, 'a-propos') },
                { label: t(ui.nav.services, locale), href: localeHref(locale, 'services') },
                { label: t(ui.nav.products, locale), href: localeHref(locale, 'produits') },
                { label: t(ui.nav.design, locale), href: localeHref(locale, 'design') },
                { label: t(ui.nav.blog, locale), href: localeHref(locale, 'blog') },
                { label: t(ui.nav.contact, locale), href: localeHref(locale, 'contact') },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 transition hover:text-accent-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div className="lg:col-span-3">
            <h3 className="text-[.8rem] font-extrabold uppercase tracking-[.14em] text-accent-400">
              {t(ui.footer.ourServices, locale)}
            </h3>
            <ul className="mt-5 space-y-2.5 text-[.88rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localeHref(locale, `services/${s.slug}`)}
                    className="text-white/60 transition hover:text-accent-400"
                  >
                    {t(s.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* products + contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[.8rem] font-extrabold uppercase tracking-[.14em] text-accent-400">
              {t(ui.footer.ourProducts, locale)}
            </h3>
            <ul className="mt-5 space-y-2.5 text-[.88rem]">
              {productCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={localeHref(locale, `produits/${c.slug}`)}
                    className="text-white/60 transition hover:text-accent-400"
                  >
                    {t(c.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-[.8rem] font-extrabold uppercase tracking-[.14em] text-accent-400">
              {t(ui.footer.contact, locale)}
            </h3>
            <ul className="mt-5 space-y-3 text-[.86rem] text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" strokeWidth={2.2} />
                <span>{t(site.address, locale)}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" strokeWidth={2.2} />
                <a href={site.phoneHref} dir="ltr" className="transition hover:text-accent-400">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" strokeWidth={2.2} />
                <a href={site.emailHref} className="transition hover:text-accent-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" strokeWidth={2.2} />
                <span>
                  {site.hours.map((h) => (
                    <span key={t(h.days, locale)} className="block">
                      {t(h.days, locale)}: <span dir="ltr">{t(h.time, locale)}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------------------ zones */}
        <div className="border-t border-white/10">
          <div className="container flex flex-wrap items-center gap-2 py-6">
            <span className="me-2 text-[.76rem] font-bold uppercase tracking-[.12em] text-accent-400">
              {t(ui.about.zonesTitle, locale)}
            </span>
            {site.zones.map((z) => (
              <span
                key={z}
                className="rounded-full bg-white/[.07] px-3 py-1 text-[.72rem] text-white/55"
              >
                {z}
              </span>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------- payment */}
        <div className="border-t border-white/10">
          <div className="container flex flex-wrap items-center justify-between gap-4 py-6">
            <p className="text-[.78rem] font-bold uppercase tracking-[.12em] text-white/45">
              {t(ui.footer.paymentTitle, locale)}
            </p>
            <ul className="flex flex-wrap items-center gap-2.5">
              {([
                ['Visa', 'VISA'],
                ['Mastercard', 'Mastercard'],
                ['CMI', 'CMI'],
                ['CashPlus', 'CashPlus'],
                ['Cash', 'Cash'],
              ] as const).map(([key, label]) => (
                <li
                  key={key}
                  className="flex h-8 min-w-[68px] items-center justify-center rounded-lg border border-white/15 bg-white/[.07] px-3 text-[.68rem] font-black uppercase tracking-[.06em] text-white/70"
                >
                  {label}
                </li>
              ))}
            </ul>
            <p className="text-[.76rem] text-white/45">{t(ui.footer.paymentNote, locale)}</p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- bottom */}
        <div className="border-t border-white/10">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 text-[.78rem] text-white/50 md:flex-row">
            <p>
              © {year} {t(ui.footer.companyLegal, locale)} — {t(ui.footer.rights, locale)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link href={localeHref(locale, 'mentions-legales')} className="hover:text-accent-400">
                {t(ui.footer.legal, locale)}
              </Link>
              <Link href={localeHref(locale, 'confidentialite')} className="hover:text-accent-400">
                {t(ui.footer.privacy, locale)}
              </Link>
              <Link href={localeHref(locale, 'conditions')} className="hover:text-accent-400">
                {t(ui.footer.terms, locale)}
              </Link>
              <Link href={localeHref(locale, 'plan-du-site')} className="hover:text-accent-400">
                {t(ui.footer.sitemap, locale)}
              </Link>
            </div>
            <p className="inline-flex items-center gap-1.5">
              {t(ui.footer.madeIn, locale)}
              <span aria-hidden="true">🇲🇦</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-accent-400" strokeWidth={2.4} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
