import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/.data/'],
      },
    ],
    sitemap: 'https://atc-maroc.com/sitemap.xml',
    host: 'https://atc-maroc.com',
  };
}
