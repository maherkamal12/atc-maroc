import type { Localized } from '@/lib/i18n';

export const site = {
  legalName: { ar: 'شركة أطلس تك كونسيبت', fr: 'Atlas Tech Concept SARL' },
  shortName: { ar: 'أطلس تك كونسيبت', fr: 'Atlas Tech Concept' },
  latinName: 'ATLAS TECH CONCEPT',
  initials: 'ATC',
  founded: 2016,

  phone: '+212780891026',
  phoneDisplay: '00212 780 891 026',
  phoneHref: 'tel:+212780891026',
  whatsapp: '212780891026',
  email: 'info@atc-maroc.com',
  emailHref: 'mailto:info@atc-maroc.com',
  instagram: 'https://www.instagram.com/atc.maroc/',
  instagramHandle: '@atc.maroc',

  address: {
    ar: 'شارع مولاي إسماعيل، إقامة مولاي إسماعيل رقم 22، الطابق 5، رقم 19، 90000 طنجة، المغرب',
    fr: 'Avenue Moulay Ismaïl, Rés. Moulay Ismail N°22, Étage 5 N°19, 90000 Tanger, Maroc',
  },
  addressLines: {
    ar: ['شارع مولاي إسماعيل', 'إقامة مولاي إسماعيل رقم 22، الطابق 5، رقم 19', '90000 طنجة، المغرب'],
    fr: ['Avenue Moulay Ismaïl', 'Rés. Moulay Ismaïl N°22, Étage 5 N°19', '90000 Tanger, Maroc'],
  },
  /** Google Maps embed query — no API key required. */
  mapsQuery: 'Avenue+Moulay+Ismail+Tanger+Maroc',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Avenue+Moulay+Ismail+Tanger+Maroc',

  hours: [
    {
      days: { ar: 'الاثنين – الجمعة', fr: 'Lundi – Vendredi' },
      time: { ar: '10:00 – 18:00', fr: '10h00 – 18h00' },
    },
    { days: { ar: 'السبت', fr: 'Samedi' }, time: { ar: '08:00 – 18:00', fr: '08h00 – 18h00' } },
    { days: { ar: 'الأحد', fr: 'Dimanche' }, time: { ar: '09:00 – 17:00', fr: '09h00 – 17h00' } },
  ],

  stats: [
    { value: 10, suffix: '+', label: { ar: 'سنوات خبرة', fr: "Années d'expérience" } },
    { value: 650, suffix: '+', label: { ar: 'مشروع منجز', fr: 'Projets réalisés' } },
    { value: 900, suffix: '+', label: { ar: 'عميل راضٍ', fr: 'Clients satisfaits' } },
    { value: 12, suffix: '', label: { ar: 'مدينة مغطاة', fr: 'Villes couvertes' } },
  ],

  zones: [
    'Tanger',
    'Tétouan',
    'Asilah',
    'Larache',
    'Kénitra',
    'Rabat',
    'Salé',
    'Casablanca',
    'Mohammedia',
    'Fès',
    'Meknès',
    'Marrakech',
    'Agadir',
    'Oujda',
    'Chefchaouen',
    'Al Hoceïma',
  ],
} as const;

/** Client sectors we work with — shown in the trust marquee. */
export const sectors: Localized[] = [
  { ar: 'فيلات ومنازل', fr: 'Villas et maisons' },
  { ar: 'شقق سكنية', fr: 'Appartements' },
  { ar: 'مكاتب إدارية', fr: 'Bureaux' },
  { ar: 'فنادق ودور ضيافة', fr: 'Hôtels et riads' },
  { ar: 'مطاعم ومقاهي', fr: 'Restaurants et cafés' },
  { ar: 'محلات تجارية', fr: 'Commerces' },
  { ar: 'عيادات ومصحات', fr: 'Cliniques et cabinets' },
  { ar: 'مدارس وحضانات', fr: 'Écoles et crèches' },
  { ar: 'مصانع ووحدات صناعية', fr: 'Usines et unités industrielles' },
  { ar: 'مبانٍ إدارية عمومية', fr: 'Bâtiments publics' },
];

export const testimonials = [
  {
    name: { ar: 'يوسف بناني', fr: 'Youssef Bennani' },
    role: { ar: 'صاحب فيلا — طنجة', fr: 'Propriétaire de villa — Tanger' },
    rating: 5,
    quote: {
      ar: 'تولّوا كل شيء في الفيلا: الكهرباء، السباكة، التكييف والتشطيب. ما أعجبني أن مسؤولًا واحدًا كان يتابع كل شيء، فلم أضطر للتنقل بين حرفيين. النتيجة مطابقة للمخططات تمامًا.',
      fr: "Ils ont pris en charge toute la villa : électricité, plomberie, climatisation et finitions. J'ai apprécié d'avoir un seul responsable pour tout, sans avoir à jongler entre artisans. Le résultat correspond exactement aux plans.",
    },
  },
  {
    name: { ar: 'سلمى الإدريسي', fr: 'Salma El Idrissi' },
    role: { ar: 'مديرة مطعم — طنجة', fr: 'Gérante de restaurant — Tanger' },
    rating: 5,
    quote: {
      ar: 'ركّبوا لنا نظام شفط وتهوية كاملًا للمطبخ مع التكييف. الفرق مذهل في درجة الحرارة وفي الالتزام بالمعايير. جاءوا في الوقت تمامًا وسلّموا قبل الموعد بيومين.',
      fr: "Ils ont installé tout le système d'extraction et de ventilation de la cuisine avec la climatisation. La différence est spectaculaire côté température et conformité aux normes. Ponctuels, et ils ont livré deux jours avant l'échéance.",
    },
  },
  {
    name: { ar: 'عبد الرحيم القاسمي', fr: 'Abderrahim El Kacimi' },
    role: { ar: 'مسيّر شركة — المنطقة الصناعية', fr: 'Gérant de société — zone industrielle' },
    rating: 5,
    quote: {
      ar: 'نظام شمسي بقدرة 20 كيلوواط مع مراقبة عن بعد. الفاتورة انخفضت بنسبة 60% والحساب الذي قدّموه لنا في الدراسة كان مطابقًا للواقع تقريبًا. عمل احترافي حقيقي.',
      fr: "Un système solaire de 20 kW avec supervision à distance. La facture a baissé de 60 % et le calcul présenté dans l'étude s'est révélé très proche de la réalité. Du vrai travail professionnel.",
    },
  },
  {
    name: { ar: 'نادية الزهراوي', fr: 'Nadia Zahraoui' },
    role: { ar: 'مالكة شقة — طنجة', fr: 'Propriétaire d’appartement — Tanger' },
    rating: 5,
    quote: {
      ar: 'عرض السعر كان مفصّلًا ببنود واضحة ولم يزد سنتيمًا واحدًا عن المتفق عليه. الأشغال نُظّفت في النهاية وغادروا المكان أنهى ترميم. هذا الاحترام في التعامل نادر.',
      fr: "Le devis était détaillé et clair, et pas un centime de plus que ce qui était convenu. Le chantier était nettoyé et ils ont quitté les lieux impeccablement remis en état. Ce respect est rare.",
    },
  },
  {
    name: { ar: 'مروان العمراني', fr: 'Marouane El Amrani' },
    role: { ar: 'مستثمر عقاري — الرباط', fr: 'Investisseur immobilier — Rabat' },
    rating: 5,
    quote: {
      ar: 'تعاملت معهم على ثلاثة مشاريع سكنية. جودة التنفيذ ثابتة وميزانياتهم صادقة. في مشروع واحد كشفوا لنا خطأً في دراسة مقاول آخر وفّروا علينا تكاليف كبيرة.',
      fr: "J'ai travaillé avec eux sur trois projets résidentiels. Qualité d'exécution constante et chiffrages honnêtes. Sur un chantier, ils ont relevé une erreur dans l'étude d'un autre intervenant, nous faisant économiser une somme importante.",
    },
  },
  {
    name: { ar: 'هشام الطنجاوي', fr: 'Hicham Tanjaoui' },
    role: { ar: 'مهندس معماري — طنجة', fr: 'Architecte — Tanger' },
    rating: 5,
    quote: {
      ar: 'كمعماري، أقدّر الشركات التي تحترم المخططات ولا تغيّر التفاصيل من تلقاء نفسها. أطلس تك كونسيبت يتشاورون دائمًا قبل أي تعديل، وأسئلتهم الفنية تدل على مستوى عالٍ.',
      fr: "En tant qu'architecte, j'apprécie les entreprises qui respectent les plans sans modifier les détails d'elles-mêmes. Atlas Tech Concept consulte toujours avant toute adaptation, et leurs questions techniques témoignent d'un haut niveau.",
    },
  },
];

export const designStyles: Array<{ name: Localized; body: Localized }> = [
  {
    name: { ar: 'معاصر حديث', fr: 'Contemporain moderne' },
    body: {
      ar: 'خطوط نظيفة، مساحات مفتوحة، خامات متباينة (خشب، معدن، زجاج) وألوان محايدة مع لمسة لونية واحدة.',
      fr: 'Lignes épurées, espaces ouverts, matériaux contrastés (bois, métal, verre) et couleurs neutres avec une seule touche colorée.',
    },
  },
  {
    name: { ar: 'مغربي معاصر', fr: 'Marocain contemporain' },
    body: {
      ar: 'زليج مغربي وتقطير الجبس في صيغة حديثة، مع أثاث بسيط وألوان ترابية تعيد قراءة التراث بعين اليوم.',
      fr: 'Zellige marocain et gypse sculpté revisités en version moderne, mobilier épuré et couleurs terre qui relisent la tradition d’aujourd’hui.',
    },
  },
  {
    name: { ar: 'بسيط دافئ (Minimal)', fr: 'Minimal et chaleureux' },
    body: {
      ar: 'تقليل العناصر إلى الحد الضروري، إضاءة مخفية، وخامات طبيعية تمنح المكان هدوءًا ودفئًا في الوقت نفسه.',
      fr: 'Réduire les éléments au strict nécessaire, éclairage indirect et matériaux naturels pour un espace à la fois calme et chaleureux.',
    },
  },
  {
    name: { ar: 'صناعي أنيق (Industriel)', fr: 'Industriel élégant' },
    body: {
      ar: 'خرسانة ظاهرة، معدن أسود، خشب خام وإضاءة معلّقة — مثالي للمقاهي ومكاتب الشركات الشابة.',
      fr: 'Béton brut, métal noir, bois massif et luminaires suspendus — idéal pour les cafés et les bureaux de jeunes entreprises.',
    },
  },
];

export const designGallery = [
  {
    src: '/images/services/amenagement.jpg',
    title: { ar: 'صالون بتصميم معاصر', fr: 'Salon au design contemporain' },
    place: { ar: 'فيلا — طنجة', fr: 'Villa — Tanger' },
    span: 'wide' as const,
  },
  {
    src: '/images/design/cuisine.svg',
    title: { ar: 'مطبخ مفتوح على الصالون', fr: 'Cuisine ouverte sur le salon' },
    place: { ar: 'شقة — مالاباطا', fr: 'Appartement — Malabata' },
    span: 'tall' as const,
  },
  {
    src: '/images/design/salle-bain.svg',
    title: { ar: 'حمام رخامي بمقاسات دقيقة', fr: 'Salle de bains en marbre sur mesure' },
    place: { ar: 'فيلا — كالابونيتا', fr: 'Villa — Cala Bonita' },
    span: 'normal' as const,
  },
  {
    src: '/images/about/office.jpg',
    title: { ar: 'فضاء مكتبي مفتوح', fr: 'Espace de bureau ouvert' },
    place: { ar: 'مقر شركة — المنطقة الحرة', fr: 'Siège social — zone franche' },
    span: 'normal' as const,
  },
  {
    src: '/images/design/exterieur.svg',
    title: { ar: 'واجهة وتراس خارجي', fr: 'Façade et terrasse extérieure' },
    place: { ar: 'فيلا — مرتيل', fr: 'Villa — Martil' },
    span: 'wide' as const,
  },
  {
    src: '/images/design/cafe.svg',
    title: { ar: 'مقهى بنمط صناعي', fr: 'Café au style industriel' },
    place: { ar: 'مقهى — وسط المدينة', fr: 'Café — centre-ville' },
    span: 'tall' as const,
  },
];

export const blogPosts = [
  {
    slug: 'reduire-facture-electricite-maroc',
    title: {
      ar: 'كيف تقلّل فاتورة الكهرباء في منزلك المغربي؟ 9 حلول عملية',
      fr: 'Comment réduire sa facture d’électricité au Maroc ? 9 solutions concrètes',
    },
    excerpt: {
      ar: 'مع ارتفاع تعريفات الكهرباء، صار ترشيد الاستهلاك ضرورة لا خيارًا. إليك 9 إجراءات مرتّبة حسب المردود، من الأبسط إلى الأكثر تأثيرًا.',
      fr: "Avec la hausse des tarifs, maîtriser sa consommation devient une nécessité. Voici 9 actions classées par rentabilité, de la plus simple à la plus impactante.",
    },
    category: { ar: 'توفير الطاقة', fr: 'Économies d’énergie' },
    date: '2026-01-18',
    readingMinutes: 7,
    cover: '/images/services/electricite.jpg',
  },
  {
    slug: 'choisir-climatisation-tanger',
    title: {
      ar: 'كيف تختار مكيفًا مناسبًا لمناخ طنجة الرطب؟',
      fr: 'Comment choisir un climatiseur adapté au climat humide de Tanger ?',
    },
    excerpt: {
      ar: 'الرطوبة الساحلية والملح يفرضان اختيارات مختلفة تمامًا عن المناطق الداخلية. دليل عملي لاختيار الاستطاعة والنظام والحماية المناسبة.',
      fr: "L'humidité côtière et le sel imposent des choix très différents de ceux de l'intérieur du pays. Guide pratique pour choisir puissance, système et protections.",
    },
    category: { ar: 'التكييف', fr: 'Climatisation' },
    date: '2026-02-06',
    readingMinutes: 6,
    cover: '/images/services/climatisation.jpg',
  },
  {
    slug: 'panneaux-solaires-guide-maroc',
    title: {
      ar: 'الألواح الشمسية في المغرب: دليل الحساب والعائد والضمانات',
      fr: "Panneaux solaires au Maroc : guide de calcul, rendement et garanties",
    },
    excerpt: {
      ar: 'كم لوحًا تحتاج فعلًا؟ ما زمن استرداد الاستثمار؟ وما الفرق بين الأنظمة المرتبطة بالشبكة والمستقلة؟ أجوبة بأرقام ملموسة.',
      fr: "Combien de panneaux faut-il réellement ? Quel retour sur investissement ? Quelle différence entre réseau et site isolé ? Des réponses chiffrées.",
    },
    category: { ar: 'الطاقة الشمسية', fr: 'Énergie solaire' },
    date: '2026-03-02',
    readingMinutes: 9,
    cover: '/images/services/solaire.jpg',
  },
  {
    slug: 'entretien-chaudiere-avant-hiver',
    title: {
      ar: 'صيانة الغلاية قبل الشتاء: 7 خطوات تحميك من أعطال ديسمبر',
      fr: "Entretien de la chaudière avant l'hiver : 7 étapes pour éviter la panne de décembre",
    },
    excerpt: {
      ar: 'معظم أعطال التدفئة تحدث في أول موجة برد لأن الصيانة أُجّلت. قائمة تحقق بسيطة تنجزها في ساعة وتوفّر عليك شتاءً باردًا وفاتورة إصلاح.',
      fr: "La plupart des pannes de chauffage surviennent à la première vague de froid, faute d'entretien. Une check-list d'une heure qui vous évite un hiver froid et une facture de réparation.",
    },
    category: { ar: 'التدفئة', fr: 'Chauffage' },
    date: '2026-04-11',
    readingMinutes: 5,
    cover: '/images/services/chauffage.jpg',
  },
  {
    slug: 'pression-eau-etages-superieurs',
    title: {
      ar: 'مشكلة ضعف ضغط الماء في الطوابق العليا: الأسباب والحلول',
      fr: "Pression d'eau faible aux étages supérieurs : causes et solutions",
    },
    excerpt: {
      ar: 'ضعف الضغط ليس دائمًا مشكلة شبكة عمومية. في كثير من الحالات السبب في تصميم الشبكة الداخلية، وهذا ما يمكن إصلاحه بسهولة ودون تكسير كبير.',
      fr: "Une pression faible n'est pas toujours un problème de réseau public. Bien souvent, la cause est dans la conception du réseau interne — réparable facilement et sans gros travaux.",
    },
    category: { ar: 'السباكة', fr: 'Plomberie' },
    date: '2026-05-22',
    readingMinutes: 6,
    cover: '/images/services/plomberie.jpg',
  },
  {
    slug: 'faux-plafond-errors',
    title: {
      ar: 'خمس أخطاء شائعة في الأسقف المستعارة تجنّبها قبل التنفيذ',
      fr: 'Cinq erreurs fréquentes en faux plafond à éviter avant travaux',
    },
    excerpt: {
      ar: 'ارتفاع غير محسوب، إضاءة في غير موضعها، أو مقاومة رطوبة مهمَلة — ثلاثة أخطاء تحوّل سقفًا جميلًا إلى مصدر مشاكل دائم.',
      fr: 'Hauteur mal calculée, éclairage mal positionné ou résistance à l’humidité négligée : trois erreurs qui transforment un beau plafond en source de problèmes.',
    },
    category: { ar: 'التشطيب', fr: 'Finitions' },
    date: '2026-06-30',
    readingMinutes: 5,
    cover: '/images/services/amenagement.jpg',
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
