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
    title: t(ui.footer.privacy, locale),
    description: t(ui.footer.privacy, locale),
    alternates: {
      canonical: `/${locale}/confidentialite`,
      languages: {
        ar: '/ar/confidentialite',
        fr: '/fr/confidentialite',
        'x-default': '/ar/confidentialite',
      },
    },
  };
}

const sections: LegalSection[] = [
  {
    h: { ar: 'المبادئ العامة', fr: 'Principes généraux' },
    p: {
      ar: 'نحترم خصوصيتك ونلتزم بحماية معطياتك الشخصية وفق القانون المغربي 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي. نجمع الحد الأدنى الضروري من المعلومات، ولا نبيعها ولا نشاركها مع أي طرف ثالث لأغراض تجارية.',
      fr: "Nous respectons votre vie privée et protégeons vos données personnelles conformément à la loi marocaine 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Nous collectons le minimum nécessaire et ne vendons ni ne partageons vos informations à des fins commerciales.",
    },
  },
  {
    h: { ar: 'المعطيات التي نجمعها', fr: 'Données collectées' },
    p: {
      ar: 'نجمع نوعين من المعلومات: (1) المعلومات التي تُدخلها بنفسك في نموذج الاتصال، وهي الاسم، البريد الإلكتروني، الهاتف، المدينة، الموضوع ومحتوى الرسالة. (2) معلومات تقنية تلقائية محدودة مثل عنوان IP وسجل الخادم لأغراض الأمن ومنع الإساءة. لا نطلب أبدًا معلومات بنكية أو وثائق هوية عبر الموقع.',
      fr: "Nous collectons deux catégories d'informations : (1) celles que vous saisissez dans le formulaire de contact — nom, e-mail, téléphone, ville, sujet et contenu du message ; (2) des informations techniques limitées, comme l'adresse IP et les journaux serveur, à des fins de sécurité et de prévention des abus. Nous ne demandons jamais d'informations bancaires ni de documents d'identité via le site.",
    },
  },
  {
    h: { ar: 'أغراض المعالجة', fr: 'Finalités du traitement' },
    p: {
      ar: 'تُستعمل معطياتك فقط من أجل: الرد على طلبك وإعداد عرض سعر، التواصل معك بخصوص المشروع، إرسال النشرة البريدية إذا اشتركت فيها صراحة، والامتثال للالتزامات القانونية والمحاسبية. لا نستعمل معطياتك في التسويق الآلي دون موافقتك الصريحة.',
      fr: "Vos données servent uniquement à : répondre à votre demande et établir un devis, vous contacter au sujet du projet, vous envoyer la newsletter si vous y avez expressément souscrit, et respecter nos obligations légales et comptables. Nous ne les utilisons pas pour du marketing automatisé sans votre accord explicite.",
    },
  },
  {
    h: { ar: 'مدة الحفظ', fr: 'Durée de conservation' },
    p: {
      ar: 'نحفظ معطيات طلبات الاتصال لمدة أقصاها ثلاث سنوات من آخر تواصل، ثم تُحذف أو تُجعل مجهولة الهوية. تُحفظ الوثائق المحاسبية والفواتير للمدة القانونية الإلزامية. اشتراك النشرة البريدية يبقى ساريًا إلى حين إلغائه من طرفك.',
      fr: "Les données issues des demandes de contact sont conservées trois ans au maximum après le dernier échange, puis supprimées ou anonymisées. Les documents comptables et factures sont conservés pendant la durée légale obligatoire. L'abonnement à la newsletter reste actif jusqu'à sa résiliation de votre part.",
    },
  },
  {
    h: { ar: 'حقوقك', fr: 'Vos droits' },
    p: {
      ar: `لك الحق في الوصول إلى معطياتك وتصحيحها وحذفها، والاعتراض على معالجتها، وطلب نقلها. لممارسة أي من هذه الحقوق، راسلنا على ${site.email} وسنستجيب خلال مدة أقصاها شهر واحد. كما يمكنك تقديم شكاية إلى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP).`,
      fr: `Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de vos données. Pour exercer ces droits, écrivez-nous à ${site.email} : nous répondons dans un délai maximum d'un mois. Vous pouvez également saisir la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).`,
    },
  },
  {
    h: { ar: 'ملفات تعريف الارتباط (Cookies)', fr: 'Cookies' },
    p: {
      ar: 'يستعمل الموقع ملفات تعريف ارتباط ضرورية لتشغيل الوظائف الأساسية مثل تذكّر اختيارك بشأن الكوكيز وتفضيل اللغة. لا نستعمل حاليًا كوكيز تتبّع إعلانية أو تحليلات طرف ثالث. يمكنك حذف الكوكيز في أي وقت من إعدادات المتصفح، مع العلم أن ذلك يعيد عرض لافتة الكوكيز عند زيارتك القادمة.',
      fr: "Le site utilise des cookies nécessaires à son fonctionnement, comme la mémorisation de votre choix concernant les cookies et la préférence de langue. Nous n'utilisons actuellement ni cookie publicitaire de suivi ni analytics tiers. Vous pouvez supprimer les cookies à tout moment depuis votre navigateur ; cela réaffichera simplement la bannière lors de votre prochaine visite.",
    },
  },
  {
    h: { ar: 'أمن المعطيات', fr: 'Sécurité des données' },
    p: {
      ar: 'نتخذ تدابير تقنية وتنظيمية معقولة لحماية معطياتك من الوصول غير المصرّح به أو التغيير أو الضياع: نقل مشفّر عبر HTTPS، تقييد الوصول إلى المعطيات على الموظفين المعنيين فقط، ونسخ احتياطي دوري محدود. لا يوجد نظام آمن بنسبة 100%، ولهذا ننصحك بعدم إرسال معلومات بالغة الحساسية عبر نماذج الموقع.',
      fr: "Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger vos données contre tout accès non autorisé, modification ou perte : transmission chiffrée en HTTPS, accès restreint aux seuls collaborateurs concernés et sauvegardes régulières limitées. Aucun système n'étant sûr à 100 %, nous vous invitons à ne pas transmettre d'informations très sensibles via les formulaires du site.",
    },
  },
  {
    h: { ar: 'التعديلات', fr: 'Modifications' },
    p: {
      ar: 'قد نحدّث هذه السياسة عند تغيّر ممارساتنا أو التشريع. يُنشر أي تعديل على هذه الصفحة مع تحديث تاريخ آخر مراجعة. استمرارك في استعمال الموقع بعد النشر يعني موافقتك على النسخة المحدّثة.',
      fr: "Nous pouvons mettre à jour cette politique en cas d'évolution de nos pratiques ou de la réglementation. Toute modification est publiée sur cette page avec actualisation de la date de dernière révision. La poursuite de l'utilisation du site vaut acceptation de la version mise à jour.",
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
        title={ui.footer.privacy}
        intro={{
          ar: 'كيف نجمع معطياتك الشخصية ونستعملها ونحميها، وما هي حقوقك في هذا الشأن.',
          fr: "Comment nous collectons, utilisons et protégeons vos données personnelles, et quels sont vos droits à cet égard.",
        }}
        sections={sections}
        crumb={t(ui.footer.privacy, typed)}
      />
      <LegalFootnote locale={typed} />
    </>
  );
}
