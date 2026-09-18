import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getPost, getPosts, postBody, postTag, postTitle } from "@/lib/data";
import { t } from "@/lib/i18n";
import { formatDate, isLocale, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const post = await getPost(slug);
  if (!post) notFound();
  const others = (await getPosts()).filter((item) => item.slug !== post.slug).slice(0, 3);
  const paragraphs = postBody(post, locale).split("\n").filter(Boolean);

  return (
    <>
      <PageHero
        title={postTitle(post, locale)}
        subtitle={`${formatDate(post.publishedAt, locale)} · ${post.readMinutes} ${tr.minutes} · ${postTag(post, locale)}`}
        breadcrumbs={[
          { href: `/${locale}`, label: tr.breadcrumbHome },
          { href: `/${locale}/blog`, label: tr.ourBlog },
          { label: postTitle(post, locale) },
        ]}
        image={post.image}
      />

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="" className="h-72 w-full object-cover md:h-96" />
            </div>
            <div className="mt-8 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[15.5px] leading-loose text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-brand-50 p-6">
              <p className="flex-1 text-sm font-semibold text-brand-900">
                {locale === "fr"
                  ? "Besoin d'un conseil technique pour votre projet ?"
                  : "هل تحتاج نصيحة تقنية لمشروعك؟"}
              </p>
              <Link href={`/${locale}/contact`} className="btn btn-primary !py-2.5 !text-[13px]">
                {tr.ctaButton}
              </Link>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-brand-950">{tr.ourBlog}</h3>
              <ul className="mt-4 space-y-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${locale}/blog/${item.slug}`}
                      className="flex gap-3 text-sm font-semibold text-slate-700 transition hover:text-accent-600"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                      <span className="line-clamp-2-custom">{postTitle(item, locale)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
