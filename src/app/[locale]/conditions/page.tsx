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
    title: t(ui.footer.terms, locale),
    description: t(ui.footer.terms, locale),
    alternates: {
      canonical: `/${locale}/conditions`,
      languages: {
        ar: '/ar/conditions',
        fr: '/fr/conditions',
        'x-default': '/ar/conditions',
      },
    },
  };
}

const sections: LegalSection[] = [
  {
    h: { ar: 'قبول الشروط', fr: 'Acceptation des conditions' },
    p: {
      ar: 'يُعدّ استعمالك لهذا الموقع موافقة صريحة على هذه الشروط. إذا لم توافق على أي منها، يُرجى التوقف عن استعمال الموقع. نحتفظ بحق تعديل هذه الشروط في أي وقت، وتصبح النسخة المنشورة نافذة من تاريخ نشرها.',
      fr: "L'utilisation de ce site vaut acceptation expresse des présentes conditions. Si vous n'acceptez pas l'une d'elles, veuillez cesser d'utiliser le site. Nous nous réservons le droit de modifier ces conditions à tout moment : la version publiée entre en vigueur dès sa mise en ligne.",
    },
  },
  {
    h: { ar: 'طبيعة المعلومات المنشورة', fr: 'Nature des informations publiées' },
    p: {
      ar: 'المحتوى المنشور (أوصاف الخدمات، المواصفات التقنية، الصور، الأسعار) ذو طابع إعلامي. الأسعار بالدرهم المغربي وتشمل أو لا تشمل الضريبة حسب ما يُذكر صراحة في عرض السعر. الصور قد تكون توضيحية وقد يختلف المنتج الفعلي في تفاصيل بسيطة حسب الماركة ودفعة التصنيع، ونلتزم دائمًا بتسليم المواصفات المتفق عليها.',
      fr: "Le contenu publié (descriptions de services, spécifications techniques, images, prix) est informatif. Les prix sont exprimés en dirhams marocains, avec ou sans taxe selon ce qui est explicitement indiqué sur le devis. Les photos peuvent être illustratives et le produit réel peut différer dans de petits détails selon la marque et le lot de fabrication ; nous garantissons toujours la livraison des spécifications convenues.",
    },
  },
  {
    h: { ar: 'طلبات عروض الأسعار', fr: 'Demandes de devis' },
    p: {
      ar: 'إرسال نموذج على الموقع لا يُنشئ أي التزام تعاقدي على الطرفين. ينشأ الالتزام فقط بعد دراستنا للمشروع وتسليمنا عرض سعر مكتوب وقبوله من طرفك. نحتفظ بحق رفض أي طلب دون إبداء الأسباب، خصوصًا في حال وجود معطيات ناقصة أو طلب غير مطابق لنشاطنا.',
      fr: "L'envoi d'un formulaire sur le site ne crée aucune obligation contractuelle pour les parties. L'engagement naît uniquement après notre étude du projet, la remise d'un devis écrit et votre acceptation. Nous nous réservons le droit de refuser toute demande sans justification, notamment en cas d'informations incomplètes ou de demande hors de notre domaine d'activité.",
    },
  },
  {
    h: { ar: 'التنفيذ والآجال', fr: 'Exécution et délais' },
    p: {
      ar: 'تُحدَّد آجال التنفيذ في عرض السعر وتُعتبر تقديرية ما لم يُنص صراحة على كونها إلزامية بشرط جزائي. قد تتأثر الآجال بعوامل خارجة عن إرادتنا مثل الأحوال الجوية، تأخر توريد المواد من الموردين، أو تعديل العميل للمخططات. نُخطر العميل كتابيًا بأي تأخير وأسبابه.',
      fr: "Les délais d'exécution figurent sur le devis et sont estimatifs, sauf mention expresse d'un caractère contraignant assorti d'une pénalité. Ils peuvent être affectés par des facteurs indépendants de notre volonté : conditions météorologiques, retard d'approvisionnement des fournisseurs ou modification des plans par le client. Nous informons le client par écrit de tout retard et de ses causes.",
    },
  },
  {
    h: { ar: 'الضمانات بعد التسليم', fr: 'Garanties après livraison' },
    p: {
      ar: 'نمنح ضمانًا على الأشغال لمدة سنة واحدة على الأقل من تاريخ التسليم، يشمل عيوب التنفيذ لا سوء الاستعمال. بالإضافة إلى ضمان المصنّع على المعدات الموردة حسب مدة كل ماركة. لا يشمل الضمان الأعطال الناتجة عن تدخل طرف ثالث، أو تغييرات غير مرخّصة، أو استعمال مخالف للدليل، أو ظروف استثنائية كالصواعق والفيضانات.',
      fr: "Nous garantissons nos travaux au moins un an à compter de la réception, couvrant les défauts d'exécution et non le mauvais usage. S'y ajoute la garantie constructeur sur le matériel fourni, selon la durée propre à chaque marque. La garantie exclut les pannes résultant d'une intervention d'un tiers, de modifications non autorisées, d'un usage non conforme à la notice ou de conditions exceptionnelles telles que la foudre et les inondations.",
    },
  },
  {
    h: { ar: 'الصيانة', fr: 'Maintenance' },
    p: {
      ar: 'الصيانة الدورية مسؤولية المستعمل ما لم يُبرَم عقد صيانة سنوي معنا. عقد الصيانة يحدّد عدد الزيارات الوقائية، مدة التدخل عند الأعطال، والقطع المشمولة. تنبيه: إهمال الصيانة الدورية مثل تنظيف فلاتر المكيف أو صيانة الغلاية قبل الشتاء قد يُسقط ضمان المصنّع.',
      fr: "La maintenance périodique incombe à l'utilisateur, sauf contrat d'entretien annuel conclu avec nous. Ce contrat précise le nombre de visites préventives, le délai d'intervention en cas de panne et les pièces couvertes. Attention : négliger l'entretien courant, comme le nettoyage des filtres de climatisation ou l'entretien de la chaudière avant l'hiver, peut annuler la garantie constructeur.",
    },
  },
  {
    h: { ar: 'الأداء والفواتير', fr: 'Paiement et facturation' },
    p: {
      ar: 'تُحدَّد طريقة الأداء في عرض السعر: عادة دفعة مقدّمة عند بدء الأشغال، دفعات متوسطة حسب تقدّم المشروع، ورصيد نهائي عند التسليم. تُسلَّم الفواتير الرسمية عن كل دفعة. أي تأخر في الأداء قد يؤدي إلى تعليق الأشغال بعد إشعار كتابي.',
      fr: "Les modalités de règlement figurent sur le devis : généralement un acompte au démarrage, des situations intermédiaires selon l'avancement et un solde à la réception. Une facture officielle est remise pour chaque versement. Tout retard de paiement peut entraîner la suspension des travaux après notification écrite.",
    },
  },
  {
    h: { ar: 'التواصل والشكايات', fr: 'Contact et réclamations' },
    p: {
      ar: `لأي شكاية أو استفسار بخصوص هذه الشروط، تواصل معنا على ${site.email} أو ${site.phoneDisplay}. نسعى إلى معالجة كل شكاية في مدة أقصاها 15 يوم عمل، وإلى إيجاد حل ودي قبل أي مسار قضائي.`,
      fr: `Pour toute réclamation ou question relative à ces conditions, contactez-nous à ${site.email} ou au ${site.phoneDisplay}. Nous traitons chaque réclamation dans un délai maximum de 15 jours ouvrés et recherchons une solution amiable avant toute action judiciaire.`,
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
        title={ui.footer.terms}
        intro={{
          ar: 'الشروط المنظّمة لاستعمال الموقع وللعلاقة معنا في طلبات عروض الأسعار وتنفيذ الأشغال والضمان والصيانة.',
          fr: "Conditions encadrant l'utilisation du site et notre relation dans les demandes de devis, l'exécution des travaux, la garantie et la maintenance.",
        }}
        sections={sections}
        crumb={t(ui.footer.terms, typed)}
      />
      <LegalFootnote locale={typed} />
    </>
  );
}
