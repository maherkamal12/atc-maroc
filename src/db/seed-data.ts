const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const heroImages = {
  solar: img(33379360),
  interior: img(7045316),
  electrical: img(34526423),
};

export const serviceSeed = [
  {
    slug: "electricite",
    titleAr: "الكهرباء",
    titleFr: "Électricité",
    shortAr:
      "لوحات كهربائية، تمديدات، إنارة، حماية، تأريض وإصلاح الأعطال. تصميم حسب الاستخدام والمعايير.",
    shortFr:
      "Tableaux électriques, câblage, éclairage, protection, mise à la terre et dépannage. Conception selon l'usage et les normes.",
    bodyAr:
      "نغطي كامل الأشغال الكهربائية للمشاريع السكنية والتجارية والصناعية: دراسة وتصميم الشبكة، تركيب اللوحات الرئيسية والفرعية، التمديدات داخل الجدران والأسقف، أنظمة الإنارة الداخلية والخارجية، أنظمة الحماية والتأريض، بالإضافة إلى الصيانة الدورية وإصلاح الأعطال في أسرع وقت.\nكل الأشغال تُنفذ بمواد مطابقة للمعايير المغربية والدولية مع تقارير اختبار وتشغيل عند التسليم.",
    bodyFr:
      "Nous couvrons l'ensemble des travaux électriques des projets résidentiels, commerciaux et industriels : étude et conception du réseau, installation des tableaux principaux et divisionnaires, câblage encastré, éclairage intérieur et extérieur, systèmes de protection et mise à la terre, ainsi que la maintenance préventive et le dépannage rapide.\nTous les travaux sont réalisés avec des matériaux conformes aux normes marocaines et internationales, avec rapports d'essai et de mise en service à la livraison.",
    bulletsAr:
      "لوحات كهربائية رئيسية وفرعية|تمديدات وطرق معزولة|إنارة داخلية وخارجية ذكية|حماية وصواعق وتأريض|كشف وإصلاح الأعطال",
    bulletsFr:
      "Tableaux principaux et divisionnaires|Câblage et chemins de câbles|Éclairage intérieur et extérieur intelligent|Protection, paratonnerre et mise à la terre|Détection et réparation de pannes",
    image: img(34526423),
    icon: "⚡",
    sort: 1,
  },
  {
    slug: "plomberie",
    titleAr: "السباكة والمياه",
    titleFr: "Plomberie et réseaux d'eau",
    shortAr:
      "تمديدات الماء الصالح للشرب والصرف الصحي، مضخات الضخ، شبكات المياه وحلول منع التسريب مع تشطيب نظيف وصيانة سهلة.",
    shortFr:
      "Alimentation et évacuation, pompes de surpression, réseaux d'eau et solutions anti-fuites. Finition propre et maintenance facile.",
    bodyAr:
      "من تصميم شبكات المياه إلى التركيب والصيانة: تمديدات الماء الصالح للشرب بالمقياس PEX وPPR، شبكات الصرف الصحي والتهوية، مضخات الضخ والمحطات الفردية، سخانات المياه، محطات معالجة وتصفية المياه، وكشف التسريبات بأجهزة دقيقة دون تكسير.\nنضمن تشطيباً نظيفاً ومواد ذات جودة عالية تسمح بصيانة سهلة على المدى الطويل.",
    bodyFr:
      "De la conception des réseaux à l'installation et la maintenance : alimentation en eau potable en PEX et PPR, réseaux d'évacuation et de ventilation, pompes de surpression et stations individuelles, chauffe-eau, stations de traitement et de filtration, ainsi que la détection de fuites par équipements de précision sans destruction.\nNous garantissons une finition propre et des matériaux de qualité permettant un entretien facile à long terme.",
    bulletsAr:
      "شبكات الماء الصالح للشرب|الصرف الصحي والتهوية|مضخات الضخ والمحطات|كشف التسريبات بدقة|تسخين المياه وتصفيتها",
    bulletsFr:
      "Réseaux d'eau potable|Évacuation et ventilation|Pompes de surpression|Détection précise des fuites|Chauffe-eau et filtration",
    image: img(6419128),
    icon: "🚰",
    sort: 2,
  },
  {
    slug: "chauffage",
    titleAr: "التدفئة المركزية",
    titleFr: "Chauffage central",
    shortAr:
      "مراجل، مشعات، تدفئة أرضية وشبكات هيدروليكية مع تحكم ذكي لمزيد من الراحة والاقتصاد في الاستهلاك.",
    shortFr:
      "Chaudières, radiateurs, chauffage au sol et réseaux hydrauliques. Contrôle intelligent pour plus de confort et d'économies.",
    bodyAr:
      "نقوم بدراسة الحاجة الحرارية للمبنى (Bilan thermique) واختيار المرجل المناسب بالغاز أو الديزل أو المضخة الحرارية، ثم تركيب شبكة المشعات أو التدفئة الأرضية، مع عزل الشبكات وأنابيب متعددة الطبقات.\nنضيف أنظمة تحكم ذكية (ترموستات غرفة، برمجة أسبوعية، تحكم عن بعد) لتقليص الاستهلاك مع الحفاظ على درجة الراحة المطلوبة.",
    bodyFr:
      "Nous réalisons le bilan thermique du bâtiment et sélectionnons la chaudière adaptée (gaz, fioul ou pompe à chaleur), puis installons le réseau de radiateurs ou le chauffage au sol, avec isolation des réseaux et tubes multicouches.\nNous intégrons des systèmes de régulation intelligents (thermostat d'ambiance, programmation hebdomadaire, pilotage à distance) pour réduire la consommation tout en conservant le confort souhaité.",
    bulletsAr:
      "دراسة الحاجة الحرارية|مراجل غاز وديزل ومضخات حرارية|تدفئة أرضية ومشعات|عزل الشبكات|تحكم ذكي وبرمجة",
    bulletsFr:
      "Bilan thermique|Chaudières gaz, fioul et PAC|Chauffage au sol et radiateurs|Isolation des réseaux|Régulation intelligente",
    image: img(29226620),
    icon: "🔥",
    sort: 3,
  },
  {
    slug: "climatisation",
    titleAr: "التكييف والتهوية",
    titleFr: "Climatisation et ventilation",
    shortAr:
      "أجهزة سبليت، أنظمة VRV/VRF، أنظمة مدمجة في الأسقف، تهوية ميكانيكية وشفط. دراسة تدفق الهواء واختيار الأجهزة المناسبة.",
    shortFr:
      "Split, VRV/VRF, systèmes gainables, ventilation mécanique et extraction. Étude du flux d'air et choix des équipements adaptés.",
    bodyAr:
      "نوفر حلول تكييف وتلطيف هواء للمنازل والمكاتب والمحلات التجارية والفنادق: أجهزة سبليت جدارية، سبليت مدمج، أنظمة VRF متعددة الوحدات، تكييف مركزي بقنوات، تهوية ميكانيكية مزدوجة التدفق (VMC) وشفط المطابخ والحمامات.\nدراسة تدفق الهواء وحساب الأحمال الحرارية تضمن اختيار جهاز بمردودية عالية واستهلاك معقول مع صيانة دورية.",
    bodyFr:
      "Nous proposons des solutions de climatisation pour logements, bureaux, commerces et hôtels : splits muraux, splits gainables, systèmes VRF multi-unités, climatisation centrale par gaines, ventilation mécanique double flux (VMC) et extraction de cuisines et salles de bains.\nL'étude du flux d'air et le calcul des charges therm garantissent un équipement à haut rendement, une consommation maîtrisée et un entretien régulier.",
    bulletsAr:
      "سبليت جداري ومدمج|أنظمة VRF وVRV|تكييف مركزي بالقنوات|تهوية ميكانيكية VMC|صيانة وتزويد بالغاز",
    bulletsFr:
      "Split mural et gainable|Systèmes VRF et VRV|Climatisation centrale par gaines|VMC double flux|Maintenance et recharge de gaz",
    image: img(7347538),
    icon: "❄️",
    sort: 4,
  },
  {
    slug: "solaire",
    titleAr: "الطاقة الشمسية",
    titleFr: "Énergie solaire",
    shortAr:
      "دراسة، تركيب ومتابعة: ألواح شمسية، محولات وبطاريات. استهلاك ذاتي وتحسين المردودية.",
    shortFr:
      "Étude, installation et suivi : panneaux, onduleurs et batteries. Autoconsommation et optimisation du rendement.",
    bodyAr:
      "نرافق مشاريع الطاقة الشمسية من الدراسة إلى التشغيل: تحليل الاستهلاك، حساب عدد الألواح والقدرة المطلوبة، اختيار المحول (On-grid / Off-grid / Hybrid)، تركيب البطاريات الليثيوم، أنظمة التثبيت على الأسطح والأرض، بالإضافة إلى الحماية الكهربائية والمراقبة عن بعد.\nحلول الاستهلاك الذاتي تساعد على تقليص فاتورة الكهرباء بنسبة تصل إلى 70% مع استرداد الاستثمار في مدة معقولة.",
    bodyFr:
      "Nous accompagnons les projets solaires de l'étude à la mise en service : analyse de la consommation, dimensionnement des panneaux et de la puissance, choix de l'onduleur (On-grid / Off-grid / Hybride), installation de batteries lithium, structures de fixation sur toiture et en champ, protection électrique et monitoring à distance.\nLes solutions d'autoconsommation permettent de réduire la facture d'électricité jusqu'à 70% avec un retour sur investissement rapide.",
    bulletsAr:
      "دراسة وتحليل الاستهلاك|ألواح كهروضوئية عالية المردودية|محولات هجينة ومتصلة بالشبكة|بطاريات ليثيوم|مراقبة وتتبع عن بعد",
    bulletsFr:
      "Étude et analyse de consommation|Panneaux photovoltaïques haut rendement|Onduleurs hybrides et on-grid|Batteries lithium|Monitoring et suivi à distance",
    image: img(11644973),
    icon: "☀️",
    sort: 5,
  },
  {
    slug: "amenagement",
    titleAr: "التجهيز الداخلي والتشطيب",
    titleFr: "Aménagement intérieur et finition",
    shortAr:
      "جدران، أسقف مستعارة، أرضيات وطلاء، نجارة، أبواب، مطابخ وحمامات. تفاصيل دقيقة وتشطيب ممتاز.",
    shortFr:
      "Cloisons, faux plafonds, sols et revêtements, menuiserie, portes, cuisines et salles de bains. Détails soignés et finition excellente.",
    bodyAr:
      "أشغال التجهيز والتشطيب بمعايير عالية: الجدران والقواطع، الأسقف المستعارة والجبس، الأرضيات والباركي والزليج، النجارة والأبواب والنوافذ، المطابخ المجهزة، الحمامات والدشات، الطلاء والديكور النهائي.\nنتحكم في الجودة عبر مراحل تسليم جزئية وتنسيق بين كل الفرقاء لتفادي التأخير وإعادة العمل.",
    bodyFr:
      "Travaux d'aménagement et de finition de haute qualité : cloisons et doublages, faux plafonds et placoplâtre, sols, parquet et carrelage, menuiserie, portes et fenêtres, cuisines équipées, salles de bains et douches, peinture et décoration finale.\nNous maîtrisons la qualité par des livraisons partielles et une coordination de tous les corps de métier pour éviter retards et reprises.",
    bulletsAr:
      "قواطع وأسقف مستعارة|أرضيات وباركي وزليج|نجارة وأبواب|مطابخ وحمامات مجهزة|طلاء وتشطيب نهائي",
    bulletsFr:
      "Cloisons et faux plafonds|Sols, parquet et carrelage|Menuiserie et portes|Cuisines et salles de bains|Peinture et finition",
    image: img(35539075),
    icon: "🧱",
    sort: 6,
  },
  {
    slug: "design",
    titleAr: "التصميم والتزيين",
    titleFr: "Design et décoration",
    shortAr:
      "تصميم داخلي عصري، تنسيق ديكور احترافي وتصميم خارجي مميز يعكس هوية المكان.",
    shortFr:
      "Design intérieur moderne, décoration professionnelle et design extérieur remarquable.",
    bodyAr:
      "قسمنا المخصص للتصميم الداخلي والتزيين يقدم خدمات المخططات ثلاثية الأبعاد، اختيار الألوان والخامات، تنسيق الأثاث والإضاءة والإكسسوارات، وتصميم الواجهات والمساحات الخارجية.\nنعمل على تحقيق توازن بين الجمال والوظيفة والميزانية، مع تقديم تصور واقعي قبل بدء الأشغال.",
    bodyFr:
      "Notre département design intérieur propose des plans 3D, le choix des couleurs et matériaux, la coordination du mobilier, de l'éclairage et des accessoires, ainsi que la conception des façades et espaces extérieurs.\nNous recherchons l'équilibre entre esthétique, fonctionnalité et budget, avec une visualisation réaliste avant le démarrage des travaux.",
    bulletsAr:
      "مخططات ثلاثية الأبعاد|اختيار الألوان والخامات|تنسيق الأثاث والإضاءة|تصميم الواجهات|متابعة التنفيذ",
    bulletsFr:
      "Plans 3D|Choix des couleurs et matériaux|Coordination mobilier et éclairage|Design de façades|Suivi de réalisation",
    image: img(19966810),
    icon: "🎨",
    sort: 7,
  },
];

export const postSeed = [
  {
    slug: "dimensionner-installation-solaire-maroc",
    titleAr: "كيف تحدد حجم منشأة الطاقة الشمسية المنزلية في المغرب؟",
    titleFr: "Comment dimensionner une installation solaire résidentielle au Maroc ?",
    excerptAr:
      "دليل عملي لحساب عدد الألواح والقدرة اللازمة للاستهلاك الذاتي وتقليص فاتورة الكهرباء.",
    excerptFr:
      "Guide pratique pour calculer le nombre de panneaux et la puissance nécessaire à l'autoconsommation.",
    bodyAr:
      "يبدأ تحديد حجم المنشأة الشمسية من قراءة الفاتورة الشهرية ومعدل الاستهلاك بالكيلوواط/ساعة. في المتوسط، يحتاج المنزل المغربي إلى ما بين 3 و6 كيلوواط لتغطية جزء كبير من استهلاكه.\nالمرحلة الثانية هي حساب الإشعاع الشمسي للمنطقة، فمدينة طنجة أو أكادير لا تعطيان نفس المردودية على مدار السنة. نحسب بعدها عدد الألواح بقدرة 550 واط، ثم نختار المحول المناسب (هجين أو متصل بالشبكة) وأخيراً حجم البطارية إن كانت الحاجة للاستقلالية.\nلا تنسَ الجانب الهيكلي: قوة الرياح في الشمال المغربي تفرض هياكل تثبيت مقاومة وتثبيتاً محكماً على السطح.",
    bodyFr:
      "Le dimensionnement d'une installation solaire commence par la lecture de la facture mensuelle et de la consommation en kWh. En moyenne, un logement marocain a besoin de 3 à 6 kW pour couvrir une grande partie de ses besoins.\nLa deuxième étape est le calcul de l'irradiation de la région : Tanger et Agadir n'offrent pas le même rendement sur l'année. Nous déterminons ensuite le nombre de panneaux de 550W, puis l'onduleur adapté (hybride ou on-grid) et enfin la capacité de batterie si l'autonomie est recherchée.\nN'oubliez pas la partie structure : le vent dans le nord du Maroc impose des structures résistantes et une fixation soignée sur la toiture.",
    image: img(17965455),
    tagAr: "طاقة شمسية",
    tagFr: "Solaire",
    readMinutes: 6,
  },
  {
    slug: "normes-installation-electrique-logement",
    titleAr: "أهم معايير التمديدات الكهربائية في المسكن المغربي",
    titleFr: "Les normes essentielles d'une installation électrique au Maroc",
    excerptAr:
      "الحماية التفاضلية، التأريض، مقاطع الكوابل: ما يجب معرفته لتفادي المخاطر والأعطال.",
    excerptFr:
      "Différentiel, mise à la terre, sections de câbles : ce qu'il faut savoir pour éviter risques et pannes.",
    bodyAr:
      "التمديدات الكهربائية السليمة تبدأ من تقسيم الدارات: إنارة، مقابس، جهاز ثقيل (سخان، مكيف، فرن)، مع قاطع خاص لكل دارة.\nالحماية التفاضلية 30 مللي أمبير إلزامية في الدارات التي تخدم أماكن الرطوبة. أما التأريض فيجب أن يكون مستقلاً وقابلاً للقياس، مع مقاومة لا تتجاوز الحدود المسموح بها.\nاختيار مقطع الكابل مرتبط بشدة التيار: 2.5 مم² للمقابس، 1.5 مم² للإنارة، و6 مم² أو أكثر للأجهزة القوية. أخيراً، لا تهمل جودة اللوحة وترتيبها لتسهيل الصيانة.",
    bodyFr:
      "Une installation électrique saine commence par la division des circuits : éclairage, prises, appareils puissants (chauffe-eau, climatiseur, four), avec un disjoncteur dédié par circuit.\nLa protection différentielle 30mA est obligatoire pour les circuits desservant les locaux humides. La mise à la terre doit être indépendante, mesurable et présenter une résistance dans les limites admises.\nLe choix de la section dépend du courant : 2,5 mm² pour les prises, 1,5 mm² pour l'éclairage, 6 mm² ou plus pour les appareils puissants. Enfin, ne négligez pas la qualité et l'organisation du tableau pour faciliter la maintenance.",
    image: img(34526423),
    tagAr: "كهرباء",
    tagFr: "Électricité",
    readMinutes: 5,
  },
  {
    slug: "entretenir-climatiseur-ete",
    titleAr: "5 خطوات لصيانة المكيف قبل فصل الصيف",
    titleFr: "5 étapes pour entretenir votre climatiseur avant l'été",
    excerptAr: "صيانة بسيطة تطيل عمر الجهاز وتقليص استهلاك الكهرباء بنسبة ملموسة.",
    excerptFr: "Un entretien simple qui prolonge la durée de vie et réduit nettement la consommation.",
    bodyAr:
      "1) تنظيف الفلاتر كل شهرين؛ الفلتر المسدود يقلص تدفق الهواء ويزيد الاستهلاك. 2) تنظيف الوحدة الخارجية من الغبار والملح خاصة في المناطق الساحلية. 3) التحقق من مستوى الغاز وضغط التشغيل. 4) فحص الوصلات النحاسية والعزل الحراري. 5) تجربة التشغيل وقياس شدة التيار للتأكد من عمل الضاغط بشكل سليم.",
    bodyFr:
      "1) Nettoyez les filtres tous les deux mois : un filtre encrassé réduit le débit d'air et augmente la consommation. 2) Nettoyez l'unité extérieure de la poussière et du sel, surtout en zone côtière. 3) Vérifiez le niveau de gaz et la pression de fonctionnement. 4) Contrôlez les liaisons cuivre et l'isolation. 5) Testez la mise en route et mesurez l'intensité pour vérifier le bon fonctionnement du compresseur.",
    image: img(7347538),
    tagAr: "تكييف",
    tagFr: "Climatisation",
    readMinutes: 4,
  },
  {
    slug: "economiser-eau-plomberie",
    titleAr: "كيف تقلص فاتورة الماء دون التضحية بالراحة؟",
    titleFr: "Comment réduire sa facture d'eau sans sacrifier le confort ?",
    excerptAr: "من كشف التسريبات إلى الخلاطات الموفرة، حلول عملية للاستعمال الرشيد للماء.",
    excerptFr: "De la détection de fuites aux mitigeurs économes, des solutions concrètes.",
    bodyAr:
      "تسريب نقطة واحدة في الثانية يعني أكثر من 30 لتراً في اليوم. أول خطوة هي قراءة العداد بعد إغلاق كل الصنابير لمدة ساعتين لتحديد وجود تسريب.\nبعدها ننصح بتركيب خلاطات موفرة، رؤوس دش هوائية، صنابير بضغط متوازن، ومضخة ضخ مضبوطة لتفادي الضغط المفرط. كما أن إعادة تهيئة شبكة الصرف وتجديد الوصلات يحمي من الأضرار المائية المكلفة.",
    bodyFr:
      "Une goutte par seconde représente plus de 30 litres par jour. La première étape consiste à relever le compteur après avoir fermé tous les robinets pendant deux heures afin de détecter une fuite.\nNous recommandons ensuite l'installation de mitigeurs économes, de douchettes aéronomiques, de robinets à pression équilibrée et d'un surpresseur bien réglé pour éviter une pression excessive. La rénovation du réseau d'évacuation et des raccordements protège également contre des dégâts d'eau coûteux.",
    image: img(6419128),
    tagAr: "سباكة",
    tagFr: "Plomberie",
    readMinutes: 4,
  },
  {
    slug: "chauffage-au-sol-ou-radiateurs",
    titleAr: "تدفئة أرضية أم مشعات؟ مقارنة عملية",
    titleFr: "Chauffage au sol ou radiateurs ? Comparatif pratique",
    excerptAr: "الراحة، سرعة التسخين، الاستهلاك وكلفة التركيب: أي حل يناسب مشروعك؟",
    excerptFr: "Confort, montée en température, consommation et coût d'installation.",
    bodyAr:
      "التدفئة الأرضية تمنح راحة حرارية متجانسة ولا تشغل أي مساحة في الجدران، لكنها تحتاج وقتاً أطول للتسخين وتتطلب عزلاً جيداً للأرضية.\nالمشعات ترفع الحرارة بسرعة وتكلفتها أقل، وهي مناسبة للتجديدات والمنازل المستعملة كإقامة ثانوية.\nالحل الأمثل غالباً هجين: تدفئة أرضية في الطابق الأرضي والمساحات الواسعة، ومشعات في الغرف والطوابق العليا، مع ترموستات لكل منطقة.",
    bodyFr:
      "Le chauffage au sol offre un confort homogène et libère les murs, mais demande plus de temps pour monter en température et une bonne isolation du sol.\nLes radiateurs chauffent vite et coûtent moins cher à installer : ils conviennent aux rénovations et aux résidences secondaires.\nLa meilleure solution est souvent hybride : plancher chauffant au rez-de-chaussée et dans les grandes surfaces, radiateurs dans les chambres, avec un thermostat par zone.",
    image: img(29226620),
    tagAr: "تدفئة",
    tagFr: "Chauffage",
    readMinutes: 5,
  },
];
