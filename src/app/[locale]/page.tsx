import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/home/Hero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { SectorsMarquee } from '@/components/home/SectorsMarquee';
import { WhyUs } from '@/components/home/WhyUs';
import { StatsBand } from '@/components/home/StatsBand';
import { DesignTeaser } from '@/components/home/DesignTeaser';
import { ProductsShowcase } from '@/components/home/ProductsShowcase';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import { CtaBand } from '@/components/home/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', fr: '/fr', 'x-default': '/ar' },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typed = locale as Locale;

  return (
    <>
      <Hero locale={typed} />
      <SectorsMarquee locale={typed} />
      <ServicesGrid locale={typed} />
      <WhyUs locale={typed} />
      <StatsBand locale={typed} />
      <DesignTeaser locale={typed} />
      <ProductsShowcase locale={typed} />
      <ProcessSteps locale={typed} />
      <Testimonials locale={typed} />
      <BlogTeaser locale={typed} />
      <CtaBand locale={typed} />
    </>
  );
}
