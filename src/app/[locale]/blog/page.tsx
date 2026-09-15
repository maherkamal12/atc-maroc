import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { blogPosts } from '@/content/site';
import { PageHero } from '@/components/ui/PageHero';
import { PostCard } from '@/components/cards/PostCard';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/home/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.nav.blog, locale),
    description: t(ui.blog.subtitle, locale),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ar: '/ar/blog', fr: '/fr/blog', 'x-default': '/ar/blog' },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const [lead, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.blog.eyebrow, typed)}
        title={t(ui.blog.title, typed)}
        subtitle={t(ui.blog.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.blog, typed) }]}
      />

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <PostCard post={lead} locale={typed} featured />
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70} className="h-full">
                <PostCard post={post} locale={typed} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={typed} />
    </>
  );
}
