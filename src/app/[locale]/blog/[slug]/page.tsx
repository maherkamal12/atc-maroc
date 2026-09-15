import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Clock, Tag } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { blogPosts, getPost, site } from '@/content/site';
import { blogBodies } from '@/content/blog-bodies';
import { PageHero } from '@/components/ui/PageHero';
import { PostCard, formatPostDate } from '@/components/cards/PostCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { CtaBand } from '@/components/home/CtaBand';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  return {
    title: t(post.title, locale),
    description: t(post.excerpt, locale),
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ar: `/ar/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        'x-default': `/ar/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: t(post.title, locale),
      description: t(post.excerpt, locale),
      publishedTime: post.date,
      images: [{ url: post.cover, width: 1200, height: 630, alt: t(post.title, locale) }],
    },
  };
}

/**
 * Long-form bodies live in the content layer (`blogBodies`), one complete
 * article per post — no post renders placeholder copy.
 */
function articleBody(slug: string) {
  return blogBodies[slug] ?? [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug);
  if (!post) notFound();

  const typed = locale as Locale;
  const sections = articleBody(slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: t(post.title, typed),
    description: t(post.excerpt, typed),
    image: `https://atc-maroc.com${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: typed,
    author: { '@type': 'Organization', name: site.latinName },
    publisher: {
      '@type': 'Organization',
      name: site.latinName,
      logo: { '@type': 'ImageObject', url: 'https://atc-maroc.com/images/hero/main.jpg' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://atc-maroc.com/${typed}/blog/${slug}`,
    },
  };

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(post.category, typed)}
        title={t(post.title, typed)}
        subtitle={t(post.excerpt, typed)}
        crumbs={[
          { label: t(ui.nav.blog, typed), href: localeHref(typed, 'blog') },
          { label: t(post.category, typed) },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[.82rem] font-semibold text-white/60">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent-400" strokeWidth={2.2} />
            {t(ui.blog.publishedOn, typed)} {formatPostDate(post.date, typed)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent-400" strokeWidth={2.2} />
            {post.readingMinutes} {t(ui.blog.readingTime, typed)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Tag className="h-4 w-4 text-accent-400" strokeWidth={2.2} />
            {t(post.category, typed)}
          </span>
        </div>
      </PageHero>

      {/* ------------------------------------------------------------ cover */}
      <section className="bg-white pt-14">
        <div className="container">
          <Reveal>
            <figure className="relative overflow-hidden rounded-4xl shadow-lift">
              <div className="relative aspect-[21/9]">
                <SmartImage
                  src={post.cover}
                  alt={t(post.title, typed)}
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- article */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-[1.08rem] font-semibold leading-[1.95] text-brand-900">
              {t(post.excerpt, typed)}
            </p>

            <div className="prose-atc mt-9">
              {sections.map((section, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className={i > 0 ? 'mt-8' : ''}>
                    {section.h && (
                      <h2 className="mb-4 mt-10 text-[1.25rem] font-extrabold leading-snug text-brand-950">
                        {t(section.h, typed)}
                      </h2>
                    )}
                    <p>{t(section.p, typed)}</p>
                    {section.list && (
                      <ul className="mt-5 space-y-3">
                        {section.list.map((item, k) => (
                          <li key={k}>{t(item, typed)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* inline CTA */}
            <Reveal delay={120}>
              <div className="mt-12 rounded-3xl bg-brand-950 p-7 text-white">
                <p className="text-[1.05rem] font-extrabold text-white">
                  {t(ui.services.ctaTitle, typed)}
                </p>
                <p className="mt-3 text-[.9rem] leading-[1.85] text-white/60">
                  {t(ui.services.ctaBody, typed)}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={site.phoneHref} className="btn-primary" dir="ltr">
                    {site.phoneDisplay}
                  </a>
                  <Link href={localeHref(typed, 'contact')} className="btn-ghost-light">
                    {t(ui.common.freeQuote, typed)}
                    <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <Link
                href={localeHref(typed, 'blog')}
                className="inline-flex items-center gap-2 text-[.88rem] font-extrabold text-accent-700 transition-all hover:gap-3"
              >
                <ArrowRight className="rtl-flip h-4 w-4 rotate-180" strokeWidth={2.6} />
                {t(ui.blog.backToBlog, typed)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- related */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.blog.relatedArticles, typed)}
              title={t(ui.blog.relatedArticles, typed)}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} className="h-full">
                <PostCard post={p} locale={typed} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={typed} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
