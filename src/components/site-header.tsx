"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuote } from "./cart-provider";
import type { Locale } from "@/lib/site";
import { otherLocale, site } from "@/lib/site";

export type HeaderNavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

type Props = {
  locale: Locale;
  items: HeaderNavItem[];
  labels: {
    home: string;
    cart: string;
    searchPlaceholder: string;
    location: string;
    follow: string;
    languageSwitch: string;
    menu: string;
  };
};

export function SiteHeader({ locale, items, labels }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const { count } = useQuote();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const target = href === "/" ? `/${locale}` : `/${locale}${href}`;
    if (href === "/") return pathname === target;
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const switchLocale = () => {
    const segments = pathname.split("/");
    segments[1] = otherLocale(locale);
    router.push(segments.join("/") || `/${otherLocale(locale)}`);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = search.trim();
    router.push(`/${locale}/products${term ? `?q=${encodeURIComponent(term)}` : ""}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-950 text-white/80">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-2 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>📍</span>
              <span className="hidden sm:inline">{labels.location}</span>
              <span className="text-white/95">{locale === "fr" ? "Tanger, Maroc" : "طنجة، المغرب"}</span>
            </span>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-accent-400">
              <span aria-hidden>✉️</span>
              {site.email}
            </a>
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-1.5 hover:text-accent-400">
              <span aria-hidden>📞</span>
              {site.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-white/60">{labels.follow}</span>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-400"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <button
              type="button"
              onClick={switchLocale}
              className="rounded-full border border-white/25 px-3 py-0.5 text-xs font-bold text-white transition hover:border-accent-400 hover:text-accent-400"
            >
              {labels.languageSwitch}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`border-b border-slate-200 bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-20px_rgba(8,27,61,0.6)]" : ""
        }`}
      >
        <div className="wrap flex items-center gap-4 py-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-800 to-brand-600 text-lg font-black text-white shadow-lg">
              ATC
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold text-brand-950">
                {locale === "fr" ? site.nameFr : site.nameAr}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-accent-600">
                {locale === "fr" ? site.taglineFr : site.taglineAr}
              </span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="ms-auto hidden max-w-xs flex-1 lg:block">
            <div className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pe-4 ps-10 text-sm outline-none focus:border-brand-400 focus:bg-white"
              />
              <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-slate-400">
                🔍
              </span>
            </div>
          </form>

          <Link
            href={`/${locale}/cart`}
            className="relative ms-auto grid h-11 w-11 place-items-center rounded-full bg-brand-950 text-white transition hover:bg-brand-800 lg:ms-0"
            aria-label={labels.cart}
          >
            <span aria-hidden className="text-lg">🛒</span>
            {count > 0 && (
              <span className="absolute -top-1 -end-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand-900 md:hidden"
            aria-label={labels.menu}
            aria-expanded={open}
          >
            <span aria-hidden className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        <nav className="hidden border-t border-slate-100 md:block">
          <div className="wrap flex items-center gap-6 py-1.5 text-[15px] text-brand-900">
            {items.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  className="nav-link inline-flex items-center gap-1 hover:text-accent-600"
                  data-active={isActive(item.href)}
                >
                  {item.label}
                  {item.children && <span className="text-[10px] opacity-60">▾</span>}
                </Link>
                {item.children && (
                  <div className="invisible absolute top-full z-50 min-w-56 translate-y-2 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href={`tel:${site.phone}`} className="ms-auto btn btn-primary !py-2 !text-[13px]">
              📞 {site.phoneDisplay}
            </a>
          </div>
        </nav>

        {open && (
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="wrap py-3">
              <form onSubmit={submitSearch} className="mb-3">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={labels.searchPlaceholder}
                  className="field"
                />
              </form>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={`/${locale}${item.href === "/" ? "" : item.href}`}
                      className="block rounded-lg px-3 py-2 font-bold text-brand-900 hover:bg-brand-50"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mb-2 ms-3 space-y-1 border-s border-slate-100 ps-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={`/${locale}${child.href}`}
                              className="block rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:text-accent-600"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
