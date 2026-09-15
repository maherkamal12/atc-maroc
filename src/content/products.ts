import type { Localized } from '@/lib/i18n';

export type ProductCategory = {
  slug: string;
  icon: string;
  image: string;
  title: Localized;
  short: Localized;
  intro: Localized;
  highlights: Localized[];
};

export type SpecRow = { label: Localized; value: Localized };

export type Product = {
  slug: string;
  category: string;
  name: Localized;
  brand: string;
  image: string;
  /** Price in Moroccan dirhams. `null` means "prix sur demande". */
  price: number | null;
  oldPrice?: number;
  short: Localized;
  description: Localized;
  specs: SpecRow[];
  tags: Array<'new' | 'promo' | 'bestseller'>;
  inStock: boolean;
  warrantyMonths: number;
  rating: number;
};

export const productCategories: ProductCategory[] = [
  {
    slug: 'equipements-electriques',
    icon: 'Zap',
    image: '/images/products/cat-electrique.jpg',
    title: { ar: 'معدات كهربائية', fr: 'Équipements électriques' },
    short: {
      ar: 'لوحات، قواطع، كابلات، مآخذ، إنارة وتجهيزات حماية من ماركات عالمية معتمدة.',
      fr: 'Tableaux, disjoncteurs, câbles, prises, éclairage et protections de marques mondiales certifiées.',
    },
    intro: {
      ar: 'كل ما يلزم لتنفيذ منشأة كهربائية آمنة ومطابقة للمعايير: لوحات توزيع مجمّعة، قواطع تفاضلية، كابلات نحاسية، مآخذ ومفاتيح، إنارة LED، وملحقات التأريض. نوفّر منتجات أصلية مع ضمان المصنّع ونصائح فنية حول الاختيار الصحيح.',
      fr: "Tout le nécessaire pour une installation électrique sûre et conforme : tableaux de distribution assemblés, disjoncteurs différentiels, câbles cuivre, prises et interrupteurs, éclairage LED et accessoires de mise à la terre. Nous fournissons des produits d'origine avec garantie constructeur et conseils techniques sur le bon choix.",
    },
    highlights: [
      { ar: 'ماركات أوروبية معتمدة', fr: 'Marques européennes certifiées' },
      { ar: 'توافق مع NF C 15-100', fr: 'Conformité NF C 15-100' },
      { ar: 'ضمان المصنّع الأصلي', fr: 'Garantie constructeur d’origine' },
      { ar: 'توفّر قطع الغيار', fr: 'Disponibilité des pièces' },
    ],
  },
  {
    slug: 'equipements-plomberie',
    icon: 'Droplets',
    image: '/images/products/cat-plomberie.jpg',
    title: { ar: 'معدات السباكة', fr: 'Équipements de plomberie' },
    short: {
      ar: 'أنابيب PPR و PEX، مضخات، سخانات، خلاطات وأطقم حمامات من ماركات موثوقة.',
      fr: 'Tubes PPR et PEX, pompes, chauffe-eau, mitigeurs et ensembles sanitaires de marques fiables.',
    },
    intro: {
      ar: 'معدات شبكات المياه من التغذية إلى التصريف: أنابيب وأوصال PPR و PEX المعتمدة لمياه الشرب، مضخات رفع الضغط، سخانات ماء، مرشحات، خلاطات وأطقم حمامات كاملة. كل المنتجات مختارة لمقاومتها للكلس ومطابقتها للمعايير الأوروبية.',
      fr: "Équipements pour réseaux d'eau, de l'alimentation à l'évacuation : tubes et raccords PPR et PEX certifiés eau potable, pompes de surpression, chauffe-eau, filtres, mitigeurs et ensembles sanitaires complets. Tous les produits sont sélectionnés pour leur résistance au calcaire et leur conformité aux normes européennes.",
    },
    highlights: [
      { ar: 'مواد صالحة لمياه الشرب', fr: 'Matériaux aptes eau potable' },
      { ar: 'مقاومة للكلس والضغط', fr: 'Résistance au calcaire et à la pression' },
      { ar: 'قطع ربط وملحقات كاملة', fr: 'Raccords et accessoires complets' },
      { ar: 'ضمان يصل إلى 10 سنوات', fr: "Garantie jusqu'à 10 ans" },
    ],
  },
  {
    slug: 'appareils-climatisation',
    icon: 'Wind',
    image: '/images/products/cat-clim.jpg',
    title: { ar: 'أجهزة التكييف', fr: 'Appareils de climatisation' },
    short: {
      ar: 'سبليت إنفرتر، مجاري، كاسيت، وأنظمة متعددة الوحدات بأعلى تصنيفات الطاقة.',
      fr: 'Split inverter, gainables, cassettes et multi-splits aux meilleurs classements énergétiques.',
    },
    intro: {
      ar: 'أجهزة تكييف بمعاملات مردود عالية (SEER/SCOP ممتازة)، بغاز التبريد R32 الصديق للبيئة، مع تشغيل هادئ وفلاتر متعددة المراحل. نختار الماركات المتوفرة قطع غيارها في المغرب لضمان خدمة ما بعد البيع الحقيقية.',
      fr: "Des climatiseurs à haut rendement (SEER/SCOP excellents), utilisant le fluide R32 respectueux de l'environnement, avec fonctionnement silencieux et filtres multi-étages. Nous sélectionnons des marques dont les pièces de rechange sont disponibles au Maroc, pour un vrai service après-vente.",
    },
    highlights: [
      { ar: 'تقنية إنفرتر موفرة', fr: 'Technologie inverter économe' },
      { ar: 'غاز R32 صديق للبيئة', fr: 'Fluide R32 écologique' },
      { ar: 'ضغط صوتي منخفض', fr: 'Niveau sonore réduit' },
      { ar: 'تركيب وضمان شامل', fr: 'Installation et garantie incluses' },
    ],
  },
  {
    slug: 'systemes-energie-solaire',
    icon: 'Sun',
    image: '/images/products/cat-solaire.jpg',
    title: { ar: 'أنظمة الطاقة الشمسية', fr: "Systèmes d'énergie solaire" },
    short: {
      ar: 'ألواح، عواكس هجينة، بطاريات ليثيوم، هياكل ومستلزمات التركيب.',
      fr: 'Panneaux, onduleurs hybrides, batteries lithium, structures et accessoires de pose.',
    },
    intro: {
      ar: 'مكوّنات أنظمة شمسية عالية الجودة من مصنّعين عالميين: ألواح مونوكريستالية بكفاءة تفوق 21%، عواكس هجينة بمتابعة عن بعد، بطاريات ليثيوم LiFePO4 بأكثر من 6000 دورة، هياكل ألومنيوم مقاومة للتآكل، وملحقات كهربائية مخصّصة للتيار المستمر.',
      fr: "Composants solaires de haute qualité de fabricants mondiaux : panneaux monocristallins à plus de 21 % de rendement, onduleurs hybrides avec supervision à distance, batteries lithium LiFePO4 à plus de 6 000 cycles, structures aluminium anticorrosion et accessoires électriques dédiés au courant continu.",
    },
    highlights: [
      { ar: 'ضمان خطي 25 سنة على الألواح', fr: 'Garantie linéaire 25 ans sur les panneaux' },
      { ar: 'عواكس بضمان 10 سنوات', fr: 'Onduleurs garantis 10 ans' },
      { ar: 'مراقبة الإنتاج عن بعد', fr: 'Supervision de production à distance' },
      { ar: 'دراسة تركيب مجانية', fr: 'Étude de pose offerte' },
    ],
  },
  {
    slug: 'appareils-electromenagers',
    icon: 'Refrigerator',
    image: '/images/products/cat-electromenager.jpg',
    title: { ar: 'أجهزة منزلية', fr: 'Appareils électroménagers' },
    short: {
      ar: 'ثلاجات، غسالات، سخانات، أفران وشفاطات موفرة للطاقة من ماركات موثوقة.',
      fr: 'Réfrigérateurs, lave-linge, chauffe-eau, fours et hottes économes en énergie, de marques fiables.',
    },
    intro: {
      ar: 'أجهزة منزلية مختارة بمعيارين: تصنيف طاقي مرتفع وعمر تشغيلي طويل. نوفّر التركيب والتوصيل والضبط الأولي، مع خدمة ما بعد البيع والضمان الرسمي لكل جهاز.',
      fr: "Des appareils électroménagers sélectionnés selon deux critères : un bon classement énergétique et une longue durée de vie. Nous assurons la livraison, le raccordement, la mise en service, ainsi que le SAV et la garantie officielle de chaque appareil.",
    },
    highlights: [
      { ar: 'تصنيف طاقي A++ وأعلى', fr: 'Classe énergétique A++ et mieux' },
      { ar: 'توصيل وتركيب مجاني بطنجة', fr: 'Livraison et pose offertes à Tanger' },
      { ar: 'ضمان رسمي للوكيل', fr: 'Garantie officielle du distributeur' },
      { ar: 'قطع غيار متوفرة', fr: 'Pièces de rechange disponibles' },
    ],
  },
];

const inStock = { ar: 'متوفر في المخزون', fr: 'En stock' };
const onOrder = { ar: 'متوفر عند الطلب', fr: 'Disponible sur commande' };
const piece = { ar: 'الوحدة', fr: "l'unité" };
const kit = { ar: 'المجموعة', fr: 'le kit' };

function availability(flag: boolean): Localized {
  return flag ? inStock : onOrder;
}

export const products: Product[] = [
  /* ------------------------- Équipements électriques ------------------------ */
  {
    slug: 'tableau-distribution-24-modules',
    category: 'equipements-electriques',
    name: { ar: 'لوحة توزيع كهربائية 24 وحدة', fr: 'Tableau de distribution 24 modules' },
    brand: 'Schneider Electric',
    image: '/images/products/tableau-distribution.jpg',
    price: 1450,
    oldPrice: 1690,
    short: {
      ar: 'لوحة مجمّعة وجاهزة للتركيب بقاطع تفاضلي 30mA وحمايات للدارات الرئيسية.',
      fr: 'Tableau assemblé prêt à poser, avec différentiel 30 mA et protections des circuits principaux.',
    },
    description: {
      ar: 'لوحة توزيع معدنية بمرتبة DIN كاملة، مصمّمة لتلبية احتياجات الشقق والمنازل الصغيرة والمتوسطة. تأتي مجمّعة ومختبرة مع قاطع تفاضلي 2P 40A / 30mA للحماية من التسرب الأرضي، وقواطع فرعية للدارات: الإضاءة، المآخذ، المطبخ، السخان والمكيف. الباب شفاف لسهولة القراءة، والترتيب الداخلي منظّم ليسهل إضافة دارات مستقبلًا.',
      fr: "Tableau de distribution métallique avec goulotte DIN complète, conçu pour les appartements et petites maisons. Il est livré assemblé et testé, avec un interrupteur différentiel 2P 40 A / 30 mA contre les fuites à la terre et des disjoncteurs divisionnaires pour l'éclairage, les prises, la cuisine, le chauffe-eau et la climatisation. Porte transparente pour une lecture facile et agencement intérieur ordonné facilitant l'ajout de circuits futurs.",
    },
    specs: [
      { label: { ar: 'عدد الوحدات', fr: 'Nombre de modules' }, value: { ar: '24 وحدة', fr: '24 modules' } },
      { label: { ar: 'القاطع التفاضلي', fr: 'Différentiel' }, value: { ar: '2P 40A / 30mA', fr: '2P 40 A / 30 mA' } },
      { label: { ar: 'درجة الحماية', fr: 'Indice de protection' }, value: { ar: 'IP40', fr: 'IP 40' } },
      { label: { ar: 'الجهد المعياري', fr: 'Tension nominale' }, value: { ar: '230/400 فولط', fr: '230/400 V' } },
      { label: { ar: 'مادة الجسم', fr: 'Matière' }, value: { ar: 'فولاذ مطلي + باب شفاف', fr: 'Acier traité + porte transparente' } },
      { label: { ar: 'التركيب', fr: 'Montage' }, value: { ar: 'مدمج أو بارز', fr: 'Encastré ou saillie' } },
    ],
    tags: ['promo', 'bestseller'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.8,
  },
  {
    slug: 'cable-cuivre-2-5mm',
    category: 'equipements-electriques',
    name: { ar: 'كابل نحاسي 3×2.5 مم²', fr: 'Câble cuivre 3×2,5 mm²' },
    brand: 'Nexans',
    image: '/images/products/cable-cuivre.jpg',
    price: 38,
    short: {
      ar: 'كابل نحاسي صافي معزول بغلاف PVC، للدارات الرئيسية والمآخذ.',
      fr: 'Câble cuivre pur isolé PVC, pour circuits principaux et prises.',
    },
    description: {
      ar: 'كابل كهربائي بنحاس أحمر صافٍ بنسبة نقاء عالية، معزول بغلاف PVC مقاوم للحرارة حتى 70°م وجهد اسمي 750 فولط. مخصّص لدارات المآخذ والدارات الرئيسية المدمجة في الأنابيب أو تحت الجبس. يُسلَّم باللون القياسي (بني/أزرق/أخضر-أصفر) مع إمكانية الاختيار حسب الطلب.',
      fr: "Câble électrique en cuivre rouge pur à haut degré de pureté, isolé PVC résistant jusqu'à 70 °C et de tension nominale 750 V. Destiné aux circuits de prises et aux circuits principaux encastrés en gaine ou sous enduit. Livré en couleurs normalisées (marron / bleu / vert-jaune), avec possibilité de choix à la commande.",
    },
    specs: [
      { label: { ar: 'المقطع', fr: 'Section' }, value: { ar: '2.5 مم²', fr: '2,5 mm²' } },
      { label: { ar: 'عدد الموصلات', fr: 'Nombre de conducteurs' }, value: { ar: '3 (طور + محايد + أرضي)', fr: '3 (phase + neutre + terre)' } },
      { label: { ar: 'الجهد', fr: 'Tension' }, value: { ar: '750 فولط', fr: '750 V' } },
      { label: { ar: 'حرارة الاستعمال', fr: 'Température de service' }, value: { ar: 'حتى 70 °م', fr: "jusqu'à 70 °C" } },
      { label: { ar: 'التيار الأقصى', fr: 'Intensité admissible' }, value: { ar: '20 أمبير', fr: '20 A' } },
      { label: { ar: 'التسليم', fr: 'Conditionnement' }, value: { ar: 'لفّة 100 متر', fr: 'Couronne de 100 m' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 12,
    rating: 4.7,
  },
  {
    slug: 'spot-led-encastrable',
    category: 'equipements-electriques',
    name: { ar: 'سبوت LED مدمج 7 واط', fr: 'Spot LED encastrable 7 W' },
    brand: 'Legrand',
    image: '/images/products/spot-led.jpg',
    price: 65,
    short: {
      ar: 'إضاءة LED مدمجة بزاوية واسعة ولون أبيض دافئ، توفّر حتى 85% من الطاقة.',
      fr: 'Éclairage LED encastré grand angle, blanc chaud, jusqu’à 85 % d’économie d’énergie.',
    },
    description: {
      ar: 'سبوت LED مدمج في السقف بحلقة دوران، معطي لوني عالٍ (CRI>80) يجعل الألوان تبدو طبيعية. يمنح 630 لومن مقابل 7 واط فقط، أي ما يعادل مصباح هالوجين 50 واط، بعمر تشغيلي يصل إلى 25.000 ساعة. مناسب للأسقف المستعارة في الصالونات والممرات والمحلات التجارية.',
      fr: "Spot LED encastrable au plafond avec collerette orientable et indice de rendu des couleurs élevé (CRI > 80) restituant des couleurs naturelles. Il délivre 630 lumens pour seulement 7 W, soit l’équivalent d’une ampoule halogène de 50 W, avec une durée de vie allant jusqu’à 25 000 heures. Idéal pour les faux plafonds de salons, couloirs et commerces.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '7 واط', fr: '7 W' } },
      { label: { ar: 'التدفق الضوئي', fr: 'Flux lumineux' }, value: { ar: '630 لومن', fr: '630 lm' } },
      { label: { ar: 'حرارة اللون', fr: 'Température de couleur' }, value: { ar: '3000 كلفن (أبيض دافئ)', fr: '3 000 K (blanc chaud)' } },
      { label: { ar: 'زاوية الإضاءة', fr: 'Angle d’éclairage' }, value: { ar: '100 درجة', fr: '100°' } },
      { label: { ar: 'عمر التشغيل', fr: 'Durée de vie' }, value: { ar: '25.000 ساعة', fr: '25 000 heures' } },
      { label: { ar: 'قطر القص', fr: 'Diamètre de découpe' }, value: { ar: '75 مم', fr: '75 mm' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.6,
  },
  {
    slug: 'prise-2p-t-avec-terre',
    category: 'equipements-electriques',
    name: { ar: 'مأخذ 2P+T مؤرَّض مع إطار', fr: 'Prise 2P+T avec plaque' },
    brand: 'Schneider Electric',
    image: '/images/products/prise.jpg',
    price: 48,
    short: {
      ar: 'مأخذ مؤرَّض 16 أمبير بآلية محمية ضد العبث، متوافق مع المعيار المغربي.',
      fr: 'Prise de terre 16 A à alvéoles protégées, conforme à la norme marocaine.',
    },
    description: {
      ar: 'مأخذ جداري مؤرَّض 2P+T بشدة 16 أمبير وتصميم أنيق بإطار أبيض. الآلية مزوّدة بحماية ضد إدخال الأشياء في الأقطاب (مهم للأطفال)، وربط سريع بالأسلاك بدون براغي للتركيب الأسرع. يتوافق مع الصناديق المعيارية 60 مم المستعملة في المغرب.',
      fr: "Prise murale 2P+T de 16 A au design soigné avec plaque blanche. Le mécanisme est équipé d’obturateurs protégeant les alvéoles (essentiel avec des enfants) et d’un raccordement rapide sans vis pour une pose plus rapide. Compatible avec les boîtes d’encastrement standard de 60 mm utilisées au Maroc.",
    },
    specs: [
      { label: { ar: 'الشدة', fr: 'Intensité' }, value: { ar: '16 أمبير', fr: '16 A' } },
      { label: { ar: 'الجهد', fr: 'Tension' }, value: { ar: '250 فولط', fr: '250 V' } },
      { label: { ar: 'النوع', fr: 'Type' }, value: { ar: '2P+T مع أطفال حماية', fr: '2P+T avec obturateurs' } },
      { label: { ar: 'التركيب', fr: 'Montage' }, value: { ar: 'مدمج، صندوق 60 مم', fr: 'Encastré, boîte 60 mm' } },
      { label: { ar: 'اللون', fr: 'Couleur' }, value: { ar: 'أبيض', fr: 'Blanc' } },
      { label: { ar: 'المعيار', fr: 'Norme' }, value: { ar: 'NM / CE', fr: 'NM / CE' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 12,
    rating: 4.5,
  },
  {
    slug: 'kit-terre-complet',
    category: 'equipements-electriques',
    name: { ar: 'مجموعة تأريض كاملة', fr: 'Kit de mise à la terre complet' },
    brand: 'ATC Pro',
    image: '/images/products/kit-terre.jpg',
    price: 890,
    short: {
      ar: 'وتد نحاسي، كابل أخضر-أصفر، صندوق فحص ومشابك، لجهد تأريض مطابق.',
      fr: 'Piquet cuivre, câble vert-jaune, regard de visite et connecteurs pour une terre conforme.',
    },
    description: {
      ar: 'مجموعة كاملة لتنفيذ تأريض مطابق للمعايير: وتد نحاسي بطول متر ونصف، كابل أخضر-أصفر 16 مم²، صندوق فحص أرضي بغطاء، ومشابك ربط نحاسية. ضرورية لحماية الأرواح من التسرب الكهربائي وحماية الأجهزة من التلف. نقوم بالتركيب والقياس مع تقرير مقاومة التأريض.',
      fr: "Kit complet pour une mise à la terre conforme : piquet cuivre d’un mètre cinquante, câble vert-jaune 16 mm², regard de visite avec couvercle et connecteurs cuivre. Indispensable pour protéger les personnes contre les fuites électriques et les équipements contre les détériorations. Nous assurons la pose et la mesure avec rapport de résistance de terre.",
    },
    specs: [
      { label: { ar: 'طول الوتد', fr: 'Longueur du piquet' }, value: { ar: '1.5 متر', fr: '1,5 m' } },
      { label: { ar: 'المقطع', fr: 'Section du câble' }, value: { ar: '16 مم²', fr: '16 mm²' } },
      { label: { ar: 'اللون التنظيمي', fr: 'Couleur normalisée' }, value: { ar: 'أخضر-أصفر', fr: 'Vert-jaune' } },
      { label: { ar: 'المقاومة المستهدفة', fr: 'Résistance cible' }, value: { ar: 'أقل من 10 أوم', fr: 'Inférieure à 10 Ω' } },
      { label: { ar: 'المحتوى', fr: 'Contenu' }, value: { ar: 'وتد + كابل + صندوق + مشابك', fr: 'Piquet + câble + regard + connecteurs' } },
      { label: { ar: 'القياس', fr: 'Mesure' }, value: { ar: 'مشمول مع التقرير', fr: 'Incluse avec rapport' } },
    ],
    tags: ['new'],
    inStock: true,
    warrantyMonths: 12,
    rating: 4.9,
  },
  {
    slug: 'camera-surveillance-4mp',
    category: 'equipements-electriques',
    name: { ar: 'كاميرا مراقبة 4MP خارجية', fr: 'Caméra de surveillance 4 MP extérieure' },
    brand: 'Hikvision',
    image: '/images/products/camera.jpg',
    price: null,
    short: {
      ar: 'كاميرا IP بدقة 4 ميغابيكسل، رؤية ليلية ملونة وتصوير مقاوم للعوامل الجوية.',
      fr: 'Caméra IP 4 Mpx, vision nocturne couleur et boîtier résistant aux intempéries.',
    },
    description: {
      ar: 'كاميرا IP خارجية بدقة 4 ميغابيكسل (2560×1440) وعدسة واسعة 2.8 مم. تعمل بالرؤية الليلية الملونة حتى 30 مترًا، وتكتشف الحركة البشرية وتفرّقها عن حركة الحيوانات أو الأشجار لتقليل الإنذارات الكاذبة. هيكل معدني بمقاومة IP67 يعمل في كل الظروف، مع إمكانية التخزين على الكارت أو على مسجّل الشبكة.',
      fr: "Caméra IP extérieure 4 Mpx (2560 × 1440) avec objectif grand angle de 2,8 mm. Vision nocturne couleur jusqu’à 30 mètres, détection de mouvement humaine distinguant les personnes des animaux ou des arbres afin de réduire les fausses alertes. Boîtier métallique IP67 fonctionnant dans toutes les conditions, avec stockage sur carte ou sur enregistreur réseau.",
    },
    specs: [
      { label: { ar: 'الدقة', fr: 'Résolution' }, value: { ar: '4 ميغابيكسل', fr: '4 Mpx' } },
      { label: { ar: 'البكسل الفعلي', fr: 'Pixels effectifs' }, value: { ar: '2560 × 1440', fr: '2560 × 1440' } },
      { label: { ar: 'الرؤية الليلية', fr: 'Vision nocturne' }, value: { ar: 'حتى 30 مترًا', fr: "jusqu'à 30 m" } },
      { label: { ar: 'درجة الحماية', fr: 'Indice de protection' }, value: { ar: 'IP67', fr: 'IP 67' } },
      { label: { ar: 'التخزين', fr: 'Stockage' }, value: { ar: 'كارت microSD حتى 256 GB', fr: "microSD jusqu'à 256 Go" } },
      { label: { ar: 'الاتصال', fr: 'Connectivité' }, value: { ar: 'Ethernet + تطبيق الهاتف', fr: 'Ethernet + application mobile' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.6,
  },

  /* -------------------------- Équipements plomberie ------------------------ */
  {
    slug: 'pompe-surpression-1cv',
    category: 'equipements-plomberie',
    name: { ar: 'مضخة رفع ضغط 1 حصان', fr: 'Pompe de surpression 1 CV' },
    brand: 'Pedrollo',
    image: '/images/products/pompe.jpg',
    price: 2350,
    short: {
      ar: 'مضخة ذاتية الشفط مع مخزن ضغط، تضمن ضغطًا مستقرًا في كل الطوابق.',
      fr: 'Pompe auto-amorçante avec réservoir à vessie, pression stable à tous les étages.',
    },
    description: {
      ar: 'مجموعة ضخ ذاتية الشفط بقدرة 1 حصان ومخزن ضغط 24 لترًا، مصمّمة لتأمين ضغط الماء المستقر في المنازل والفيلات متعددة الطوابق. تعمل تلقائيًا عند فتح الصنبور بفضل مفتاح الضغط المدمج، ومجهّزة بحماية من التشغيل الجاف (marche à sec) التي تحمي المضخة من التلف. جسم مضخة من الفولاذ المقاوم للصدأ ودفاعة نحاسية.',
      fr: "Groupe de surpression auto-amorçant de 1 CV avec réservoir à vessie de 24 litres, conçu pour assurer une pression d'eau stable dans les maisons et villas à plusieurs niveaux. Il démarre automatiquement à l'ouverture d'un robinet grâce au pressostat intégré et intègre une protection contre la marche à sec. Corps de pompe en acier inoxydable et turbine en laiton.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '0.75 كيلوواط (1 حصان)', fr: '0,75 kW (1 CV)' } },
      { label: { ar: 'التدفق الأقصى', fr: 'Débit maximal' }, value: { ar: '60 لتر/دقيقة', fr: '60 l/min' } },
      { label: { ar: 'علو الرفع', fr: 'Hauteur manométrique' }, value: { ar: 'حتى 45 مترًا', fr: "jusqu'à 45 m" } },
      { label: { ar: 'مخزن الضغط', fr: 'Réservoir' }, value: { ar: '24 لترًا', fr: '24 litres' } },
      { label: { ar: 'الطاقة', fr: 'Alimentation' }, value: { ar: '230 فولط أحادي', fr: '230 V monophasé' } },
      { label: { ar: 'الحمايات', fr: 'Protections' }, value: { ar: 'ضغط + تشغيل جاف', fr: 'Pressostat + marche à sec' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.8,
  },
  {
    slug: 'chauffe-eau-100l',
    category: 'equipements-plomberie',
    name: { ar: 'سخان ماء كهربائي 100 لتر', fr: 'Chauffe-eau électrique 100 L' },
    brand: 'Ariston',
    image: '/images/products/chauffe-eau.jpg',
    price: 2890,
    oldPrice: 3250,
    short: {
      ar: 'سخان بمخزن مينا مزدوج المقاومة وتنظيم حراري دقيق لاقتصاد الكهرباء.',
      fr: 'Ballon à double émail et régulation précise pour maîtriser la consommation.',
    },
    description: {
      ar: 'سخان ماء كهربائي بسعة 100 لتر مناسب لعائلة من 3 إلى 4 أشخاص (حمام واحد + مطبخ). المخزن الداخلي مطلي بالمينا الزجاجية على طبقتين لمقاومة الكلس، مع أنود مغنيزيوم يمنع التآكل. المقاومة مطلية ومحمية بثرموستات قابل للضبط من 40 إلى 75 درجة، وعزل رغوي كثيف عالي الكثافة يقلل الفقد الحراري حتى في فصل الشتاء.',
      fr: "Chauffe-eau électrique de 100 litres adapté à une famille de 3 à 4 personnes (une salle de bains + cuisine). La cuve intérieure est émaillée en deux couches pour résister au calcaire, avec anode magnésium anti-corrosion. La résistance est blindée et protégée par un thermostat réglable de 40 à 75 °C, et l'isolation en mousse haute densité limite les pertes thermiques même en hiver.",
    },
    specs: [
      { label: { ar: 'السعة', fr: 'Capacité' }, value: { ar: '100 لتر', fr: '100 litres' } },
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '1800 واط', fr: '1 800 W' } },
      { label: { ar: 'الجهد', fr: 'Tension' }, value: { ar: '230 فولط', fr: '230 V' } },
      { label: { ar: 'الضغط الأقصى', fr: 'Pression maximale' }, value: { ar: '8 بار', fr: '8 bars' } },
      { label: { ar: 'الحماية', fr: 'Protection' }, value: { ar: 'أنود مغنيزيوم + ثرموستات', fr: 'Anode magnésium + thermostat' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '5 سنوات على المخزن', fr: '5 ans sur la cuve' } },
    ],
    tags: ['promo', 'bestseller'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.7,
  },
  {
    slug: 'mitigeur-cuisine-col-de-cygne',
    category: 'equipements-plomberie',
    name: { ar: 'خلاط مطبخ عالي بذراع دوّار', fr: 'Mitigeur de cuisine à col de cygne' },
    brand: 'Grohe',
    image: '/images/products/mitigeur.jpg',
    price: 1180,
    short: {
      ar: 'خلاط كروم مقاوم للكلس مع كارتوش ألماني وسهولة تنظيف الفتحة.',
      fr: 'Mitigeur chromé anti-calcaire, cartouche céramique allemande et mousseur facile à nettoyer.',
    },
    description: {
      ar: 'خلاط مطبخ بذراع عالي دوّار 360 درجة من الكروم اللامع المقاوم للصدأ، مناسب للأحواض ذات الحافة العالية ولتجمعات الأحواض المزدوجة. الكارتوش السيراميكي 35 مم مصنوع في ألمانيا ويضمن تحكمًا ناعمًا ودقيقًا في درجة الحرارة دون تنقيط. الفتحة مزوّدة بمصفاة مقاومة للكلس مع نظام تهوية يقلل تدفق الهواء ويوفّر الماء.',
      fr: "Mitigeur de cuisine à col haut orientable à 360° en chrome poli résistant à la corrosion, adapté aux éviers à rebord haut et aux cuves doubles. La cartouche céramique de 35 mm fabriquée en Allemagne garantit un réglage souple et précis de la température, sans goutte-à-goutte. Le bec est équipé d'un mousseur anti-calcaire avec aération réduisant le débit et économisant l'eau.",
    },
    specs: [
      { label: { ar: 'المادة', fr: 'Matière' }, value: { ar: 'نحاس مطلي كروم', fr: 'Laiton chromé' } },
      { label: { ar: 'الكارتوش', fr: 'Cartouche' }, value: { ar: 'سيراميك 35 مم', fr: 'Céramique 35 mm' } },
      { label: { ar: 'دوران الذراع', fr: 'Rotation du bec' }, value: { ar: '360 درجة', fr: '360°' } },
      { label: { ar: 'ارتفاع الذراع', fr: 'Hauteur du bec' }, value: { ar: '260 مم', fr: '260 mm' } },
      { label: { ar: 'توفير الماء', fr: 'Économie d’eau' }, value: { ar: 'مهوّى 8 لتر/دقيقة', fr: '8 l/min aéré' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '5 سنوات', fr: '5 ans' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.5,
  },
  {
    slug: 'tube-ppr-25mm',
    category: 'equipements-plomberie',
    name: { ar: 'أنبوب PPR 25 مم للشبكات المدمجة', fr: 'Tube PPR 25 mm pour réseaux encastrés' },
    brand: 'Valrom',
    image: '/images/products/tube-ppr.jpg',
    price: 72,
    short: {
      ar: 'أنبوب بولي بروبيلين معتمد لمياه الشرب، يلحم حراريًا بدون لحام كيميائي.',
      fr: 'Tube polypropylène certifié eau potable, soudé thermiquement sans colle.',
    },
    description: {
      ar: 'أنبوب PPR بقطر 25 مم مخصص لشبكات التغذية المدمجة بالماء البارد والساخن. مقاوم للحرارة حتى 95 درجة وضغط 20 بار، لا يصدأ ولا يتراكم فيه الكلس كالأنابيب المعدنية، ومعتمد للاستعمال في شبكات مياه الشرب. يتم اللحام بآلة خاصة تنصهر فيها الطبقة الذوبانية، ما يعطي وصلة متجانسة أقوى من الأنبوب نفسه.',
      fr: "Tube PPR de 25 mm destiné aux réseaux d'alimentation encastrés, eau froide et eau chaude. Résistant jusqu'à 95 °C et 20 bars, il ne rouille pas et n'accumule pas le calcaire comme les tubes métalliques ; il est certifié pour les réseaux d'eau potable. Le soudage se fait à la thermofusion, donnant une jonction monobloc plus solide que le tube lui-même.",
    },
    specs: [
      { label: { ar: 'القطر الخارجي', fr: 'Diamètre extérieur' }, value: { ar: '25 مم', fr: '25 mm' } },
      { label: { ar: 'الضغط الاسمي', fr: 'Pression nominale' }, value: { ar: '20 بار / 20°م', fr: '20 bars / 20 °C' } },
      { label: { ar: 'حرارة الاستعمال', fr: 'Température d’usage' }, value: { ar: 'حتى 95 °م', fr: "jusqu'à 95 °C" } },
      { label: { ar: 'المادة', fr: 'Matière' }, value: { ar: 'بولي بروبيلين PPR', fr: 'Polypropylène PPR' } },
      { label: { ar: 'اللحام', fr: 'Assemblage' }, value: { ar: 'لحام حراري', fr: 'Thermofusion' } },
      { label: { ar: 'الاستعمال', fr: 'Usage' }, value: { ar: 'مياه شرب معتمدة', fr: 'Eau potable certifiée' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.6,
  },
  {
    slug: 'adoucisseur-demarrage',
    category: 'equipements-plomberie',
    name: { ar: 'جهاز تليين وتنقية المياه', fr: 'Adoucisseur et purificateur d’eau' },
    brand: 'Culligan',
    image: '/images/products/adoucisseur.jpg',
    price: null,
    short: {
      ar: 'يقلل عُسر الماء ويحمي الأجهزة والمبادلات الحرارية من الكلس.',
      fr: 'Réduit la dureté de l’eau et protège les équipements et échangeurs du calcaire.',
    },
    description: {
      ar: 'جهاز تليين بالمبادل الأيوني لإزالة أملاح الكالسيوم والمغنيزيوم المسؤولة عن الكلس. يحمي الأجهزة المنزلية (غسالة، سخان، مضخة التسخين) ويقلل استهلاك الصابون ويعطي إحساسًا أنظف على البشرة. مزوّد بصمام إعادة توليد أوتوماتيكي حسب استهلاك الماء وبخزان ملح مغلق يمنع التلوث. التركيب والضبط حسب عُسر ماء منطقتك.',
      fr: "Adoucisseur à échange d'ions pour éliminer les sels de calcium et de magnésium responsables du calcaire. Il protège les appareils ménagers (lave-linge, chauffe-eau, pompe de chauffage), réduit la consommation de savon et offre une sensation de propreté sur la peau. Équipé d'une vanne de régénération automatique selon la consommation d'eau et d'une saumure fermée anti-contamination. Pose et réglage selon la dureté de votre eau.",
    },
    specs: [
      { label: { ar: 'التقنية', fr: 'Technologie' }, value: { ar: 'مبادل أيوني', fr: 'Échange d’ions' } },
      { label: { ar: 'إعادة التوليد', fr: 'Régénération' }, value: { ar: 'أوتوماتيكية حسب الاستهلاك', fr: 'Automatique selon la consommation' } },
      { label: { ar: 'حجم المعالجة', fr: 'Volume traité' }, value: { ar: 'حسب عُسر الماء', fr: 'Selon la dureté de l’eau' } },
      { label: { ar: 'الضغط المطلوب', fr: 'Pression requise' }, value: { ar: '2 – 6 بار', fr: '2 – 6 bars' } },
      { label: { ar: 'الاستهلاك الكهربائي', fr: 'Consommation électrique' }, value: { ar: 'منخفض جدًا (صمام آلي)', fr: 'Très faible (vanne automatique)' } },
      { label: { ar: 'التركيب', fr: 'Installation' }, value: { ar: 'في مدخل الشبكة أو بجانبها', fr: 'En entrée de réseau ou à proximité' } },
    ],
    tags: [],
    inStock: false,
    warrantyMonths: 24,
    rating: 4.4,
  },
  {
    slug: 'kit-salle-de-bain-complet',
    category: 'equipements-plomberie',
    name: { ar: 'طقم حمام كامل مع دشّ مطري', fr: 'Ensemble salle de bains avec douche pluie' },
    brand: 'Hansgrohe',
    image: '/images/products/salle-bain.jpg',
    price: 4900,
    oldPrice: 5600,
    short: {
      ar: 'طقم كامل: دشّ مطري، خلاط مخفي، معلاق، خزان معلّق ومرحاض.',
      fr: 'Ensemble complet : douche pluie, mitigeur encastré, support, réservoir et WC suspendu.',
    },
    description: {
      ar: 'طقم حمام عصري متكامل يجمع بين الجمال والوظيفة: دشّ مطري بمقاس 25×25 سم مع ذراع قابل للتعديل، خلاط مخفي بمنظم حرارة ضد الحروق، معلاق دش قابل للارتفاع، مسدس صحي (bidet)، وخزان معلّق مع مرحاض مخفي التثبيت. التشطيب كروم لامع متجانس يعطي مظهرًا فندقيًا ويجعل التنظيف أسهل.',
      fr: "Ensemble de salle de bains complet alliant esthétique et fonctionnalité : douche pluie de 25 × 25 cm avec bras réglable, mitigeur encastré thermostatique anti-brûlure, support de douche réglable en hauteur, douchette hygiénique, réservoir encastré et WC suspendu. Finition chrome poli homogène pour un rendu hôtelier et un entretien simplifié.",
    },
    specs: [
      { label: { ar: 'مقاس الدشّ المطري', fr: 'Dimensions douche pluie' }, value: { ar: '25 × 25 سم', fr: '25 × 25 cm' } },
      { label: { ar: 'الخلاط', fr: 'Mitigeur' }, value: { ar: 'مخفي بمنظم حراري', fr: 'Encastré thermostatique' } },
      { label: { ar: 'التشطيب', fr: 'Finition' }, value: { ar: 'كروم لامع', fr: 'Chrome poli' } },
      { label: { ar: 'خزان المرحاض', fr: 'Réservoir WC' }, value: { ar: 'معلّق بمخفي مزدوج الصبة', fr: 'Encastré double chasse' } },
      { label: { ar: 'المحتوى', fr: 'Contenu' }, value: { ar: '7 قطع', fr: '7 pièces' } },
      { label: { ar: 'التركيب', fr: 'Installation' }, value: { ar: 'مشمول بطنجة', fr: 'Incluse à Tanger' } },
    ],
    tags: ['promo'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.8,
  },

  /* --------------------------- Appareils clim ------------------------------ */
  {
    slug: 'split-inverter-12000-btu',
    category: 'appareils-climatisation',
    name: { ar: 'مكيف سبليت إنفرتر 12000 BTU', fr: 'Climatiseur split inverter 12 000 BTU' },
    brand: 'Daikin',
    image: '/images/products/split-12000.jpg',
    price: 6450,
    oldPrice: 7200,
    short: {
      ar: 'تكييف وتدفئة بغاز R32، تصنيف طاقي A++ وتشغيل هادئ جدًا 19 ديسيبل.',
      fr: 'Froid et chaud au R32, classe A++, fonctionnement très silencieux à 19 dB.',
    },
    description: {
      ar: 'مكيف سبليت إنفرتر بقدرة 12000 BTU (3.5 كيلوواط) مناسب لغرفة من 18 إلى 25 مترًا مربعًا. يعمل بالتبريد والتدفئة معًا بغاز R32 الأكثر كفاءة والأقل تأثيرًا على البيئة. تقنية الإنفرتر تعدّل سرعة الضاغط تدريجيًا فلا يوجد صوت بدء التشغيل المزعج، والاستهلاك ينخفض بنسبة تصل إلى 40% مقارنة بالأنظمة العادية. فلتر HEPA يحتفظ بالغبار والغبار الطلعي، ونمط Sleep يضبط الحرارة أثناء النوم.',
      fr: "Climatiseur split inverter de 12 000 BTU (3,5 kW) adapté aux pièces de 18 à 25 m². Il fonctionne en froid et en chaud avec le fluide R32, plus efficace et moins impactant pour l'environnement. La technologie inverter module progressivement la vitesse du compresseur : plus de bruit de démarrage, et une consommation réduite jusqu'à 40 % par rapport aux systèmes classiques. Le filtre HEPA retient poussières et pollens, et le mode Sleep ajuste la température pendant le sommeil.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '12000 BTU / 3.5 كيلوواط', fr: '12 000 BTU / 3,5 kW' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A++', fr: 'A++' } },
      { label: { ar: 'غاز التبريد', fr: 'Fluide frigorigène' }, value: { ar: 'R32', fr: 'R32' } },
      { label: { ar: 'مستوى الصوت', fr: 'Niveau sonore' }, value: { ar: '19 – 34 ديسيبل', fr: '19 – 34 dB' } },
      { label: { ar: 'الغطاء الموصى به', fr: 'Surface conseillée' }, value: { ar: '18 – 25 م²', fr: '18 – 25 m²' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '5 سنوات على الضاغط', fr: '5 ans sur le compresseur' } },
    ],
    tags: ['promo', 'bestseller'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.9,
  },
  {
    slug: 'split-inverter-18000-btu',
    category: 'appareils-climatisation',
    name: { ar: 'مكيف سبليت إنفرتر 18000 BTU', fr: 'Climatiseur split inverter 18 000 BTU' },
    brand: 'LG',
    image: '/images/products/split-18000.jpg',
    price: 8990,
    short: {
      ar: 'استطاعة أكبر للصالونات والمساحات المفتوحة، بتقنية Dual Inverter الموفرة.',
      fr: 'Puissance supérieure pour salons et espaces ouverts, technologie Dual Inverter économe.',
    },
    description: {
      ar: 'مكيف سبليت إنفرتر بقدرة 18000 BTU (5.3 كيلوواط) للصالونات والمساحات المفتوحة من 30 إلى 40 مترًا مربعًا. تقنية الضاغط المزدوج Dual Inverter تصل إلى درجات الحرارة المطلوبة أسرع بـ 40% وتوفّر الطاقة على المدى الطويل. يعمل بجهد كهربائي متحمل حتى 220 فولط، مفيد في المناطق التي يعرف فيها الجهد تقلبات.',
      fr: "Climatiseur split inverter de 18 000 BTU (5,3 kW) pour salons et espaces ouverts de 30 à 40 m². La technologie Dual Inverter atteint la température de consigne 40 % plus vite et économise l'énergie sur le long terme. Il fonctionne sous une tension tolérante jusqu'à 220 V, un atout dans les zones où le réseau connaît des variations.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '18000 BTU / 5.3 كيلوواط', fr: '18 000 BTU / 5,3 kW' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A+', fr: 'A+' } },
      { label: { ar: 'غاز التبريد', fr: 'Fluide frigorigène' }, value: { ar: 'R32', fr: 'R32' } },
      { label: { ar: 'مستوى الصوت', fr: 'Niveau sonore' }, value: { ar: '22 – 40 ديسيبل', fr: '22 – 40 dB' } },
      { label: { ar: 'الغطاء الموصى به', fr: 'Surface conseillée' }, value: { ar: '30 – 40 م²', fr: '30 – 40 m²' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '10 سنوات على الضاغط', fr: '10 ans sur le compresseur' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.7,
  },
  {
    slug: 'cassette-plafonnier-24000-btu',
    category: 'appareils-climatisation',
    name: { ar: 'مكيف كاسيت سقفي 24000 BTU', fr: 'Cassette plafonnier 24 000 BTU' },
    brand: 'Samsung',
    image: '/images/products/cassette.jpg',
    price: null,
    short: {
      ar: 'توزيع هواء بأربع جهات 360°، مثالي للمقاهي والمكاتب والمحلات.',
      fr: 'Diffusion d’air à 360° sur quatre côtés, idéale pour cafés, bureaux et commerces.',
    },
    description: {
      ar: 'وحدة كاسيت مدمجة في السقف المستعار بفتحات توزيع بأربع جهات، تمنح توزيعًا متجانسًا للهواء على كل الاتجاهات دون تيار مباشر مزعج. مثالية للمساحات التجارية والمقاهي وقاعات الاجتماعات من 45 إلى 60 مترًا مربعًا. مضخة تصريف مدمجة لتصريف المكثفات، وتحكم بالريموت أو عبر لوحة جدارية أو نظام إدارة المبنى.',
      fr: "Cassette encastrée en faux plafond à quatre voies de diffusion, offrant une répartition homogène de l'air dans toutes les directions sans courant direct désagréable. Idéale pour les espaces commerciaux, cafés et salles de réunion de 45 à 60 m². Pompe de relevage intégrée pour l'évacuation des condensats, commande par télécommande, panneau mural ou gestion technique du bâtiment.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '24000 BTU / 7 كيلوواط', fr: '24 000 BTU / 7 kW' } },
      { label: { ar: 'التوزيع', fr: 'Diffusion' }, value: { ar: '4 جهات', fr: '4 voies' } },
      { label: { ar: 'متطلبات السقف', fr: 'Encombrement plafond' }, value: { ar: 'من 250 مم فأكثر', fr: 'à partir de 250 mm' } },
      { label: { ar: 'مضخة التصريف', fr: 'Pompe de relevage' }, value: { ar: 'مدمجة حتى 500 مم', fr: 'Intégrée jusqu’à 500 mm' } },
      { label: { ar: 'الغطاء الموصى به', fr: 'Surface conseillée' }, value: { ar: '45 – 60 م²', fr: '45 – 60 m²' } },
      { label: { ar: 'التحكم', fr: 'Commande' }, value: { ar: 'ريموت / لوحة / GTC', fr: 'Télécommande / panneau / GTB' } },
    ],
    tags: ['new'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.6,
  },
  {
    slug: 'systeme-vrv-professionnel',
    category: 'appareils-climatisation',
    name: { ar: 'نظام VRV احترافي متعدد الوحدات', fr: 'Système VRV professionnel multi-zones' },
    brand: 'Mitsubishi Electric',
    image: '/images/products/vrv.jpg',
    price: null,
    short: {
      ar: 'وحدة خارجية واحدة لتغذية حتى 16 وحدة داخلية، حل لفنادق ومبانٍ مكتبية.',
      fr: 'Une unité extérieure alimentant jusqu’à 16 unités intérieures, pour hôtels et immeubles de bureaux.',
    },
    description: {
      ar: 'نظام VRV/VRF مركزي بوحدة خارجية واحدة قادرة على تغذية ما بين 4 و16 وحدة داخلية بأنواعها (مخفية، كاسيت، جدارية)، مع تحكم مستقل في حرارة كل فضاء. تقنية استرجاع الحرارة تسمح بتبريد غرفة وتدفئة أخرى في نفس الوقت، ما يقلل الاستهلاك بشكل كبير. البنية المعيارية تجعل تمديد النظام لاحقًا سهلًا دون تغيير الوحدة الخارجية.',
      fr: "Système VRV/VRF centralisé dont une seule unité extérieure alimente de 4 à 16 unités intérieures de tous types (gainable, cassette, murale), avec régulation indépendante de chaque zone. La technologie à récupération de chaleur permet de refroidir une pièce et de chauffer une autre simultanément, réduisant fortement la consommation. L'architecture modulaire facilite l'extension ultérieure sans changer l'unité extérieure.",
    },
    specs: [
      { label: { ar: 'عدد الوحدات الداخلية', fr: 'Unités intérieures' }, value: { ar: 'حتى 16 وحدة', fr: "jusqu'à 16 unités" } },
      { label: { ar: 'طول الشبكة الأقصى', fr: 'Longueur de réseau max.' }, value: { ar: 'حتى 150 مترًا', fr: "jusqu'à 150 m" } },
      { label: { ar: 'التقنية', fr: 'Technologie' }, value: { ar: 'استرجاع الحرارة / إنفرتر', fr: 'Récupération de chaleur / inverter' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A++ (عامل الحمولة الجزئية مرتفع)', fr: 'A++ (haut rendement à charge partielle)' } },
      { label: { ar: 'التحكم', fr: 'Gestion' }, value: { ar: 'مركزي GTC + تطبيق', fr: 'Centrale GTB + application' } },
      { label: { ar: 'التطبيق', fr: 'Application' }, value: { ar: 'فنادق، مكاتب، عيادات', fr: 'Hôtels, bureaux, cliniques' } },
    ],
    tags: [],
    inStock: false,
    warrantyMonths: 60,
    rating: 4.9,
  },
  {
    slug: 'vmc-double-flux',
    category: 'appareils-climatisation',
    name: { ar: 'نظام تهوية ميكانيكية مزدوج التدفق', fr: 'Ventilation mécanique double flux' },
    brand: 'Aldes',
    image: '/images/products/vmc.jpg',
    price: 7800,
    short: {
      ar: 'تجديد الهواء مع استرجاع الحرارة، يحافظ على الطاقة ويطرد الرطوبة.',
      fr: 'Renouvellement d’air avec récupération de chaleur, préserve l’énergie et évacue l’humidité.',
    },
    description: {
      ar: 'وحدة تهوية مزدوجة التدفق تجدد هواء المنزل باستمرار مع استرجاع حتى 90% من حرارة الهواء المُخرَج لتقليل تكاليف التدفئة والتكييف. تطرد الرطوبة وتمنع التكاثف والعفن الذي يضر بالجدران، وتنقّي الهواء الداخل من الغبار وحبوب الطلع عبر مرشحين. ضرورية للمنازل الحديثة المحكمة الإغلاق التي تعاني من ركود الهواء.',
      fr: "Centrale de ventilation double flux renouvelant en continu l'air du logement tout en récupérant jusqu'à 90 % de la chaleur de l'air extrait, ce qui réduit les coûts de chauffage et de climatisation. Elle évacue l'humidité et prévient la condensation et les moisissures nuisibles aux murs, et filtre l'air entrant (poussières et pollens) via deux filtres. Indispensable dans les logements modernes très étanches souffrant de confinement.",
    },
    specs: [
      { label: { ar: 'التدفق', fr: 'Débit' }, value: { ar: 'حتى 350 م³/ساعة', fr: "jusqu'à 350 m³/h" } },
      { label: { ar: 'مردود الاسترجاع', fr: 'Rendement de récupération' }, value: { ar: 'حتى 90%', fr: "jusqu'à 90 %" } },
      { label: { ar: 'عدد المرشحات', fr: 'Filtration' }, value: { ar: 'مرشحان (دخول/خروج)', fr: '2 filtres (entrée/sortie)' } },
      { label: { ar: 'ضغط الصوت', fr: 'Niveau sonore' }, value: { ar: 'من 25 ديسيبل', fr: 'à partir de 25 dB' } },
      { label: { ar: 'التحكم', fr: 'Commande' }, value: { ar: '3 سرعات + وضع أوتوماتيكي', fr: '3 vitesses + mode auto' } },
      { label: { ar: 'الاستهلاك', fr: 'Consommation' }, value: { ar: 'من 15 واط', fr: 'à partir de 15 W' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.4,
  },
  {
    slug: 'hotte-extraction-restaurant',
    category: 'appareils-climatisation',
    name: { ar: 'هوت شفط احترافي للمطاعم', fr: 'Hotte d’extraction professionnelle' },
    brand: 'ATC Pro',
    image: '/images/products/hotte.jpg',
    price: null,
    short: {
      ar: 'شفط قوي بمصافي دهون من الفولاذ المعالج، مصمم وفق معايير المطاعم.',
      fr: 'Extraction puissante avec filtres à graisses en acier traité, conforme aux normes de restauration.',
    },
    description: {
      ar: 'هوت شفط احترافي من الفولاذ المقاوم للصدأ مصمّم للمطابخ المهنية والمطاعم. مزوّد بمصافي دهون معدنية قابلة للغسل في ثلاث مراحل، وصينية تجميع لتصريف الدهون والسوائل. يتوفر بمقاسات على القياس حسب مساحة الطبخ، مع مروحة مناسبة ومروحة تعويض الهواء ضرورية لحفظ توازن الضغط في المكان.',
      fr: "Hotte d'extraction professionnelle en acier inoxydable conçue pour les cuisines professionnelles et restaurants. Équipée de filtres à graisses métalliques lavables en trois étages et d'un bac de récupération pour l'évacuation des graisses et liquides. Disponible sur mesure selon la surface de cuisson, avec ventilateur adapté et compensation d'air indispensable à l'équilibre des pressions du local.",
    },
    specs: [
      { label: { ar: 'المادة', fr: 'Matière' }, value: { ar: 'فولاذ مقاوم للصدأ', fr: 'Acier inoxydable' } },
      { label: { ar: 'المصافي', fr: 'Filtres à graisses' }, value: { ar: 'ثلاث مراحل قابلة للغسل', fr: '3 étages lavables' } },
      { label: { ar: 'المقاسات', fr: 'Dimensions' }, value: { ar: 'على القياس حسب الطلب', fr: 'Sur mesure' } },
      { label: { ar: 'المروحة', fr: 'Ventilateur' }, value: { ar: 'مقاومة للحرارة والشحوم', fr: 'Résistant chaleur et graisses' } },
      { label: { ar: 'تعويض الهواء', fr: 'Compensation d’air' }, value: { ar: 'مطلوب — يُحسب عند الدراسة', fr: 'Requise — calculée à l’étude' } },
      { label: { ar: 'التطبيق', fr: 'Application' }, value: { ar: 'مطاعم، فنادق، مقاهي', fr: 'Restaurants, hôtels, cafés' } },
    ],
    tags: [],
    inStock: false,
    warrantyMonths: 24,
    rating: 4.5,
  },

  /* --------------------------- Énergie solaire ---------------------------- */
  {
    slug: 'panneau-mono-550w',
    category: 'systemes-energie-solaire',
    name: { ar: 'لوح شمسي مونوكريستالي 550 واط', fr: 'Panneau solaire monocristallin 550 W' },
    brand: 'Jinko Solar',
    image: '/images/products/panneau-550.jpg',
    price: 1290,
    short: {
      ar: 'خلية نصف مقطوعة بكفاءة 21.3% وضمان خطي 25 سنة.',
      fr: 'Cellules half-cut, rendement de 21,3 % et garantie linéaire de 25 ans.',
    },
    description: {
      ar: 'لوح شمسي مونوكريستالي من خلايا نوع N نصف مقطوعة (half-cut) بكفاءة تحويل تصل إلى 21.3%. تصميم الخلايا نصف المقطوعة يقسّم التيار ويقلل الفقد المقاومي ويحدّ من تأثير الظل الجزئي على إنتاج السلسلة. الزجاج المقوى بطبقة مضادة للانعكاس والإطار الألومنيوم المؤكسد يعطيان مقاومة عالية للعوامل الجوية وتحمّل ضغط الثلوج والرياح.',
      fr: "Panneau solaire monocristallin à cellules N-type half-cut offrant un rendement de conversion jusqu'à 21,3 %. La découpe des cellules divise le courant, réduit les pertes résistives et limite l'impact de l'ombrage partiel sur la production de la chaîne. Le verre trempé antireflet et le cadre aluminium anodisé assurent une forte résistance aux intempéries et aux charges de neige et de vent.",
    },
    specs: [
      { label: { ar: 'الاستطاعة', fr: 'Puissance crête' }, value: { ar: '550 واط', fr: '550 Wc' } },
      { label: { ar: 'الكفاءة', fr: 'Rendement' }, value: { ar: '21.3%', fr: '21,3 %' } },
      { label: { ar: 'نوع الخلية', fr: 'Type de cellule' }, value: { ar: 'مونوكريستالي N-type', fr: 'Monocristallin N-type' } },
      { label: { ar: 'المقاسات', fr: 'Dimensions' }, value: { ar: '2278 × 1134 × 35 مم', fr: '2 278 × 1 134 × 35 mm' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '25 سنة خطي', fr: '25 ans linéaire' } },
      { label: { ar: 'تحمّل الحمل', fr: 'Résistance mécanique' }, value: { ar: '5400 باسكال', fr: '5 400 Pa' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 300,
    rating: 4.9,
  },
  {
    slug: 'onduleur-hybride-5kw',
    category: 'systemes-energie-solaire',
    name: { ar: 'عاكس هجين 5 كيلوواط', fr: 'Onduleur hybride 5 kW' },
    brand: 'Deye',
    image: '/images/products/onduleur-5kw.jpg',
    price: 9400,
    short: {
      ar: 'عاكس هجين أحادي الطور مع منظم MPPT مزدوج ومتابعة عن بعد.',
      fr: 'Onduleur hybride monophasé, double MPPT et supervision à distance.',
    },
    description: {
      ar: 'عاكس هجين بقدرة 5 كيلوواط يدير في نفس الوقت الألواح الشمسية، البطاريات والشبكة أو المولد. مزوّد بمنظمين MPPT مستقلين يتيحان توصيل سلاسل في اتجاهات مختلفة وتحقيق أقصى إنتاج، مع أولوية برمجية للاستهلاك الذاتي ثم شحن البطاريات ثم بيع الفائض. متابعة عن بعد عبر الهاتف وإمكانية تكديس عدة عواكس لزيادة القدرة.',
      fr: "Onduleur hybride de 5 kW gérant simultanément les panneaux solaires, les batteries et le réseau ou un groupe électrogène. Il dispose de deux MPPT indépendants permettant de raccorder des chaînes dans des orientations différentes et de maximiser la production, avec une priorité programmable à l'autoconsommation, puis à la charge des batteries, puis à l'injection du surplus. Supervision mobile et possibilité de mettre plusieurs onduleurs en parallèle.",
    },
    specs: [
      { label: { ar: 'القدرة الاسمية', fr: 'Puissance nominale' }, value: { ar: '5 كيلوواط', fr: '5 kW' } },
      { label: { ar: 'الطور', fr: 'Phases' }, value: { ar: 'أحادي الطور 230 فولط', fr: 'Monophasé 230 V' } },
      { label: { ar: 'منظمات MPPT', fr: 'MPPT' }, value: { ar: '2 مستقلان', fr: '2 indépendants' } },
      { label: { ar: 'أقصى جهد للألواح', fr: 'Tension PV max.' }, value: { ar: '500 فولط', fr: '500 V' } },
      { label: { ar: 'المراقبة', fr: 'Supervision' }, value: { ar: 'واي فاي + تطبيق الهاتف', fr: 'Wi-Fi + application mobile' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '5 سنوات (قابلة للتمديد)', fr: '5 ans (extensible)' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.8,
  },
  {
    slug: 'batterie-lithium-5kwh',
    category: 'systemes-energie-solaire',
    name: { ar: 'بطارية ليثيوم 5 كيلوواط/ساعة', fr: 'Batterie lithium 5 kWh' },
    brand: 'Pylontech',
    image: '/images/products/batterie.jpg',
    price: 15500,
    short: {
      ar: 'بطارية LiFePO4 بأكثر من 6000 دورة ونظام إدارة داخلي آمن.',
      fr: 'Batterie LiFePO4 de plus de 6 000 cycles avec BMS intégré sécurisé.',
    },
    description: {
      ar: 'بطارية تخزين بتقنية ليثيوم حديد فوسفات (LiFePO4)، وهي أكثر تقنيات البطاريات أمانًا وعمرًا، بتحمل يزيد عن 6000 دورة شحن وتفريغ عند عمق تفريغ 80%. مزوّدة بنظام إدارة إلكتروني BMS يراقب الخلايا ويحميها من الشحن الزائد والتفريغ العميق وارتفاع الحرارة. تصميم معياري يسمح بتوصيل عدة بطاريات موازيًا لزيادة السعة.',
      fr: "Batterie de stockage au lithium fer phosphate (LiFePO4), la technologie la plus sûre et la plus durable, supportant plus de 6 000 cycles de charge/décharge à 80 % de profondeur. Elle embarque un BMS électronique qui surveille les cellules et les protège contre la surcharge, la décharge profonde et la surchauffe. Sa conception modulaire permet de mettre plusieurs batteries en parallèle pour augmenter la capacité.",
    },
    specs: [
      { label: { ar: 'السعة', fr: 'Capacité' }, value: { ar: '5 كيلوواط/ساعة (100 أمبير/ساعة)', fr: '5 kWh (100 Ah)' } },
      { label: { ar: 'الجهد', fr: 'Tension' }, value: { ar: '48 فولط', fr: '48 V' } },
      { label: { ar: 'عدد الدورات', fr: 'Cycles' }, value: { ar: 'أكثر من 6000 دورة', fr: 'plus de 6 000 cycles' } },
      { label: { ar: 'عمق التفريغ', fr: 'Profondeur de décharge' }, value: { ar: 'حتى 90%', fr: "jusqu'à 90 %" } },
      { label: { ar: 'الحماية', fr: 'Protection' }, value: { ar: 'BMS مدمج متعدد المراحل', fr: 'BMS intégré multi-niveaux' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '10 سنوات', fr: '10 ans' } },
    ],
    tags: ['new'],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.8,
  },
  {
    slug: 'chauffe-eau-solaire-200l',
    category: 'systemes-energie-solaire',
    name: { ar: 'سخان شمسي 200 لتر', fr: 'Chauffe-eau solaire 200 L' },
    brand: 'Atlas Solar',
    image: '/images/products/solaire-thermique.jpg',
    price: 8600,
    oldPrice: 9500,
    short: {
      ar: 'جمعات شمسية وخزان معزول 200 لتر لتسخين الماء طوال السنة.',
      fr: 'Capteurs solaires et ballon isolé de 200 L pour l’eau chaude toute l’année.',
    },
    description: {
      ar: 'سخان شمسي حراري يتكوّن من جمعتين شمسيتين بأنابيب مفرغة أو صفائح، وخزان معزول بسعة 200 لتر يكفي لعائلة من 4 إلى 5 أشخاص. يوفّر ما بين 60% و80% من طاقة تسخين الماء على مدار السنة، مع مقاومة كهربائية احتياطية تعمل تلقائيًا في الأيام الغائمة. الخزان مصنوع من الفولاذ المقاوم للصدأ بطبقة امتصاص انتقائية عالية الكفاءة.',
      fr: "Chauffe-eau solaire thermique composé de deux capteurs (tubes sous vide ou à plaques) et d'un ballon isolé de 200 litres, suffisant pour une famille de 4 à 5 personnes. Il assure 60 à 80 % des besoins annuels de chauffage de l'eau, avec une résistance électrique d'appoint s'enclenchant automatiquement par temps couvert. Cuve en acier inoxydable avec revêtement sélectif à haut rendement d'absorption.",
    },
    specs: [
      { label: { ar: 'سعة الخزان', fr: 'Capacité du ballon' }, value: { ar: '200 لتر', fr: '200 litres' } },
      { label: { ar: 'عدد الجمعات', fr: 'Capteurs' }, value: { ar: 'جمعتان', fr: '2 capteurs' } },
      { label: { ar: 'مادة الخزان', fr: 'Cuve' }, value: { ar: 'فولاذ مقاوم للصدأ', fr: 'Acier inoxydable' } },
      { label: { ar: 'المساحة المطلوبة', fr: 'Surface requise' }, value: { ar: '4 م² تقريبًا', fr: 'environ 4 m²' } },
      { label: { ar: 'التوفير السنوي', fr: 'Économie annuelle' }, value: { ar: '60 – 80%', fr: '60 – 80 %' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '5 سنوات', fr: '5 ans' } },
    ],
    tags: ['promo'],
    inStock: true,
    warrantyMonths: 60,
    rating: 4.6,
  },
  {
    slug: 'structure-fixation-toiture',
    category: 'systemes-energie-solaire',
    name: { ar: 'هيكل تركيب ألومنيوم للأسطح', fr: 'Structure de fixation aluminium pour toiture' },
    brand: 'Atlas Solar',
    image: '/images/products/structure.jpg',
    price: 3200,
    short: {
      ar: 'هياكل ألومنيوم مؤكسدة مقاومة للتآكل مع مسامير من الفولاذ المقاوم للصدأ.',
      fr: 'Rails aluminium anodisé anticorrosion avec visserie inoxydable.',
    },
    description: {
      ar: 'هيكل تركيب احترافي من الألومنيوم المؤكسد مصمّم لتحمّل الأحمال الميكانيكية وحماية الألواح من الاهتزاز والرياح. يشمل القضبان الحاملة، المشابك الوسطى والنهاية، ومسامير وبراغي فولاذ مقاوم للصدأ 304. متوفر بأنواع: تركيب على السطح المائل، على السطح المسطح بزاوية مثالية، على الأرض أو على مظلات السيارات. مصمم ليتحمّل الرياح الساحلية القوية.',
      fr: "Structure de fixation professionnelle en aluminium anodisé conçue pour résister aux charges mécaniques et protéger les panneaux des vibrations et du vent. Elle comprend les rails porteurs, les pinces centrales et terminales, et de la visserie en inox 304. Disponible en plusieurs versions : toiture inclinée, toiture-terrasse à angle optimal, pose au sol ou ombrières de parking. Conçue pour résister aux vents côtiers forts.",
    },
    specs: [
      { label: { ar: 'المادة', fr: 'Matière' }, value: { ar: 'ألومنيوم مؤكسد 6005-T5', fr: 'Aluminium anodisé 6005-T5' } },
      { label: { ar: 'البراغي', fr: 'Visserie' }, value: { ar: 'فولاذ مقاوم للصدأ 304', fr: 'Inox 304' } },
      { label: { ar: 'سرعة الرياح', fr: 'Vitesse de vent' }, value: { ar: 'حتى 150 كم/ساعة', fr: "jusqu'à 150 km/h" } },
      { label: { ar: 'الميلان', fr: 'Inclinaison' }, value: { ar: 'قابل للضبط حسب الموقع', fr: 'Réglable selon le site' } },
      { label: { ar: 'الأنواع', fr: 'Versions' }, value: { ar: 'سطح مائل / مسطح / أرضي', fr: 'Toiture / terrasse / sol' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '10 سنوات', fr: '10 ans' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.7,
  },
  {
    slug: 'kit-solaire-3kw',
    category: 'systemes-energie-solaire',
    name: { ar: 'مجموعة شمسية كاملة 3 كيلوواط', fr: 'Kit solaire complet 3 kWc' },
    brand: 'ATC Énergie',
    image: '/images/products/kit-solaire.jpg',
    price: 27500,
    oldPrice: 31000,
    short: {
      ar: 'مجموعة جاهزة: 6 ألواح، عاكس هجين، هيكل وكابلات — مثالية لمنزل متوسط.',
      fr: 'Kit prêt : 6 panneaux, onduleur hybride, structure et câblage — idéal pour une maison moyenne.',
    },
    description: {
      ar: 'مجموعة شمسية متكاملة بقدرة 3 كيلوواط للاستهلاك الذاتي، تغذي أساسيات المنزل نهارًا وتقلّل الفاتورة بشكل ملموس. تضم 6 ألواح 550 واط، عاكسًا هجينًا 3 كيلوواط، هيكل التركيب الكامل، الكابلات وقواعد التأريض، وواقيات التيار المستمر. السعر يشمل الدراسة التقنية والتركيب والتشغيل في طنجة وضواحيها.',
      fr: "Kit solaire complet de 3 kWc en autoconsommation, alimentant les usages de base de la maison en journée et réduisant nettement la facture. Il comprend 6 panneaux de 550 W, un onduleur hybride de 3 kW, la structure complète, le câblage et les kits de mise à la terre, ainsi que les parafoudres DC. Le prix inclut l'étude technique, la pose et la mise en service à Tanger et sa région.",
    },
    specs: [
      { label: { ar: 'القدرة الكلية', fr: 'Puissance totale' }, value: { ar: '3 كيلوواط', fr: '3 kWc' } },
      { label: { ar: 'عدد الألواح', fr: 'Nombre de panneaux' }, value: { ar: '6 ألواح × 550 واط', fr: '6 × 550 W' } },
      { label: { ar: 'العاكس', fr: 'Onduleur' }, value: { ar: 'هجين 3 كيلوواط', fr: 'Hybride 3 kW' } },
      { label: { ar: 'الإنتاج اليومي', fr: 'Production quotidienne' }, value: { ar: '12 – 15 كيلوواط/ساعة', fr: '12 – 15 kWh' } },
      { label: { ar: 'المساحة المطلوبة', fr: 'Surface requise' }, value: { ar: '15 م² تقريبًا', fr: 'environ 15 m²' } },
      { label: { ar: 'المشمول', fr: 'Inclus' }, value: { ar: 'دراسة + تركيب + تشغيل', fr: 'Étude + pose + mise en service' } },
    ],
    tags: ['promo', 'bestseller'],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.9,
  },

  /* ------------------------ Appareils électroménagers --------------------- */
  {
    slug: 'refrigerateur-no-frost-450l',
    category: 'appareils-electromenagers',
    name: { ar: 'ثلاجة No Frost 450 لتر', fr: 'Réfrigérateur No Frost 450 L' },
    brand: 'Samsung',
    image: '/images/products/refrigerateur.jpg',
    price: 7990,
    oldPrice: 8690,
    short: {
      ar: 'تبريد موزّع بدون تشكّل جليد بضاغط إنفرتر 10 سنوات ضمان.',
      fr: 'Froid ventilé sans givre, compresseur inverter garanti 10 ans.',
    },
    description: {
      ar: 'ثلاجة ذات بابين (combiné) بسعة 450 لتر بنظام No Frost الذي يوزّع الهواء البارد في كل الرفوف فلا يتشكّل الجليد ولا تحتاج إلى إذابته يدويًا. ضاغط إنفرتر يعدّل سرعته حسب الحاجة فيقلّل الاستهلاك والضجيج. تقنية Twin Cooling Plus تفصل جوّ حجرة التبريد عن حجرة التجميد لمنع انتقال الروائح والحفاظ على رطوبة الخضار والفواكه.',
      fr: "Réfrigérateur combiné de 450 litres à système No Frost répartissant l'air froid sur toutes les clayettes : pas de givre, pas de dégivrage manuel. Le compresseur inverter adapte sa vitesse aux besoins, réduisant la consommation et le bruit. La technologie Twin Cooling Plus sépare l'atmosphère du compartiment réfrigérateur de celui du congélateur, évitant la migration des odeurs et préservant l'humidité des fruits et légumes.",
    },
    specs: [
      { label: { ar: 'السعة الإجمالية', fr: 'Capacité totale' }, value: { ar: '450 لتر', fr: '450 litres' } },
      { label: { ar: 'النظام', fr: 'Système' }, value: { ar: 'No Frost (بدون جليد)', fr: 'No Frost (sans givre)' } },
      { label: { ar: 'الضاغط', fr: 'Compresseur' }, value: { ar: 'إنفرتر رقمي', fr: 'Inverter digital' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A++', fr: 'A++' } },
      { label: { ar: 'المقاسات', fr: 'Dimensions' }, value: { ar: '70 × 178 × 70 سم', fr: '70 × 178 × 70 cm' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '10 سنوات على الضاغط', fr: '10 ans sur le compresseur' } },
    ],
    tags: ['promo', 'bestseller'],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.7,
  },
  {
    slug: 'lave-linge-inverter-9kg',
    category: 'appareils-electromenagers',
    name: { ar: 'غسالة أوتوماتيكية 9 كيلو', fr: 'Lave-linge automatique 9 kg' },
    brand: 'LG',
    image: '/images/products/lave-linge.jpg',
    price: 5490,
    short: {
      ar: 'محرك Direct Drive بضمان 10 سنوات وتشغيل هادئ وبرامج قصيرة.',
      fr: 'Moteur Direct Drive garanti 10 ans, fonctionnement silencieux et programmes courts.',
    },
    description: {
      ar: 'غسالة أوتوماتيكية بسعة 9 كيلوغرام و1200 دورة في الدقيقة، بمحرك Direct Drive بدون سير (courroie) مباشرة على الحلة، ما يعني ضجيجًا أقل، اهتزازًا أقل، وعمرًا أطول. برنامج صحي بدرجة حرارة عالية يقتل 99.9% من مسببات الحساسية، وبرنامج سريع 30 دقيقة للملابس القليلة. تعمل بضغط ماء منخفض وبهذا تناسب الفيلات ذات الشبكات الضعيفة.',
      fr: "Lave-linge de 9 kg à 1 200 tr/min équipé d'un moteur Direct Drive monté directement sur le tambour (sans courroie) : moins de bruit, moins de vibrations et une durée de vie prolongée. Le programme hygiène à haute température élimine 99,9 % des allergènes, et le programme rapide de 30 minutes convient aux petites charges. Il fonctionne sous faible pression d'eau, adapté aux villas à réseau limité.",
    },
    specs: [
      { label: { ar: 'السعة', fr: 'Capacité' }, value: { ar: '9 كيلوغرام', fr: '9 kg' } },
      { label: { ar: 'سرعة العصر', fr: 'Vitesse d’essorage' }, value: { ar: '1200 دورة/دقيقة', fr: '1 200 tr/min' } },
      { label: { ar: 'المحرك', fr: 'Moteur' }, value: { ar: 'Direct Drive عاكس', fr: 'Direct Drive inverter' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A+++', fr: 'A+++' } },
      { label: { ar: 'البرامج', fr: 'Programmes' }, value: { ar: '14 برنامجًا', fr: '14 programmes' } },
      { label: { ar: 'الضمان', fr: 'Garantie' }, value: { ar: '10 سنوات على المحرك', fr: '10 ans sur le moteur' } },
    ],
    tags: ['bestseller'],
    inStock: true,
    warrantyMonths: 120,
    rating: 4.8,
  },
  {
    slug: 'four-encastrable-70l',
    category: 'appareils-electromenagers',
    name: { ar: 'فرن مدمج 70 لتر بمروحة', fr: 'Four encastrable 70 L à chaleur tournante' },
    brand: 'Bosch',
    image: '/images/products/four.jpg',
    price: 6390,
    short: {
      ar: 'فرن بمروحة توزّع الحرارة بالتساوي، مع تنظيف ذاتي بالبخار.',
      fr: 'Four à chaleur tournante homogène avec nettoyage vapeur automatique.',
    },
    description: {
      ar: 'فرن مدمج بسعة 70 لتر بنظام الحمل الحراري بالمروحة الذي يوزّع الحرارة بالتساوي على مستوى واحد، ما يسمح بخبز دفعتين في نفس الوقت بدون نقل الطعم. البرنامج الإلكتروني 3D يمنح نتائج متساوية على كل المستويات. وميزة التنظيف بالبخار: نضع الماء في قاع الفرن ويعمل البرنامج على تفتيت الدهون لتصبح قابلة للتنظيف بسهولة دون مواد كيميائية.',
      fr: "Four encastrable de 70 litres à chaleur tournante répartissant uniformément la chaleur sur un même niveau, permettant de cuire deux plaques simultanément sans mélange de saveurs. Le mode électronique 3D donne des résultats homogènes à tous les niveaux. La fonction nettoyage vapeur : versez de l'eau au fond, le programme ramollit les graisses et facilite le nettoyage, sans produits chimiques.",
    },
    specs: [
      { label: { ar: 'السعة', fr: 'Capacité' }, value: { ar: '70 لتر', fr: '70 litres' } },
      { label: { ar: 'الاستطاعة', fr: 'Puissance' }, value: { ar: '3000 واط', fr: '3 000 W' } },
      { label: { ar: 'الوظائف', fr: 'Fonctions' }, value: { ar: '10 أنماط طهي', fr: '10 modes de cuisson' } },
      { label: { ar: 'الحمل الحراري', fr: 'Chaleur tournante' }, value: { ar: '3D بالتساوي', fr: '3D homogène' } },
      { label: { ar: 'التنظيف', fr: 'Nettoyage' }, value: { ar: 'ذاتي بالبخار', fr: 'Automatique vapeur' } },
      { label: { ar: 'المقاسات', fr: 'Dimensions' }, value: { ar: 'معياري 60 سم مدمج', fr: 'Encastrable standard 60 cm' } },
    ],
    tags: [],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.6,
  },
  {
    slug: 'hotte-tiroir-60',
    category: 'appareils-electromenagers',
    name: { ar: 'شفاط تلسكوبي 60 سم', fr: 'Hotte télescopique 60 cm' },
    brand: 'Bosch',
    image: '/images/products/hotte-menagere.jpg',
    price: 2190,
    oldPrice: 2490,
    short: {
      ar: 'شفاط بتصميم مسحوب يوفّر المساحة ويعمل بضجيج منخفض.',
      fr: 'Hotte escamotable qui libère l’espace, avec fonctionnement silencieux.',
    },
    description: {
      ar: 'شفاط تلسكوبي بعرض 60 سم يُدمج تحت خزانة المطبخ ويُسحب عند الحاجة، حل مثالي للمطابخ الصغيرة. ثلاث سرعات لشفط الهواء بقوة تصل إلى 600 م³/ساعة تتعامل مع الطبخ اليومي والطبخ القوي. مصافي ألومنيوم معدنية قابلة للغسل في غسالة الأطباق، وإضاءة LED مدمجة تنير سطح الطبخ. عرض الصوت لا يتجاوز 58 ديسيبل على أعلى سرعة.',
      fr: "Hotte télescopique de 60 cm qui s'encastre sous une armoire de cuisine et se déploie au besoin : la solution idéale pour les petites cuisines. Trois vitesses d'aspiration jusqu'à 600 m³/h pour la cuisson quotidienne comme intensive. Filtres à graisses métalliques lavables au lave-vaisselle et éclairage LED intégré éclairant la table de cuisson. Le niveau sonore ne dépasse pas 58 dB à vitesse maximale.",
    },
    specs: [
      { label: { ar: 'العرض', fr: 'Largeur' }, value: { ar: '60 سم', fr: '60 cm' } },
      { label: { ar: 'قوة الشفط', fr: 'Débit d’aspiration' }, value: { ar: 'حتى 600 م³/ساعة', fr: "jusqu'à 600 m³/h" } },
      { label: { ar: 'السرعة', fr: 'Vitesses' }, value: { ar: '3 سرعات', fr: '3 vitesses' } },
      { label: { ar: 'المصافي', fr: 'Filtres' }, value: { ar: 'ألومنيوم قابل للغسل', fr: 'Aluminium lavables' } },
      { label: { ar: 'الإضاءة', fr: 'Éclairage' }, value: { ar: 'LED مدمجة', fr: 'LED intégré' } },
      { label: { ar: 'الضجيج', fr: 'Niveau sonore' }, value: { ar: 'حتى 58 ديسيبل', fr: "jusqu'à 58 dB" } },
    ],
    tags: ['promo'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.5,
  },
  {
    slug: 'plaque-induction-4-zones',
    category: 'appareils-electromenagers',
    name: { ar: 'لوح طهي بالحث 4 مناطق', fr: 'Plaque à induction 4 zones' },
    brand: 'Siemens',
    image: '/images/products/plaque-induction.jpg',
    price: 4790,
    short: {
      ar: 'تسخين فوري وتحكم دقيق باللمس، أسرع وأنظف من الغاز.',
      fr: 'Chauffe instantanée et contrôle tactile précis, plus rapide et plus propre que le gaz.',
    },
    description: {
      ar: 'لوح طهي بالحث المغناطيسي بأربع مناطق، يسخّن الإناء مباشرة لا الهواء، وبالتالي فهو أسرع بنسبة تصل إلى 50% من الغاز وأكثر أمانًا (السطح لا يبقى حارًّا إلا بفعل حرارة الإناء). تحكم باللمس بمنزلقات دقيقة، مؤقت لكل منطقة، وقفل للأطفال. يتطلّب أوعية من الفولاذ المغناطيسي، ولهذا لا تُستعمل أواني الألومنيوم العادية.',
      fr: "Table de cuisson à induction magnétique à quatre zones : elle chauffe directement le récipient et non l'air, ce qui la rend jusqu'à 50 % plus rapide que le gaz et plus sûre (la surface ne reste chaude que par le récipient). Commandes tactiles à curseurs précis, minuterie par zone et sécurité enfant. Elle nécessite des ustensiles en acier magnétique ; les casseroles en aluminium ordinaire ne fonctionnent pas.",
    },
    specs: [
      { label: { ar: 'عدد المناطق', fr: 'Nombre de zones' }, value: { ar: '4 مناطق', fr: '4 zones' } },
      { label: { ar: 'الاستطاعة الإجمالية', fr: 'Puissance totale' }, value: { ar: '7200 واط', fr: '7 200 W' } },
      { label: { ar: 'الاستطاعة الموحّدة', fr: 'Booster' }, value: { ar: '3000 واط للمنطقة', fr: '3 000 W par zone' } },
      { label: { ar: 'التحكم', fr: 'Commande' }, value: { ar: 'لمس بمنزلقات', fr: 'Tactile à curseurs' } },
      { label: { ar: 'الأمان', fr: 'Sécurité' }, value: { ar: 'قفل أطفال + مؤقت', fr: 'Sécurité enfant + minuterie' } },
      { label: { ar: 'العرض', fr: 'Largeur' }, value: { ar: '60 سم', fr: '60 cm' } },
    ],
    tags: ['new'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.7,
  },
  {
    slug: 'lave-vaisselle-14-couverts',
    category: 'appareils-electromenagers',
    name: { ar: 'جلاية أطباق 14 طقماً', fr: 'Lave-vaisselle 14 couverts' },
    brand: 'Bosch',
    image: '/images/products/lave-vaisselle.jpg',
    price: 6990,
    oldPrice: 7690,
    short: {
      ar: 'ثلاثة سلال وسلة للأدوات مع حوض ماء ثالث يوفّر الطاقة.',
      fr: 'Trois paniers et un tiroir à couverts, avec cuve dédiée à faible consommation.',
    },
    description: {
      ar: 'جلاية أطباق بسعة 14 طقمًا مع صينية ثالثة مخصصة للملاعق والأدوات الحادة، ما يحرّر مساحة السلة السفلية للأطباق الكبيرة. تعمل بنظام حوض الماء الثالث الذي يقلّل استهلاك الماء والكهرباء، وتصل إلى 6 لترات فقط في البرنامج الاقتصادي — أقل من الغسل اليدوي. مستشعر التعكر يحدّد درجة الوسخ تلقائيًا فيضبط كمية الماء ومدة البرنامج.',
      fr: "Lave-vaisselle de 14 couverts avec troisième panier dédié aux couverts et aux couteaux, libérant la panier inférieur pour les grandes assiettes. Il fonctionne avec un troisième circuit d'eau réduisant la consommation d'eau et d'électricité : seulement 6 litres en programme éco, moins qu'un lavage à la main. Le capteur de turbidité évalue automatiquement le degré de salissure et ajuste la quantité d'eau et la durée du programme.",
    },
    specs: [
      { label: { ar: 'السعة', fr: 'Capacité' }, value: { ar: '14 طقمًا', fr: '14 couverts' } },
      { label: { ar: 'استهلاك الماء', fr: 'Consommation d’eau' }, value: { ar: '6 لتر في البرنامج الاقتصادي', fr: '6 litres en éco' } },
      { label: { ar: 'التصنيف الطاقي', fr: 'Classe énergétique' }, value: { ar: 'A++', fr: 'A++' } },
      { label: { ar: 'المستوى الصوتي', fr: 'Niveau sonore' }, value: { ar: '42 ديسيبل', fr: '42 dB' } },
      { label: { ar: 'البرامج', fr: 'Programmes' }, value: { ar: '6 برامج', fr: '6 programmes' } },
      { label: { ar: 'اللون', fr: 'Couleur' }, value: { ar: 'فولاذ مقاوم للصدأ', fr: 'Inox' } },
    ],
    tags: ['promo'],
    inStock: true,
    warrantyMonths: 24,
    rating: 4.6,
  },
];

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function productCategorySlugList(): string[] {
  return productCategories.map((c) => c.slug);
}

export function productSlugList(): string[] {
  return products.map((p) => p.slug);
}

export function availabilityOf(product: Product): Localized {
  return availability(product.inStock);
}

export const units = { piece, kit };
