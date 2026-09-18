import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getPosts, postExcerpt, postTag, postTitle } from "@/lib/data";
import { t } from "@/lib/i18n";
import { formatDate, isLocale, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        title={tr.ourBlog}
        subtitle={tr.blogLead}
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: tr.ourBlog }]}
        image={heroImages.electrical}
      />

      <section className="section">
        <div className="wrap">
          {featured && (
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="card group mb-10 grid gap-0 overflow-hidden md:grid-cols-2"
            >
              <div className="relative h-56 overflow-hidden md:h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={postTitle(featured, locale)}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 start-4 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold text-white">
                  {postTag(featured, locale)}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <span className="text-xs font-semibold text-slate-400">
                  {formatDate(featured.publishedAt, locale)} · {featured.readMinutes} {tr.minutes}
                </span>
                <h2 className="mt-3 text-xl font-extrabold text-brand-950 group-hover:text-accent-600 md:text-2xl">
                  {postTitle(featured, locale)}
                </h2>
                <p className="mt-3 text-[14.5px] leading-loose text-slate-600">
                  {postExcerpt(featured, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-600">
                  {tr.readMore}
                  <span aria-hidden className="rtl:rotate-180">→</span>
                </span>
              </div>
            </Link>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="card group block">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={postTitle(post, locale)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 start-3 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold text-white">
                    {postTag(post, locale)}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {formatDate(post.publishedAt, locale)} · {post.readMinutes} {tr.minutes}
                  </span>
                  <h3 className="mt-2 line-clamp-2-custom text-[15px] font-extrabold text-brand-950 group-hover:text-accent-600">
                    {postTitle(post, locale)}
                  </h3>
                  <p className="mt-2 line-clamp-3-custom text-[13px] leading-relaxed text-slate-600">
                    {postExcerpt(post, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
