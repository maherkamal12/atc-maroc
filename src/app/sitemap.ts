import type { MetadataRoute } from "next";
import { getCategories, getPosts, getProducts, getServices } from "@/lib/data";
import { listPublishedPages } from "@/lib/pages";
import { locales } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://atc-maroc.com").replace(/\/$/, "");
  const [services, categories, products, posts, extraPages] = await Promise.all([
    getServices(),
    getCategories(),
    getProducts(),
    getPosts(),
    listPublishedPages(),
  ]);

  const staticPaths = ["", "/about", "/services", "/products", "/blog", "/design", "/contact", "/cart"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const service of services) {
      entries.push({ url: `${base}/${locale}/services/${service.slug}`, priority: 0.8 });
    }
    for (const category of categories) {
      entries.push({ url: `${base}/${locale}/products?category=${category.slug}`, priority: 0.6 });
    }
    for (const product of products) {
      entries.push({ url: `${base}/${locale}/products/${product.slug}`, priority: 0.6 });
    }
    for (const post of posts) {
      entries.push({ url: `${base}/${locale}/blog/${post.slug}`, priority: 0.5 });
    }
    for (const page of extraPages) {
      entries.push({ url: `${base}/${locale}/p/${page.slug}`, priority: 0.6 });
    }
  }

  return entries;
}
