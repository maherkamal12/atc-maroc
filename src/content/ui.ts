import type { Localized } from '@/lib/i18n';

/**
 * All chrome / interface strings for the whole site.
 * Every entry carries both Arabic and French copy.
 *
 * NOTE: this file is edited serially only — concurrent writes corrupt it.
 */
export const ui = {
  brandName: { ar: 'أطلس تك كونسيبت', fr: 'Atlas Tech Concept' },
  brandShort: { ar: 'إيه تي سي', fr: 'ATC' },
  brandLatin: 'ATLAS TECH CONCEPT',
  tagline: {
    ar: 'حلول هندسية متكاملة لمستقبل ذكي',
    fr: "Solutions d'ingénierie intégrées pour un avenir intelligent",
  },

  nav: {
    home: { ar: 'الرئيسية', fr: 'Accueil' },
    about: { ar: 'من نحن', fr: 'À propos' },
    services: { ar: 'الخدمات', fr: 'Services' },
    products: { ar: 'المنتجات', fr: 'Produits' },
    design: { ar: 'التصميم والتزيين', fr: 'Design & décoration' },
    blog: { ar: 'المدونة', fr: 'Blog' },
    contact: { ar: 'اتصل بنا', fr: 'Contact' },
    allServices: { ar: 'كل الخدمات', fr: 'Tous les services' },
    allProducts: { ar: 'كل المنتجات', fr: 'Tous les produits' },
  },

  common: {
    readMore: { ar: 'اقرأ المزيد', fr: 'En savoir plus' },
    viewDetails: { ar: 'عرض التفاصيل', fr: 'Voir les détails' },
    discover: { ar: 'اكتشف', fr: 'Découvrir' },
    ourServices: { ar: 'خدماتنا', fr: 'Nos services' },
    seeAllServices: { ar: 'تصفح جميع الخدمات', fr: 'Voir tous les services' },
    seeAllProducts: { ar: 'تصفح جميع المنتجات', fr: 'Voir tous les produits' },
    requestQuote: { ar: 'اطلب عرض سعر', fr: 'Demander un devis' },
    freeQuote: { ar: 'عرض سعر مجاني', fr: 'Devis gratuit' },
    contactUs: { ar: 'اتصل بنا', fr: 'Contactez-nous' },
    callUs: { ar: 'اتصل بنا هاتفيًا', fr: 'Appelez-nous' },
    whatsapp: { ar: 'واتساب', fr: 'WhatsApp' },
    whatsappMessage: {
      ar: 'مرحبًا، أرغب في الحصول على معلومات حول خدماتكم.',
      fr: 'Bonjour, je souhaite obtenir des informations sur vos services.',
    },
    send: { ar: 'إرسال', fr: 'Envoyer' },
    sending: { ar: 'جارٍ الإرسال…', fr: 'Envoi en cours…' },
    back: { ar: 'رجوع', fr: 'Retour' },
    backToServices: { ar: 'كل الخدمات', fr: 'Tous les services' },
    backToProducts: { ar: 'كل المنتجات', fr: 'Tous les produits' },
    home: { ar: 'الرئيسية', fr: 'Accueil' },
    from: { ar: 'ابتداءً من', fr: 'À partir de' },
    currency: { ar: 'د.م.', fr: 'MAD' },
    onQuote: { ar: 'حسب الطلب', fr: 'Sur devis' },
    new: { ar: 'جديد', fr: 'Nouveau' },
    promo: { ar: 'عرض', fr: 'Promo' },
    inStock: { ar: 'متوفر', fr: 'En stock' },
    bestseller: { ar: 'الأكثر مبيعًا', fr: 'Meilleure vente' },
    brand: { ar: 'الماركة', fr: 'Marque' },
    category: { ar: 'الفئة', fr: 'Catégorie' },
    specifications: { ar: 'المواصفات', fr: 'Spécifications' },
    description: { ar: 'الوصف', fr: 'Description' },
    relatedProducts: { ar: 'منتجات ذات صلة', fr: 'Produits associés' },
    otherServices: { ar: 'خدمات أخرى', fr: 'Autres services' },
    language: { ar: 'اللغة', fr: 'Langue' },
    switchTo: { ar: 'Français', fr: 'العربية' },
    menu: { ar: 'القائمة', fr: 'Menu' },
    close: { ar: 'إغلاق', fr: 'Fermer' },
    openMenu: { ar: 'فتح القائمة', fr: 'Ouvrir le menu' },
    skipToContent: { ar: 'تخطَّ إلى المحتوى', fr: 'Aller au contenu' },
    loading: { ar: 'جارٍ التحميل…', fr: 'Chargement…' },
    noResults: { ar: 'لا توجد نتائج', fr: 'Aucun résultat' },
    all: { ar: 'الكل', fr: 'Tous' },
    search: { ar: 'ابحث…', fr: 'Rechercher…' },
    filter: { ar: 'تصفية', fr: 'Filtrer' },
  },

  topbar: {
    hours: { ar: 'الاثنين – الجمعة: 10:00 – 18:00', fr: 'Lun – Ven : 10h00 – 18h00' },
    address: { ar: 'طنجة، المغرب', fr: 'Tanger, Maroc' },
    followUs: { ar: 'تابعنا', fr: 'Suivez-nous' },
  },

  hero: {
    badge: { ar: 'شريكك التقني في طنجة · المغرب', fr: 'Votre partenaire technique à Tanger · Maroc' },
    titleTop: { ar: 'حلول هندسية متكاملة', fr: "Solutions d'ingénierie intégrées" },
    titleBottom: { ar: 'لمستقبل ذكي', fr: 'pour un avenir intelligent' },
    subtitle: {
      ar: 'من الكهرباء والسباكة إلى التكييف والتدفئة المركزية والطاقة الشمسية والتصميم الداخلي — نُنجز مشروعك من الدراسة إلى التسليم، وفق أعلى المعايير الدولية.',
      fr: "De l'électricité et la plomberie à la climatisation, le chauffage central, l'énergie solaire et le design intérieur — nous menons votre projet de l'étude à la livraison, selon les normes internationales les plus strictes.",
    },
    ctaPrimary: { ar: 'اطلب استشارة مجانية', fr: 'Demander un devis gratuit' },
    ctaSecondary: { ar: 'تعرف على خدماتنا', fr: 'Découvrir nos services' },
    scroll: { ar: 'مرّر للأسفل', fr: 'Défiler' },
    stat1: { ar: 'سنة خبرة تراكمية', fr: "ans d'expérience cumulée" },
    stat2: { ar: 'مشروع منجز', fr: 'projets réalisés' },
    stat3: { ar: 'التزام بالجودة', fr: 'engagement qualité' },
    stat4: { ar: 'دعم فني', fr: 'support technique' },
  },

  marquee: {
    title: { ar: 'مجالات تخصصنا', fr: 'Nos domaines de spécialisation' },
  },

  why: {
    eyebrow: { ar: 'لماذا أطلس تك كونسيبت', fr: 'Pourquoi Atlas Tech Concept' },
    title: { ar: 'دائما معك في كل الأوقات', fr: 'Toujours à vos côtés, à tout moment' },
    subtitle: {
      ar: 'ثلاث ركائز نبني عليها كل مشروع: حلول متكاملة، مطابقة تامة للمعايير، وتحسين مستمر لاستهلاك الطاقة.',
      fr: 'Trois piliers guident chacun de nos projets : des solutions complètes, une conformité totale aux normes et une optimisation continue de la consommation d’énergie.',
    },
    card1Title: { ar: 'حلول متكاملة', fr: 'Solutions complètes' },
    card1Body: {
      ar: 'فريق واحد يتولى الكهرباء والسباكة والتكييف والتدفئة والطاقة الشمسية والتشطيب. لا وسطاء، لا فجوات بين المهن، ومسؤولية واحدة عن النتيجة النهائية.',
      fr: "Une seule équipe prend en charge l'électricité, la plomberie, la climatisation, le chauffage, le solaire et les finitions. Sans intermédiaires, sans rupture entre corps de métier, et un seul responsable du résultat final.",
    },
    card2Title: { ar: 'مطابقة للمعايير', fr: 'Conformes aux normes' },
    card2Body: {
      ar: 'نعمل وفق المعايير المغربية والدولية (NF C 15-100، DTU، NM) مع دراسة فنية لكل مشروع، مذكرات حسابية، ومخططات تنفيذية قبل انطلاق الأشغال.',
      fr: 'Nous travaillons selon les normes marocaines et internationales (NF C 15-100, DTU, NM) avec une étude technique, des notes de calcul et des plans d’exécution avant tout démarrage de chantier.',
    },
    card3Title: { ar: 'تحسين استهلاك الطاقة', fr: "Optimisation de la consommation d'énergie" },
    card3Body: {
      ar: 'نختار المعدات ونضبط الأنظمة لتقليل الفاتورة الطاقية: إضاءة LED، مضخات ومراوح بمحولات ترددية، عزل حراري، وتتبع دوري للاستهلاك.',
      fr: "Nous dimensionnons les équipements et réglons les installations pour réduire la facture énergétique : éclairage LED, pompes et ventilateurs à variation de fréquence, isolation thermique et suivi périodique.",
    },
    features: [
      { ar: 'جودة عالية', fr: 'Haute qualité' },
      { ar: 'تنفيذ سريع', fr: 'Exécution rapide' },
      { ar: 'فريق متخصص', fr: 'Équipe spécialisée' },
      { ar: 'أسعار تنافسية', fr: 'Prix compétitifs' },
      { ar: 'ضمان على الأشغال', fr: 'Garantie sur les travaux' },
      { ar: 'تدخل في كل جهات المملكة', fr: 'Intervention dans tout le Royaume' },
    ],
  },

  stats: {
    eyebrow: { ar: 'أرقام تتحدث', fr: 'Des chiffres qui parlent' },
    title: { ar: 'خبرة تُقاس بالنتائج', fr: 'Une expertise mesurée par les résultats' },
    years: { ar: 'سنوات خبرة', fr: "Années d'expérience" },
    projects: { ar: 'مشروع منجز', fr: 'Projets réalisés' },
    clients: { ar: 'عميل راضٍ', fr: 'Clients satisfaits' },
    cities: { ar: 'مدينة مغطاة', fr: 'Villes couvertes' },
  },

  services: {
    eyebrow: { ar: 'خدماتنا', fr: 'Nos services' },
    title: { ar: 'ستّ تخصصات، شريك واحد', fr: 'Six spécialités, un seul partenaire' },
    subtitle: {
      ar: 'نغطي السلسلة الكاملة للمبنى: من الطاقة والأنظمة التقنية إلى التشطيب الداخلي والتسليم النهائي.',
      fr: 'Nous couvrons toute la chaîne du bâtiment : de l’énergie et des systèmes techniques aux finitions intérieures et à la livraison finale.',
    },
    scope: { ar: 'مجالات التدخل', fr: "Domaines d'intervention" },
    process: { ar: 'مراحل المشروع', fr: 'Étapes du projet' },
    deliverables: { ar: 'ما نحققه لك', fr: 'Ce que nous vous apportons' },
    benefits: { ar: 'ما تكسبه من هذه الخدمة', fr: 'Ce que ce service vous apporte' },
    faq: { ar: 'أسئلة شائعة', fr: 'Questions fréquentes' },
    relatedProjects: { ar: 'أمثلة على تدخلاتنا', fr: "Exemples d'interventions" },
    ctaTitle: { ar: 'مشروعك يستحق دراسة جدّية', fr: 'Votre projet mérite une vraie étude' },
    ctaBody: {
      ar: 'أرسل لنا تفاصيل مشروعك ونتولى إعداد دراسة تقنية وعرض سعر مفصّل خلال 24 ساعة.',
      fr: 'Envoyez-nous les détails de votre projet : nous préparons une étude technique et un devis détaillé sous 24 heures.',
    },
  },

  products: {
    eyebrow: { ar: 'متجرنا', fr: 'Notre boutique' },
    title: { ar: 'أحدث المنتجات', fr: 'Nos derniers produits' },
    subtitle: {
      ar: 'معدات أصلية من ماركات موثوقة، مع ضمان المصنّع، التركيب، وخدمة ما بعد البيع.',
      fr: 'Du matériel d’origine de marques fiables, avec garantie constructeur, installation et service après-vente.',
    },
    priceOnRequest: { ar: 'السعر عند الطلب', fr: 'Prix sur demande' },
    orderNow: { ar: 'اطلب الآن', fr: 'Commander' },
    askPrice: { ar: 'استفسر عن السعر', fr: 'Demander le prix' },
    availability: { ar: 'التوفر', fr: 'Disponibilité' },
    guarantee: { ar: 'ضمان', fr: 'Garantie' },
    months: { ar: 'شهر', fr: 'mois' },
    filters: { ar: 'الفلاتر', fr: 'Filtres' },
    sortBy: { ar: 'ترتيب حسب', fr: 'Trier par' },
    sortNewest: { ar: 'الأحدث', fr: 'Plus récents' },
    sortPriceAsc: { ar: 'السعر: من الأقل', fr: 'Prix croissant' },
    sortPriceDesc: { ar: 'السعر: من الأعلى', fr: 'Prix décroissant' },
    sortName: { ar: 'الاسم', fr: 'Nom' },
    resultsCount: { ar: 'منتج', fr: 'produits' },
    allCategories: { ar: 'كل الفئات', fr: 'Toutes les catégories' },
    brandLabel: { ar: 'الماركة', fr: 'Marque' },
    details: { ar: 'تفاصيل المنتج', fr: 'Détails du produit' },
    inStock: { ar: 'المتوفر في المخزون فقط', fr: 'En stock uniquement' },
    relatedProducts: { ar: 'منتجات ذات صلة', fr: 'Produits associés' },
  },

  design: {
    eyebrow: { ar: 'التصميم والتزيين', fr: 'Design & décoration' },
    title: { ar: 'فن التشطيب والتصميم الداخلي', fr: "L'art de la finition et du design intérieur" },
    subtitle: {
      ar: 'نحوّل المساحات إلى أماكن تُعاش: تصميم داخلي عصري، تنسيق ديكور احترافي، وتصميم خارجي مميز.',
      fr: 'Nous transformons les espaces en lieux de vie : design intérieur moderne, décoration professionnelle et design extérieur remarquable.',
    },
    step1: { ar: 'تصميم داخلي عصري', fr: 'Design intérieur moderne' },
    step1Body: {
      ar: 'تصاميم تجمع بين الأناقة والوظيفة، مع استغلال مثالي للمساحات واختيار ألوان وخامات تعكس هوية المكان.',
      fr: 'Des designs qui allient élégance et fonctionnalité, avec une exploitation optimale des espaces et un choix de couleurs et matériaux adaptés à l’identité du lieu.',
    },
    step2: { ar: 'تنسيق ديكور احترافي', fr: 'Décoration professionnelle' },
    step2Body: {
      ar: 'حلول تزيين متكاملة تشمل اختيار الأثاث والإضاءة والإكسسوارات لخلق بيئة متناسقة ومتوازنة.',
      fr: 'Des solutions de décoration complètes incluant mobilier, éclairage et accessoires pour créer un environnement harmonieux et équilibré.',
    },
    step3: { ar: 'تصميم خارجي مميز', fr: 'Design extérieur remarquable' },
    step3Body: {
      ar: 'أفكار تصميم خارجي مبتكرة تعكس الطابع المعماري الحديث، بمواد عالية الجودة لمظهر جذاب ومستدام.',
      fr: 'Des idées de design extérieur innovantes reflétant l’architecture moderne, avec des matériaux de qualité pour un rendu esthétique et durable.',
    },
    gallery: { ar: 'معرض أعمالنا', fr: 'Galerie de nos réalisations' },
    styles: { ar: 'الأنماط التي نتقنها', fr: 'Les styles que nous maîtrisons' },
  },

  process: {
    eyebrow: { ar: 'منهجيتنا', fr: 'Notre méthodologie' },
    title: { ar: 'خمس مراحل واضحة', fr: 'Cinq étapes claires' },
    subtitle: {
      ar: 'منهجية منظّمة تضمن الشفافية والجودة من أول اتصال إلى ما بعد التسليم.',
      fr: 'Une méthodologie structurée garantissant transparence et qualité, du premier contact au service après livraison.',
    },
    steps: [
      {
        title: { ar: 'الاستشارة والزيارة الميدانية', fr: 'Consultation et visite sur site' },
        body: {
          ar: 'نستمع لاحتياجك، نزور الموقع، ونأخذ القياسات والمعطيات التقنية اللازمة.',
          fr: 'Nous écoutons votre besoin, visitons le site et relevons les mesures et données techniques nécessaires.',
        },
      },
      {
        title: { ar: 'الدراسة الفنية والتصميم', fr: 'Étude technique et conception' },
        body: {
          ar: 'مخططات، مذكرات حسابية، اختيار المعدات، وتقدير دقيق للميزانية.',
          fr: 'Plans, notes de calcul, sélection des équipements et estimation précise du budget.',
        },
      },
      {
        title: { ar: 'عرض سعر مفصّل', fr: 'Devis détaillé' },
        body: {
          ar: 'عرض واضح ببنود مفصّلة دون تكاليف خفية، مع جدول زمني ملتزم.',
          fr: 'Une offre claire, détaillée par postes, sans coûts cachés, avec un planning engageant.',
        },
      },
      {
        title: { ar: 'التنفيذ والمراقبة', fr: 'Exécution et contrôle' },
        body: {
          ar: 'فرق متخصصة، مواد مطابقة، وتقارير تقدّم دورية مع احترام تام لمعايير السلامة.',
          fr: 'Équipes spécialisées, matériaux conformes et rapports d’avancement réguliers, dans le respect des normes de sécurité.',
        },
      },
      {
        title: { ar: 'التسليم والضمان والصيانة', fr: 'Livraison, garantie et maintenance' },
        body: {
          ar: 'اختبارات التشغيل، تكوين على الاستخدام، ضمان مكتوب، وعقد صيانة اختياري.',
          fr: 'Essais de mise en service, formation à l’utilisation, garantie écrite et contrat de maintenance optionnel.',
        },
      },
    ],
  },

  testimonials: {
    eyebrow: { ar: 'شهادات عملائنا', fr: 'Témoignages clients' },
    title: { ar: 'ثقة تُبنى بالعمل', fr: 'Une confiance construite par le travail' },
    subtitle: {
      ar: 'ما يقوله عملاؤنا عن جودة التنفيذ، احترام المواعيد، والدعم بعد التسليم.',
      fr: 'Ce que disent nos clients de la qualité d’exécution, du respect des délais et du suivi après livraison.',
    },
  },

  blog: {
    eyebrow: { ar: 'المدونة', fr: 'Notre blog' },
    title: { ar: 'مقالات ونصائح تقنية', fr: 'Articles et conseils techniques' },
    subtitle: {
      ar: 'معلومات عملية تساعدك على اتخاذ قرارات صحيحة في مشروعك: توفير الطاقة، الصيانة، واختيار المعدات.',
      fr: 'Des informations pratiques pour décider juste dans votre projet : économies d’énergie, maintenance et choix des équipements.',
    },
    seeAll: { ar: 'كل المقالات', fr: 'Tous les articles' },
    readingTime: { ar: 'دقيقة قراءة', fr: 'min de lecture' },
    publishedOn: { ar: 'نُشر في', fr: 'Publié le' },
    relatedArticles: { ar: 'مقالات ذات صلة', fr: 'Articles liés' },
    backToBlog: { ar: 'كل المقالات', fr: 'Tous les articles' },
  },

  cta: {
    eyebrow: { ar: 'لنبدأ مشروعك', fr: 'Démarrons votre projet' },
    title: { ar: 'جاهز لتحويل فكرتك إلى واقع؟', fr: 'Prêt à concrétiser votre idée ?' },
    body: {
      ar: 'احصل على دراسة تقنية وعرض سعر مجاني خلال 24 ساعة. فريقنا متاح من الاثنين إلى الأحد.',
      fr: 'Obtenez une étude technique et un devis gratuit sous 24 heures. Notre équipe est disponible du lundi au dimanche.',
    },
    callNow: { ar: 'اتصل الآن', fr: 'Appeler maintenant' },
    visitOffice: { ar: 'زيارة المكتب', fr: 'Visiter le bureau' },
    responseTime: { ar: 'الرد خلال 24 ساعة', fr: 'Réponse sous 24 h' },
    noCommitment: { ar: 'بدون أي التزام', fr: 'Sans engagement' },
  },

  about: {
    eyebrow: { ar: 'من نحن', fr: 'À propos' },
    title: { ar: 'معلومات عنا', fr: 'Qui sommes-nous' },
    subtitle: {
      ar: 'شركة أطلس تك كونسيبت متخصصة في تقديم الحلول التقنية المتكاملة للمباني.',
      fr: 'Atlas Tech Concept est spécialisée dans les solutions techniques intégrées pour le bâtiment.',
    },
    missionTitle: { ar: 'مهمتنا', fr: 'Notre mission' },
    missionBody: {
      ar: 'مهمتنا هي تقديم حلول متكاملة ومبتكرة في مجال البناء، التجهيزات التقنية، والتصميم الداخلي، مع التركيز على الجودة والكفاءة في كل مشروع نقوم به. نسعى دائمًا لتلبية احتياجات عملائنا بشكل احترافي، وضمان تنفيذ أعمالنا وفق أعلى معايير السلامة والاستدامة، مع تقديم خدمات متطورة تجمع بين الابتكار والتكنولوجيا لتسهيل الحياة وتحسين بيئات العمل والسكن.',
      fr: "Notre mission est de fournir des solutions intégrées et innovantes dans le domaine de la construction, des équipements techniques et du design intérieur, en mettant l'accent sur la qualité et l'efficacité de chaque projet. Nous nous efforçons de répondre professionnellement aux attentes de nos clients et de garantir l'exécution de nos travaux selon les plus hauts standards de sécurité et de durabilité, en combinant innovation et technologie pour faciliter la vie et améliorer les environnements de travail et de vie.",
    },
    visionTitle: { ar: 'رؤيتنا', fr: 'Notre vision' },
    visionBody: {
      ar: 'رؤيتنا أن نصبح الرواد في تقديم الحلول التقنية والبنائية المتكاملة على مستوى المنطقة، من خلال الابتكار، الجودة العالية، واستخدام أحدث التقنيات في كافة مجالات عملنا. نسعى لبناء علاقات طويلة الأمد مع عملائنا، وتحقيق الاستدامة في جميع مشاريعنا، مع تقديم بيئات عمل وسكن مريحة وعملية تلبي توقعات العملاء وتفوقها.',
      fr: "Notre vision est de devenir le leader régional des solutions techniques et constructives intégrées, grâce à l'innovation, à la qualité élevée et à l'utilisation des technologies les plus récentes dans tous nos domaines d'activité. Nous cherchons à bâtir des relations durables avec nos clients, à assurer la durabilité de tous nos projets et à créer des espaces de travail et de vie confortables et pratiques qui répondent et dépassent les attentes.",
    },
    objectiveTitle: { ar: 'هدفنا', fr: 'Notre objectif' },
    objectiveBody: {
      ar: 'هدفنا هو تقديم حلول متكاملة وشاملة في مجالات الكهرباء، السباكة، التكييف، التدفئة المركزية، الطاقة الشمسية، والتصميم الداخلي، بحيث تصبح شركتنا الشريك الموثوق لجميع العملاء في مشاريعهم السكنية والتجارية.',
      fr: "Notre objectif est d'offrir des solutions complètes et globales en électricité, plomberie, climatisation, chauffage central, énergie solaire et design intérieur, afin de devenir le partenaire de confiance de tous les clients pour leurs projets résidentiels et commerciaux.",
    },
    valuesTitle: { ar: 'قيمنا', fr: 'Nos valeurs' },
    valuesSubtitle: {
      ar: 'أربع قيم نبني عليها كل تعامل مع عملائنا وشركائنا وفرقنا.',
      fr: 'Quatre valeurs guident chacune de nos relations avec nos clients, partenaires et équipes.',
    },
    values: [
      {
        title: { ar: 'الجودة والكفاءة', fr: 'Qualité et efficacité' },
        body: {
          ar: 'تنفيذ الأعمال بأعلى معايير الجودة والدقة لضمان استدامة المشاريع.',
          fr: 'Exécuter les travaux avec les plus hauts standards de qualité et de précision pour garantir la durabilité des projets.',
        },
      },
      {
        title: { ar: 'الابتكار والتكنولوجيا', fr: 'Innovation et technologie' },
        body: {
          ar: 'استخدام أحدث التقنيات والمواد لضمان حلول مبتكرة وفعالة.',
          fr: 'Utiliser les technologies et matériaux les plus récents pour garantir des solutions innovantes et efficaces.',
        },
      },
      {
        title: { ar: 'الالتزام بالمواعيد', fr: 'Respect des délais' },
        body: {
          ar: 'إدارة المشاريع بشكل دقيق لضمان تسليم الأعمال في الوقت المحدد.',
          fr: 'Gérer les projets avec rigueur pour garantir une livraison dans les délais convenus.',
        },
      },
      {
        title: { ar: 'رضا العملاء', fr: 'Satisfaction client' },
        body: {
          ar: 'تقديم خدمات مخصصة تلبي احتياجات العملاء وتفوق توقعاتهم.',
          fr: 'Offrir des services sur mesure qui répondent aux besoins des clients et dépassent leurs attentes.',
        },
      },
    ],
    teamTitle: { ar: 'فريقنا', fr: 'Notre équipe' },
    teamSubtitle: {
      ar: 'مهندسون وتقنيون وحرفيون مؤهلون، تحت إشراف واحد ومسؤولية واحدة.',
      fr: 'Ingénieurs, techniciens et artisans qualifiés, sous une supervision et une responsabilité uniques.',
    },
    team: [
      { role: { ar: 'الإدارة والهندسة', fr: 'Direction et ingénierie' } },
      { role: { ar: 'الدراسات التقنية والتقدير', fr: 'Études techniques et chiffrage' } },
      { role: { ar: 'فرق التنفيذ الميدانية', fr: "Équipes d'exécution" } },
      { role: { ar: 'التصميم الداخلي والديكور', fr: 'Design intérieur et décoration' } },
      { role: { ar: 'الصيانة والدعم ما بعد البيع', fr: 'Maintenance et SAV' } },
      { role: { ar: 'مراقبة الجودة والسلامة', fr: 'Qualité et sécurité' } },
    ],
    sectorsTitle: { ar: 'القطاعات التي نخدمها', fr: 'Secteurs que nous servons' },
    sectorsSubtitle: {
      ar: 'نتعامل مع مختلف أنواع المشاريع، من المنزل العائلي إلى المنشآت المهنية والصناعية.',
      fr: 'Nous intervenons sur tous types de projets, de la maison familiale aux installations professionnelles et industrielles.',
    },
    zonesTitle: { ar: 'مناطق تدخلنا', fr: "Zones d'intervention" },
    zonesSubtitle: {
      ar: 'مقرنا في طنجة، ونتدخل في كل جهات المملكة حسب حجم المشروع.',
      fr: 'Basés à Tanger, nous intervenons dans toutes les régions du Royaume selon la taille du projet.',
    },
  },

  contact: {
    eyebrow: { ar: 'اتصل بنا', fr: 'Contactez-nous' },
    title: { ar: 'تواصل معنا', fr: 'Parlons de votre projet' },
    subtitle: {
      ar: 'هل ترغب بالتواصل معنا؟ يسعدنا تلقي رسالتك. إليك كيفية الوصول إلينا…',
      fr: 'Vous souhaitez nous contacter ? Nous serons ravis de recevoir votre message. Voici comment nous joindre…',
    },
    phoneTitle: { ar: 'هل أنت مهتم بخدماتنا؟', fr: 'Intéressé par nos services ?' },
    phoneBody: {
      ar: 'ما عليك سوى الاتصال بنا عبر الهاتف أو واتساب، فريقنا متاح طوال أيام الأسبوع.',
      fr: 'Appelez-nous simplement par téléphone ou WhatsApp, notre équipe est disponible toute la semaine.',
    },
    emailTitle: { ar: 'تحتاج إلى مساعدة؟', fr: "Besoin d'un coup de main ?" },
    emailBody: {
      ar: 'أحيانًا تحتاج إلى القليل من المساعدة. لا تقلق، نحن هنا من أجلك.',
      fr: 'Parfois, un peu d’aide suffit. Ne vous inquiétez pas, nous sommes là pour vous.',
    },
    addressTitle: { ar: 'العنوان', fr: 'Adresse' },
    hoursTitle: { ar: 'ساعات العمل', fr: "Heures d'ouverture" },
    emailLabel: { ar: 'البريد الإلكتروني', fr: 'E-mail' },
    phoneLabel: { ar: 'الهاتف', fr: 'Téléphone' },
    formTitle: { ar: 'اتصل بنا', fr: 'Formulaire de contact' },
    formSubtitle: {
      ar: 'املأ النموذج أدناه وسيتواصل معك فريقنا في غضون 24 ساعة.',
      fr: 'Remplissez le formulaire ci-dessous : notre équipe vous contactera dans les 24 heures.',
    },
    name: { ar: 'اسمك الكامل', fr: 'Votre nom complet' },
    namePlaceholder: { ar: 'مثال: محمد العلوي', fr: 'Ex. : Mohamed Alaoui' },
    email: { ar: 'بريدك الإلكتروني', fr: 'Votre e-mail' },
    emailPlaceholder: { ar: 'name@example.com', fr: 'nom@exemple.com' },
    phone: { ar: 'الهاتف', fr: 'Téléphone' },
    phonePlaceholder: { ar: '+212 6 00 00 00 00', fr: '+212 6 00 00 00 00' },
    city: { ar: 'المدينة', fr: 'Ville' },
    cityPlaceholder: { ar: 'طنجة', fr: 'Tanger' },
    subject: { ar: 'الموضوع', fr: 'Sujet' },
    subjectPlaceholder: { ar: 'اختر موضوعًا', fr: 'Choisissez un sujet' },
    message: { ar: 'رسالتك', fr: 'Votre message' },
    messagePlaceholder: {
      ar: 'اشرح لنا مشروعك بإيجاز: نوع المبنى، المساحة، الخدمات المطلوبة…',
      fr: 'Décrivez brièvement votre projet : type de bâtiment, surface, services souhaités…',
    },
    optional: { ar: 'اختياري', fr: 'optionnel' },
    required: { ar: 'إلزامي', fr: 'obligatoire' },
    send: { ar: 'إرسال الرسالة', fr: 'Envoyer le message' },
    sending: { ar: 'جارٍ الإرسال…', fr: 'Envoi en cours…' },
    privacy: {
      ar: 'نحن نحترم خصوصيتك. لا نرسل رسائل مزعجة ولا نشارك بياناتك مع أي طرف ثالث.',
      fr: 'Nous respectons votre vie privée. Aucun spam, aucune donnée partagée avec des tiers.',
    },
    consent: {
      ar: 'أوافق على معالجة بياناتي للتواصل معي بخصوص طلبي.',
      fr: 'J’accepte que mes données soient traitées pour me recontacter au sujet de ma demande.',
    },
    successTitle: { ar: 'تم إرسال رسالتك بنجاح!', fr: 'Votre message a bien été envoyé !' },
    successBody: {
      ar: 'شكرًا لتواصلك مع أطلس تك كونسيبت. سيتواصل معك فريقنا في غضون 24 ساعة.',
      fr: 'Merci d’avoir contacté Atlas Tech Concept. Notre équipe vous répondra dans les 24 heures.',
    },
    errorTitle: { ar: 'تعذّر إرسال الرسالة', fr: "L'envoi a échoué" },
    errorBody: {
      ar: 'يرجى التحقق من البيانات المدخلة والمحاولة مجددًا، أو الاتصال بنا مباشرة.',
      fr: 'Veuillez vérifier vos informations et réessayer, ou nous appeler directement.',
    },
    sendAnother: { ar: 'إرسال رسالة أخرى', fr: 'Envoyer un autre message' },
    errName: { ar: 'يرجى إدخال اسمك.', fr: 'Veuillez saisir votre nom.' },
    errEmail: { ar: 'يرجى إدخال بريد إلكتروني صحيح.', fr: 'Veuillez saisir un e-mail valide.' },
    errPhone: { ar: 'يرجى إدخال رقم هاتف صحيح.', fr: 'Veuillez saisir un numéro valide.' },
    errSubject: { ar: 'يرجى اختيار الموضوع.', fr: 'Veuillez choisir un sujet.' },
    errMessage: {
      ar: 'يرجى كتابة رسالتك (20 حرفًا على الأقل).',
      fr: 'Veuillez écrire votre message (20 caractères min.).',
    },
    errConsent: { ar: 'يرجى الموافقة على معالجة البيانات.', fr: 'Veuillez accepter le traitement des données.' },
    subjects: [
      { ar: 'طلب عرض سعر', fr: 'Demande de devis' },
      { ar: 'خدمات الكهرباء', fr: 'Services électriques' },
      { ar: 'السباكة وشبكات المياه', fr: 'Plomberie et réseaux d’eau' },
      { ar: 'التدفئة المركزية', fr: 'Chauffage central' },
      { ar: 'التكييف والتهوية', fr: 'Climatisation et ventilation' },
      { ar: 'الطاقة الشمسية', fr: 'Énergie solaire' },
      { ar: 'التجهيز الداخلي والتشطيب', fr: 'Aménagement intérieur et finition' },
      { ar: 'شراء منتجات', fr: 'Achat de produits' },
      { ar: 'طلب صيانة', fr: 'Demande de maintenance' },
      { ar: 'موضوع آخر', fr: 'Autre sujet' },
    ],
    mapTitle: { ar: 'موقعنا على الخريطة', fr: 'Nous situer sur la carte' },
    mapNote: {
      ar: 'مقرنا الرئيسي في طنجة، على شارع مولاي إسماعيل.',
      fr: 'Notre siège est à Tanger, avenue Moulay Ismaïl.',
    },
    findUs: {
      ar: 'يمكنك دائمًا زيارتنا في مقرنا الرئيسي، حيث ستجد فريق عمل ودودًا وقهوة لذيذة.',
      fr: 'Vous pouvez toujours nous rendre visite à notre siège : vous y trouverez une équipe sympathique et un bon café.',
    },
    buildTogether: {
      ar: 'لا تتردد في التواصل مع ممثلنا في أي وقت، عبر نموذج الاتصال على موقعنا أو بالاتصال بأحد أرقامنا. دعونا نبني مستقبلك معًا.',
      fr: 'N’hésitez pas à contacter notre représentant à tout moment, via le formulaire de contact ou par téléphone. Construisons votre avenir ensemble.',
    },
  },

  footer: {
    about: {
      ar: 'شركة أطلس تك كونسيبت متخصصة في تقديم الحلول التقنية المتكاملة للمباني، تشمل أعمال الكهرباء والسباكة والتكييف والتدفئة المركزية والطاقة الشمسية، بالإضافة إلى خدمات التصميم والتجهيز الداخلي. نلتزم بتقديم خدمات عالية الجودة وحلول مبتكرة تلبي احتياجات عملائنا وتواكب أحدث التقنيات.',
      fr: "Atlas Tech Concept est spécialisée dans les solutions techniques intégrées pour le bâtiment : électricité, plomberie, climatisation, chauffage central et énergie solaire, ainsi que le design et l'aménagement intérieur. Nous nous engageons à fournir des services de haute qualité et des solutions innovantes, en phase avec les technologies les plus récentes.",
    },
    quickLinks: { ar: 'روابط سريعة', fr: 'Liens rapides' },
    ourServices: { ar: 'خدماتنا', fr: 'Nos services' },
    ourProducts: { ar: 'منتجاتنا', fr: 'Nos produits' },
    contact: { ar: 'معلومات الاتصال', fr: 'Coordonnées' },
    newsletter: { ar: 'النشرة البريدية', fr: 'Newsletter' },
    newsletterBody: {
      ar: 'اشترك لتصلك عروضنا ونصائحنا التقنية. لا رسائل مزعجة.',
      fr: 'Abonnez-vous pour recevoir nos offres et conseils techniques. Pas de spam.',
    },
    emailPlaceholder: { ar: 'بريدك الإلكتروني', fr: 'Votre e-mail' },
    subscribe: { ar: 'اشترك', fr: "S'abonner" },
    subscribed: { ar: 'شكرًا لاشتراكك!', fr: 'Merci pour votre inscription !' },
    rights: { ar: 'جميع الحقوق محفوظة.', fr: 'Tous droits réservés.' },
    companyLegal: { ar: 'شركة أطلس تك كونسيبت', fr: 'Atlas Tech Concept SARL' },
    madeIn: { ar: 'صُنع في المغرب', fr: 'Fait au Maroc' },
    legal: { ar: 'المعلومات القانونية', fr: 'Mentions légales' },
    terms: { ar: 'شروط الاستخدام', fr: "Conditions d'utilisation" },
    privacy: { ar: 'سياسة الخصوصية', fr: 'Politique de confidentialité' },
    cookies: { ar: 'ملفات تعريف الارتباط', fr: 'Cookies' },
    sitemap: { ar: 'خريطة الموقع', fr: 'Plan du site' },
  },

  cookies: {
    title: { ar: 'نحن نستخدم ملفات تعريف الارتباط', fr: 'Nous utilisons des cookies' },
    body: {
      ar: 'يستخدم هذا الموقع ملفات تعريف الارتباط ليقدم لك تجربة تصفح أفضل. من خلال تصفح هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      fr: 'Ce site utilise des cookies pour vous offrir une meilleure expérience de navigation. En poursuivant, vous acceptez notre utilisation des cookies.',
    },
    accept: { ar: 'قبول', fr: 'Accepter' },
    decline: { ar: 'رفض', fr: 'Refuser' },
    more: { ar: 'المزيد من المعلومات', fr: "Plus d'informations" },
  },

  notFound: {
    title: { ar: 'الصفحة غير موجودة', fr: 'Page introuvable' },
    body: {
      ar: 'عذرًا، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.',
      fr: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    },
    cta: { ar: 'العودة إلى الرئيسية', fr: "Retour à l'accueil" },
  },

  seo: {
    defaultTitle: {
      ar: 'أطلس تك كونسيبت | حلول هندسية متكاملة في المغرب',
      fr: 'Atlas Tech Concept | Solutions techniques intégrées au Maroc',
    },
    defaultDescription: {
      ar: 'شركة أطلس تك كونسيبت — كهرباء، سباكة، تكييف، تدفئة مركزية، طاقة شمسية وتشطيب داخلي. طنجة، المغرب. دراسة، تركيب، صيانة وضمان.',
      fr: "Atlas Tech Concept — électricité, plomberie, climatisation, chauffage central, énergie solaire et aménagement intérieur. Tanger, Maroc. Étude, installation, maintenance et garantie.",
    },
  },
} as const;

/** Convenience type: any leaf entry of `ui` that is bilingual. */
export type UIValue = Localized;
