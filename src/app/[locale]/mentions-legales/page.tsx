import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { LegalPage, LegalFootnote, type LegalSection } from '@/components/ui/LegalPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.footer.legal, locale),
    description: t(ui.footer.legal, locale),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}/mentions-legales`,
      languages: {
        ar: '/ar/mentions-legales',
        fr: '/fr/mentions-legales',
        'x-default': '/ar/mentions-legales',
      },
    },
  };
}

const sections: LegalSection[] = [
  {
    h: { ar: 'تعريف الموقع', fr: 'Éditeur du site' },
    p: {
      ar: 'هذا الموقع هو الموقع الرسمي لشركة أطلس تك كونسيبت (ATLAS TECH CONCEPT)، وهي شركة متخصصة في الحلول التقنية المتكاملة للمباني: الكهرباء، السباكة، التكييف، التدفئة المركزية، الطاقة الشمسية، والتجهيز الداخلي والتشطيب. المقر الاجتماعي: شارع مولاي إسماعيل، إقامة مولاي إسماعيل رقم 22، الطابق 5 رقم 19، 90000 طنجة، المغرب.',
      fr: "Ce site est le site officiel d'Atlas Tech Concept, entreprise spécialisée dans les solutions techniques intégrées pour le bâtiment : électricité, plomberie, climatisation, chauffage central, énergie solaire, aménagement intérieur et finitions. Siège social : Avenue Moulay Ismaïl, Rés. Moulay Ismaïl N°22, Étage 5 N°19, 90000 Tanger, Maroc.",
    },
  },
  {
    h: { ar: 'معلومات الاتصال', fr: 'Coordonnées' },
    p: {
      ar: `البريد الإلكتروني: ${site.email} — الهاتف: ${site.phoneDisplay} — انستغرام: ${site.instagramHandle}. ساعات العمل: الاثنين إلى الجمعة من 10:00 إلى 18:00، السبت من 08:00 إلى 18:00، الأحد من 09:00 إلى 17:00.`,
      fr: `E-mail : ${site.email} — Téléphone : ${site.phoneDisplay} — Instagram : ${site.instagramHandle}. Horaires : du lundi au vendredi de 10h00 à 18h00, samedi de 08h00 à 18h00, dimanche de 09h00 à 17h00.`,
    },
  },
  {
    h: { ar: 'النشاط والخدمات', fr: 'Activités et services' },
    p: {
      ar: 'تشمل خدماتنا: تصميم وتنفيذ وصيانة الأنظمة الكهربائية، شبكات السباكة والتغذية والتصريف، أنظمة التدفئة المركزية والتدفئة الأرضية، أنظمة التكييف والتهوية الميكانيكية، الأنظمة الشمسية الكهروضوئية والحرارية، وأشغال التجهيز الداخلي والتشطيب والديكور. كما نقوم ببيع وتوريد المعدات والمواد التقنية المرتبطة بهذه الأنشطة.',
      fr: "Nos services comprennent : la conception, l'exécution et la maintenance des installations électriques, les réseaux de plomberie, d'alimentation et d'évacuation, les systèmes de chauffage central et de plancher chauffant, la climatisation et la ventilation mécanique, les systèmes solaires photovoltaïques et thermiques, ainsi que les travaux d'aménagement intérieur, de finition et de décoration. Nous assurons également la vente et la fourniture du matériel technique associé.",
    },
  },
  {
    h: { ar: 'الملكية الفكرية', fr: 'Propriété intellectuelle' },
    p: {
      ar: 'جميع محتويات هذا الموقع من نصوص وصور ومخططات وشعارات وعناصر رسومية محمية بحقوق الملكية الفكرية. يُمنع أي استنساخ أو إعادة نشر أو استخدام تجاري كلي أو جزئي دون إذن كتابي مسبق من الشركة. يُسمح بالاقتباس القصير مع الإشارة الصريحة إلى المصدر وربط تشعبي إلى الصفحة الأصلية.',
      fr: "L'ensemble des contenus de ce site (textes, photographies, plans, logos et éléments graphiques) est protégé par le droit de la propriété intellectuelle. Toute reproduction, rediffusion ou usage commercial, total ou partiel, est interdit sans autorisation écrite préalable. Les citations courtes sont autorisées avec mention explicite de la source et un lien hypertexte vers la page d'origine.",
    },
  },
  {
    h: { ar: 'حدود المسؤولية', fr: 'Limitation de responsabilité' },
    p: {
      ar: 'المعلومات المنشورة على الموقع تُقدَّم بصفة إعلامية عامة. نبذل جهدًا معقولًا لتحديثها ولكننا لا نضمن دقتها الكاملة أو مواكبتها لكل الحالات الخاصة. الأسعار والمواصفات المذكورة على الموقع قابلة للتغيير دون إشعار مسبق، ولا تشكّل عرضًا تعاقديًا ملزمًا. العرض الملزم هو عرض السعر المكتوب والموقّع الذي نسلّمه للعميل بعد الدراسة الميدانية.',
      fr: "Les informations publiées sur ce site sont fournies à titre indicatif. Nous faisons un effort raisonnable pour les tenir à jour sans garantir leur exactitude absolue ni leur adaptation à chaque cas particulier. Les prix et spécifications mentionnés sont susceptibles de modification sans préavis et ne constituent pas une offre contractuelle. Seul le devis écrit et signé, remis après l'étude sur site, engage l'entreprise.",
    },
  },
  {
    h: { ar: 'الروابط الخارجية', fr: 'Liens externes' },
    p: {
      ar: 'قد يحتوي الموقع على روابط لمواقع أخرى مثل انستغرام أو خرائط جوجل. لا نتحمل أي مسؤولية عن محتوى هذه المواقع أو سياساتها. نوصي بمراجعة شروط الاستخدام وسياسة الخصوصية لكل موقع خارجي تزوره.',
      fr: "Le site peut contenir des liens vers d'autres sites, notamment Instagram ou Google Maps. Nous n'assumons aucune responsabilité quant à leur contenu ou leurs politiques. Nous vous recommandons de consulter les conditions d'utilisation et la politique de confidentialité de chaque site externe visité.",
    },
  },
  {
    h: { ar: 'القانون المطبق', fr: 'Droit applicable' },
    p: {
      ar: 'يخضع هذا الموقع والقانون المطبّق عليه للتشريع المغربي. أي نزاع يتعلق باستخدام الموقع يختص به القضاء المغربي المختص مكانيًا. في حال تعارض بين النسخة العربية والنسخة الفرنسية من هذه الوثيقة، تُعتمد النسخة العربية مرجعًا في تفسير العلاقة التعاقدية.',
      fr: "Ce site et le droit applicable relèvent de la législation marocaine. Tout litige lié à son utilisation relève des juridictions marocaines compétentes. En cas de divergence entre les versions arabe et française de ce document, la version arabe fait foi pour l'interprétation de la relation contractuelle.",
    },
  },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  return (
    <>
      <LegalPage
        locale={typed}
        title={ui.footer.legal}
        intro={{
          ar: 'معلومات قانونية بشأن ناشر الموقع والنشاط والمسؤوليات والقانون المطبق.',
          fr: "Informations légales relatives à l'éditeur du site, aux activités, aux responsabilités et au droit applicable.",
        }}
        sections={sections}
        crumb={t(ui.footer.legal, typed)}
      />
      <LegalFootnote locale={typed} />
    </>
  );
}
