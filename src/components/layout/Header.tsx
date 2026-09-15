'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { type Locale, localeHref, otherLocale, t, localeConfig } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { productCategories } from '@/content/products';
import { Logo } from './Logo';
import { Icon, tones } from '@/components/ui/Icon';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close overlays whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const target = otherLocale(locale);
  // Swap the locale prefix while keeping the visitor on the same page.
  const swappedPath = (() => {
    const parts = pathname.split('/').filter(Boolean);
    parts[0] = target;
    return '/' + parts.join('/');
  })();

  const isActive = (href: string) =>
    href === localeHref(locale)
      ? pathname === localeHref(locale)
      : pathname.startsWith(href);

  const navItems = [
    { label: t(ui.nav.home, locale), href: localeHref(locale) },
    { label: t(ui.nav.about, locale), href: localeHref(locale, 'a-propos') },
    { label: t(ui.nav.services, locale), href: localeHref(locale, 'services'), group: 'services' },
    { label: t(ui.nav.products, locale), href: localeHref(locale, 'produits'), group: 'products' },
    { label: t(ui.nav.design, locale), href: localeHref(locale, 'design') },
    { label: t(ui.nav.blog, locale), href: localeHref(locale, 'blog') },
    { label: t(ui.nav.contact, locale), href: localeHref(locale, 'contact') },
  ];

  return (
    <>
      {/* ---------------------------------------------------------------- top bar */}
      <div className="hidden bg-brand-950 text-white lg:block">
        <div className="container flex h-10 items-center justify-between text-[.78rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-white/80">
              <MapPin className="h-3.5 w-3.5 text-accent-400" strokeWidth={2.2} />
              {t(ui.topbar.address, locale)}
            </span>
            <span className="inline-flex items-center gap-2 text-white/80">
              <Clock className="h-3.5 w-3.5 text-accent-400" strokeWidth={2.2} />
              {t(site.hours[0].days, locale)}: {t(site.hours[0].time, locale)}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-accent-400"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5 text-accent-400" strokeWidth={2.2} />
              {site.phoneDisplay}
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-2 text-white/80 transition hover:text-accent-400"
            >
              <Mail className="h-3.5 w-3.5 text-accent-400" strokeWidth={2.2} />
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/80 transition hover:text-accent-400"
            >
              <Instagram className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <span className="h-4 w-px bg-white/20" />
            <Link
              href={swappedPath}
              className="inline-flex items-center gap-1.5 font-bold text-accent-400 transition hover:text-accent-300"
              hrefLang={target}
            >
              {t(ui.common.switchTo, locale)}
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- main header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-slate-200 bg-white/95 shadow-soft backdrop-blur-lg'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4 lg:h-[78px]">
          <Logo locale={locale} />

          {/* desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {navItems.map((item) => {
              const hasGroup = Boolean(item.group);
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[.86rem] font-bold transition ${
                      isActive(item.href)
                        ? 'text-brand-950'
                        : 'text-ink-700 hover:text-brand-950'
                    }`}
                  >
                    {item.label}
                    {hasGroup && (
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180"
                        strokeWidth={2.6}
                      />
                    )}
                    <span
                      className={`absolute inset-x-3.5 bottom-0.5 h-[2px] rounded-full bg-accent-500 transition-all duration-300 ${
                        isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </Link>

                  {item.group === 'services' && (
                    <div className="invisible absolute start-0 top-full z-50 w-[560px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-lift">
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((s) => {
                            const tone = tones[s.tone];
                            return (
                              <Link
                                key={s.slug}
                                href={localeHref(locale, `services/${s.slug}`)}
                                className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                              >
                                <span
                                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}
                                >
                                  <Icon name={s.icon} className="h-4.5 w-4.5" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[.86rem] font-bold text-brand-950">
                                    {t(s.title, locale)}
                                  </span>
                                  <span className="mt-0.5 block truncate text-[.74rem] text-ink-500">
                                    {t(s.tagline, locale)}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          href={localeHref(locale, 'services')}
                          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-950 px-4 py-3 text-[.8rem] font-bold text-white transition hover:bg-brand-900"
                        >
                          {t(ui.common.seeAllServices, locale)}
                          <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.4} />
                        </Link>
                      </div>
                    </div>
                  )}

                  {item.group === 'products' && (
                    <div className="invisible absolute start-0 top-full z-50 w-[420px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-lift">
                        <div className="grid gap-1">
                          {productCategories.map((c) => (
                            <Link
                              key={c.slug}
                              href={localeHref(locale, `produits/${c.slug}`)}
                              className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                                <Icon name={c.icon} className="h-4.5 w-4.5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[.86rem] font-bold text-brand-950">
                                  {t(c.title, locale)}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={localeHref(locale, 'produits')}
                          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-950 px-4 py-3 text-[.8rem] font-bold text-white transition hover:bg-brand-900"
                        >
                          {t(ui.common.seeAllProducts, locale)}
                          <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.4} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-2">
            <Link
              href={swappedPath}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-[.78rem] font-bold text-brand-950 transition hover:border-brand-300 hover:bg-slate-50 xl:hidden"
              hrefLang={target}
            >
              {localeConfig[target].label}
            </Link>
            <Link
              href={localeHref(locale, 'contact')}
              className="btn-primary hidden !px-5 !py-2.5 !text-[.82rem] sm:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} />
              {t(ui.common.freeQuote, locale)}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t(ui.common.openMenu, locale)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-950 transition hover:bg-slate-50 xl:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 start-0 flex w-[88%] max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? 'translate-x-0' : locale === 'ar' ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-4">
            <Logo locale={locale} compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t(ui.common.close, locale)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-950"
            >
              <X className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.group ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Link
                          href={item.href}
                          className="flex-1 rounded-2xl px-4 py-3 text-[.95rem] font-bold text-brand-950 transition hover:bg-slate-50"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-label={item.label}
                          aria-expanded={openGroup === item.group}
                          onClick={() =>
                            setOpenGroup(openGroup === item.group ? null : item.group!)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-brand-950"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openGroup === item.group ? 'rotate-180' : ''
                            }`}
                            strokeWidth={2.6}
                          />
                        </button>
                      </div>
                      {openGroup === item.group && (
                        <ul className="mb-2 ms-2 space-y-0.5 border-s-2 border-slate-100 ps-2">
                          {(item.group === 'services'
                            ? services.map((s) => ({
                                slug: s.slug,
                                label: t(s.title, locale),
                                icon: s.icon,
                                base: 'services',
                              }))
                            : productCategories.map((c) => ({
                                slug: c.slug,
                                label: t(c.title, locale),
                                icon: c.icon,
                                base: 'produits',
                              }))
                          ).map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={localeHref(locale, `${s.base}/${s.slug}`)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[.87rem] font-semibold text-ink-700 transition hover:bg-slate-50 hover:text-brand-950"
                              >
                                <Icon name={s.icon} className="h-4 w-4 text-accent-600" />
                                {s.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block rounded-2xl px-4 py-3 text-[.95rem] font-bold transition hover:bg-slate-50 ${
                        isActive(item.href) ? 'bg-accent-50 text-accent-700' : 'text-brand-950'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
              <Link
                href={localeHref(locale, 'contact')}
                className="btn-primary w-full"
              >
                {t(ui.common.freeQuote, locale)}
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  t(ui.common.whatsappMessage, locale),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                {t(ui.common.whatsapp, locale)}
              </a>
              <a href={site.phoneHref} className="btn-outline w-full" dir="ltr">
                <Phone className="h-4 w-4" strokeWidth={2.4} />
                {site.phoneDisplay}
              </a>
              <Link href={swappedPath} className="btn-outline w-full" hrefLang={target}>
                {localeConfig[target].label}
              </Link>
            </div>

            <div className="mt-5 space-y-2 text-[.8rem] text-ink-500">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                {t(site.address, locale)}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                <a href={site.emailHref} className="hover:text-brand-950">
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-950"
                >
                  {site.instagramHandle}
                </a>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
