import Link from "next/link";
import { site, type Locale } from "@/lib/site";
import { t } from "@/lib/i18n";
import { categoryName } from "@/lib/data";
import type { Category, Service } from "@/db/schema";

type Props = {
  locale: Locale;
  services: Service[];
  categories: Category[];
};

export function SiteFooter({ locale, services, categories }: Props) {
  const tr = t(locale);
  const quickLinks = [
    { href: "/", label: tr.home },
    { href: "/about", label: locale === "fr" ? "À propos de nous" : "من نحن" },
    { href: "/services", label: tr.ourServices },
    { href: "/products", label: tr.ourProducts },
    { href: "/blog", label: tr.ourBlog },
    { href: "/design", label: locale === "fr" ? "Design et décoration" : "التصميم والتزيين" },
    { href: "/contact", label: tr.contactUs },
  ];

  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="border-b border-white/10 bg-gradient-to-r from-brand-900 to-brand-800">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-start">
          <div>
            <h2 className="text-xl font-extrabold text-white md:text-2xl">{tr.stayConnected}</h2>
            <p className="mt-1 text-sm text-white/70">{tr.ctaText}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phone}`} className="btn btn-primary">
              📞 {tr.callNow}
            </a>
            <Link href={`/${locale}/contact`} className="btn btn-outline">
              {tr.ctaButton}
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-sm font-black text-white">
              ATC
            </span>
            <span className="text-lg font-extrabold text-white">
              {locale === "fr" ? site.nameFr : site.nameAr}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{tr.footerAbout}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-accent-500"
            >
              in
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-accent-500"
            >
              wa
            </a>
            <a
              href={`mailto:${site.email}`}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-accent-500"
            >
              @
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-extrabold text-white">{tr.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  className="transition hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-extrabold text-white">{tr.ourServices}</h3>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="transition hover:text-accent-400"
                >
                  {locale === "fr" ? service.titleFr : service.titleAr}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-6 text-base font-extrabold text-white">{tr.ourCategories}</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${locale}/products?category=${category.slug}`}
                  className="transition hover:text-accent-400"
                >
                  {categoryName(category, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-extrabold text-white">{tr.contactUs}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span aria-hidden>📍</span>
              <span>{locale === "fr" ? site.addressFr : site.addressAr}</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden>📞</span>
              <a href={`tel:${site.phone}`} className="hover:text-accent-400">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <span aria-hidden>✉️</span>
              <a href={`mailto:${site.email}`} className="hover:text-accent-400">
                {site.email}
              </a>
            </li>
            <li>
              <span className="mb-1 block font-bold text-white">{tr.workingHours}</span>
              <ul className="space-y-1 text-slate-400">
                {site.hours.map((entry) => (
                  <li key={entry.fr}>{locale === "fr" ? entry.fr : entry.ar}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {locale === "fr" ? site.nameFr : site.nameAr} — {tr.rights}
          </p>
          <div className="flex items-center gap-3">
            <span>{tr.payments}</span>
            <span className="rounded bg-white/10 px-2 py-1 font-bold text-white">VISA</span>
            <span className="rounded bg-white/10 px-2 py-1 font-bold text-white">MasterCard</span>
            <span className="rounded bg-white/10 px-2 py-1 font-bold text-white">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
