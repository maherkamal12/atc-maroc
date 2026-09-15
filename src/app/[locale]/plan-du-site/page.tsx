import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, FileText, LayoutGrid, Newspaper, Package, Wrench } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { services } from '@/content/services';
import { productCategories, products } from '@/content/products';
import { blogPosts } from '@/content/site';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.footer.sitemap, locale),
    description: t(ui.seo.defaultDescription, locale),
    alternates: {
      canonical: `/${locale}/plan-du-site`,
      languages: {
        ar: '/ar/plan-du-site',
        fr: '/fr/plan-du-site',
        'x-default': '/ar/plan-du-site',
      },
    },
  };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const groups = [
    {
      icon: LayoutGrid,
      title: { ar: 'الصفحات الرئيسية', fr: 'Pages principales' },
      links: [
        { label: t(ui.nav.home, typed), href: localeHref(typed) },
        { label: t(ui.nav.about, typed), href: localeHref(typed, 'a-propos') },
        { label: t(ui.nav.services, typed), href: localeHref(typed, 'services') },
        { label: t(ui.nav.products, typed), href: localeHref(typed, 'produits') },
        { label: t(ui.nav.design, typed), href: localeHref(typed, 'design') },
        { label: t(ui.nav.blog, typed), href: localeHref(typed, 'blog') },
        { label: t(ui.nav.contact, typed), href: localeHref(typed, 'contact') },
      ],
    },
    {
      icon: Wrench,
      title: { ar: 'الخدمات', fr: 'Services' },
      links: services.map((s) => ({
        label: t(s.title, typed),
        href: localeHref(typed, `services/${s.slug}`),
      })),
    },
    {
      icon: Package,
      title: { ar: 'فئات المنتجات', fr: 'Catégories de produits' },
      links: productCategories.map((c) => ({
        label: t(c.title, typed),
        href: localeHref(typed, `produits/${c.slug}`),
      })),
    },
    {
      icon: Newspaper,
      title: { ar: 'المدونة', fr: 'Blog' },
      links: blogPosts.map((p) => ({
        label: t(p.title, typed),
        href: localeHref(typed, `blog/${p.slug}`),
      })),
    },
    {
      icon: FileText,
      title: { ar: 'معلومات قانونية', fr: 'Informations légales' },
      links: [
        { label: t(ui.footer.legal, typed), href: localeHref(typed, 'mentions-legales') },
        { label: t(ui.footer.privacy, typed), href: localeHref(typed, 'confidentialite') },
        { label: t(ui.footer.terms, typed), href: localeHref(typed, 'conditions') },
      ],
    },
  ];

  const totalProducts = products.length;

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.footer.sitemap, typed)}
        title={t(ui.footer.sitemap, typed)}
        subtitle={
          typed === 'ar'
            ? `خريطة كاملة لكل صفحات الموقع: ${services.length} خدمات، ${productCategories.length} فئات منتجات تضم ${totalProducts} منتجًا، و${blogPosts.length} مقالات.`
            : `Plan complet du site : ${services.length} services, ${productCategories.length} catégories totalisant ${totalProducts} produits et ${blogPosts.length} articles.`
        }
        crumbs={[{ label: t(ui.footer.sitemap, typed) }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, i) => {
              const IconCmp = group.icon;
              return (
                <Reveal key={i} delay={i * 60} className="h-full">
                  <nav className="card h-full p-6">
                    <h2 className="flex items-center gap-3 text-[1rem] font-extrabold text-brand-950">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <IconCmp className="h-5 w-5" strokeWidth={2.1} />
                      </span>
                      {t(group.title, typed)}
                    </h2>
                    <ul className="mt-5 space-y-2.5">
                      {group.links.map((link, k) => (
                        <li key={k}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-start gap-2 text-[.86rem] leading-snug text-ink-700 transition hover:text-accent-700"
                          >
                            <ArrowRight
                              className="rtl-flip mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-accent-600"
                              strokeWidth={2.8}
                            />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Reveal>
              );
            })}
          </div>

          {/* all products, compact */}
          <Reveal delay={140}>
            <div className="mt-10 card p-6">
              <h2 className="flex items-center gap-3 text-[1rem] font-extrabold text-brand-950">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Package className="h-5 w-5" strokeWidth={2.1} />
                </span>
                {typed === 'ar' ? 'كل المنتجات' : 'Tous les produits'}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={localeHref(typed, `produits/${p.category}/${p.slug}`)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[.78rem] font-semibold text-ink-700 transition hover:border-accent-300 hover:text-accent-700"
                    >
                      <Icon
                        name={
                          productCategories.find((c) => c.slug === p.category)?.icon ?? 'Zap'
                        }
                        className="h-3.5 w-3.5 text-accent-600"
                      />
                      {t(p.name, typed)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
