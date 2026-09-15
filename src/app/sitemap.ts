import type { MetadataRoute } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import { services } from '@/content/services';
import { productCategories, products } from '@/content/products';
import { blogPosts } from '@/content/site';

const BASE = 'https://atc-maroc.com';

/** Every public path, relative to `/{locale}`. */
function paths(): Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> {
  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }> = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: 'a-propos', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'services', priority: 0.9, changeFrequency: 'monthly' },
    { path: 'produits', priority: 0.9, changeFrequency: 'weekly' },
    { path: 'design', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: 'contact', priority: 0.9, changeFrequency: 'yearly' },
    { path: 'plan-du-site', priority: 0.3, changeFrequency: 'monthly' },
    { path: 'mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
    { path: 'confidentialite', priority: 0.2, changeFrequency: 'yearly' },
    { path: 'conditions', priority: 0.2, changeFrequency: 'yearly' },
  ];

  return [
    ...staticPaths,
    ...services.map((s) => ({
      path: `services/${s.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    ...productCategories.map((c) => ({
      path: `produits/${c.slug}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    })),
    ...products.map((p) => ({
      path: `produits/${p.category}/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'weekly' as const,
    })),
    ...blogPosts.map((p) => ({
      path: `blog/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths().flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale: Locale) => {
      const suffix = path ? `/${path}` : '';
      return {
        url: `${BASE}/${locale}${suffix}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ar: `${BASE}/ar${suffix}`,
            fr: `${BASE}/fr${suffix}`,
          },
        },
      };
    }),
  );
}
