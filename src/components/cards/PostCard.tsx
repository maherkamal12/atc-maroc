import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { SmartImage } from '@/components/ui/SmartImage';

export type Post = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: Record<Locale, string>;
  date: string;
  readingMinutes: number;
  cover: string;
};

export function formatPostDate(date: string, locale: Locale) {
  const d = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-MA' : 'fr-MA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: Post;
  locale: Locale;
  featured?: boolean;
}) {
  const href = localeHref(locale, `blog/${post.slug}`);

  return (
    <article
      className={`group card card-hover flex h-full overflow-hidden ${
        featured ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <Link
        href={href}
        className={`relative block overflow-hidden ${
          featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[46%]' : 'aspect-[16/10]'
        }`}
      >
        <SmartImage
          src={post.cover}
          alt={t(post.title, locale)}
          sizes={featured ? '(max-width: 1024px) 100vw, 46vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-70" />
        <span className="absolute start-4 top-4 rounded-full bg-accent-500 px-3 py-1.5 text-[.68rem] font-extrabold text-brand-950">
          {t(post.category, locale)}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:justify-center lg:p-8' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[.72rem] font-semibold text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={2.2} />
            {formatPostDate(post.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" strokeWidth={2.2} />
            {post.readingMinutes} {t(ui.blog.readingTime, locale)}
          </span>
        </div>

        <h3
          className={`mt-3.5 font-extrabold leading-snug text-brand-950 ${
            featured ? 'text-[1.3rem]' : 'text-[1.02rem]'
          }`}
        >
          <Link href={href} className="transition hover:text-brand-700">
            {t(post.title, locale)}
          </Link>
        </h3>

        <p
          className={`mt-3 flex-1 leading-[1.85] text-ink-500 ${
            featured ? 'text-[.94rem]' : 'line-clamp-3 text-[.85rem]'
          }`}
        >
          {t(post.excerpt, locale)}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-[.83rem] font-extrabold text-accent-700 transition-all duration-300 hover:gap-3"
        >
          {t(ui.common.readMore, locale)}
          <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
        </Link>
      </div>
    </article>
  );
}
