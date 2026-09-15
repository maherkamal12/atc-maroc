import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { blogPosts } from '@/content/site';
import { PostCard } from '@/components/cards/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function BlogTeaser({ locale }: { locale: Locale }) {
  const [lead, ...rest] = blogPosts;

  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={t(ui.blog.eyebrow, locale)}
            title={t(ui.blog.title, locale)}
            subtitle={t(ui.blog.subtitle, locale)}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12">
            <PostCard post={lead} locale={locale} featured />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 80} className="h-full">
              <PostCard post={post} locale={locale} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-12 flex justify-center">
            <Link href={localeHref(locale, 'blog')} className="btn-outline !px-8 !py-3.5">
              {t(ui.blog.seeAll, locale)}
              <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
