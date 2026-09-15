import type { Localized } from '@/lib/i18n';

export type ServiceScopeItem = {
  icon: string;
  title: Localized;
  body: Localized;
};

export type ServiceFaq = { q: Localized; a: Localized };

export type Service = {
  slug: string;
  /** lucide-react icon name */
  icon: string;
  /** tailwind colour family used for accents on this service */
  tone: 'amber' | 'sky' | 'rose' | 'orange' | 'emerald' | 'violet';
  image: string;
  gallery: string[];
  title: Localized;
  short: Localized;
  tagline: Localized;
  intro: Localized;
  /** Detailed narrative paragraphs */
  body: Localized[];
  scope: ServiceScopeItem[];
  bullets: Localized[];
  benefits: Localized[];
  deliverables: Localized[];
  faq: ServiceFaq[];
  keywords: Localized;
};

export const services: Service[] = [
  {
    slug: 'electricite',
    icon: 'Zap',
    tone: 'amber',
    image: '/images/services/electricite.jpg',
    gallery: [
      '/images/services/electricite.jpg',
      '/images/services/electricite-2.jpg',
      '/images/services/electricite-3.jpg',
    ],
    title: { ar: 'الكهرباء', fr: 'Électricité' },
    short: {
      ar: 'لوحات كهربائية، تمديدات، إنارة، حماية، تأريض وإصلاح الأعطال. تصميم حسب الاستخدام والمعايير.',
      fr: 'Tableaux électriques, câblage, éclairage, protection, mise à la terre et dépannage. Conception selon l’usage et les normes.',
    },
    tagline: {
      ar: 'حلول كهربائية متكاملة بأعلى معايير الجودة والأمان',
      fr: 'Des solutions électriques complètes, au plus haut niveau de qualité et de sécurité',
    },
    intro: {
      ar: 'نقدّم في أطلس تك كونسيبت خدمات كهربائية متكاملة تغطي جميع احتياجات المشاريع، بدءًا من التصميم والتخطيط وصولًا إلى التنفيذ والصيانة. نعتمد على أحدث التقنيات وفريق متخصص لضمان أعلى مستويات الأمان والكفاءة، مع الالتزام التام بالمواصفات الفنية والمعايير الدولية.',
      fr: "Chez Atlas Tech Concept, nous proposons des services électriques complets couvrant tous les besoins des projets, de la conception et de la planification jusqu'à l'exécution et la maintenance. Nous nous appuyons sur les technologies les plus récentes et une équipe spécialisée pour garantir les plus hauts niveaux de sécurité et d'efficacité, dans le strict respect des spécifications techniques et des normes internationales.",
    },
    body: [
      {
        ar: 'تبدأ كل أعمالنا بدراسة الحمل الكهربائي للمبنى: حساب الاستطاعة الإجمالية، توزيع الدارات، تحديد مقاطع الكابلات، واختيار أجهزة الحماية المناسبة. هذه المرحلة هي التي تحدد أمان المنشأة على المدى الطويل وقدرتها على استقبال تجهيزات جديدة مستقبلًا دون إعادة تأهيل مكلفة.',
        fr: "Tous nos travaux commencent par une étude de la charge électrique du bâtiment : calcul de la puissance totale, répartition des circuits, détermination des sections de câbles et choix des dispositifs de protection adaptés. Cette étape conditionne la sécurité de l'installation sur le long terme et sa capacité à accueillir de nouveaux équipements sans réhabilitation coûteuse.",
      },
      {
        ar: 'نعمل وفق المعيار الدولي NF C 15-100 والمقتضيات المغربية الجاري بها العمل، ونُسلّم لكل عميل مخططات تنفيذية محدّثة للمنشأة (Dossier d’exécution) تسهّل أي تدخل أو توسيع لاحق.',
        fr: 'Nous travaillons selon la norme internationale NF C 15-100 et les exigences marocaines en vigueur, et nous remettons à chaque client un dossier d’exécution à jour, facilitant toute intervention ou extension ultérieure.',
      },
      {
        ar: 'نحرص كذلك على تقليل استهلاك الطاقة عبر اختيار إضاءة LED عالية المردودية، وتقنية التحكم في الإضاءة، وتصحيح معامل الاستطاعة (compensation d’énergie réactive) التي تخفّض الفاتورة الشهرية وتحسّن جودة الشبكة الداخلية.',
        fr: "Nous veillons également à réduire la consommation d'énergie par le choix d'un éclairage LED à haut rendement, la gestion de l'éclairage et la compensation d'énergie réactive, qui diminue la facture mensuelle et améliore la qualité du réseau interne.",
      },
    ],
    scope: [
      {
        icon: 'CircuitBoard',
        title: { ar: 'تركيب الأنظمة الكهربائية', fr: 'Installation des systèmes électriques' },
        body: {
          ar: 'تنفيذ شبكات الكهرباء للمباني السكنية والتجارية بأحدث المعايير: تمديدات مدمجة، أنابيب، علب توزيع وتوصيلات نهائية.',
          fr: 'Réalisation des réseaux électriques pour bâtiments résidentiels et commerciaux selon les normes les plus récentes : encastré, gaines, boîtes de dérivation et raccordements finaux.',
        },
      },
      {
        icon: 'LayoutDashboard',
        title: { ar: 'اللوحات الكهربائية والتوزيع', fr: 'Tableaux électriques et distribution' },
        body: {
          ar: 'تصميم وتجميع لوحات التوزيع الرئيسية والفرعية، قواطع تفاضلية، حماية من الصواعق، وتوازن الأحمال بين الأطوار.',
          fr: 'Conception et assemblage des tableaux de distribution principaux et divisionnaires, disjoncteurs différentiels, protection foudre et équilibrage des charges entre phases.',
        },
      },
      {
        icon: 'Wrench',
        title: { ar: 'الصيانة والإصلاح', fr: 'Maintenance et dépannage' },
        body: {
          ar: 'صيانة الأعطال الكهربائية وضمان استمرارية التشغيل بكفاءة: تشخيص بالكاميرا الحرارية، قياس التأريض، وتدخل سريع للطوارئ.',
          fr: 'Maintenance des pannes électriques et continuité de service : diagnostic par caméra thermique, mesure de terre et intervention rapide en urgence.',
        },
      },
      {
        icon: 'Lightbulb',
        title: { ar: 'حلول الإضاءة', fr: 'Solutions d’éclairage' },
        body: {
          ar: 'تصميم وتنفيذ أنظمة إضاءة حديثة موفرة للطاقة: إضاءة معمارية، إضاءة خارجية، وإضاءة طوارئ وفق المعايير.',
          fr: 'Conception et mise en œuvre de systèmes d’éclairage modernes et économes : éclairage architectural, extérieur et de sécurité conformément aux normes.',
        },
      },
      {
        icon: 'ShieldCheck',
        title: { ar: 'الحماية والتأريض', fr: 'Protection et mise à la terre' },
        body: {
          ar: 'أنظمة تأريض فعّالة، حماية من التيار الزائد والتسرب الأرضي، مانعات الصواعق، وتقارير قياس معتمدة.',
          fr: 'Systèmes de mise à la terre efficaces, protection contre les surintensités et les fuites à la terre, parafoudres et rapports de mesure.',
        },
      },
      {
        icon: 'Activity',
        title: { ar: 'التيار الضعيف والأنظمة الذكية', fr: 'Courants faibles et domotique' },
        body: {
          ar: 'شبكات الإنترنت والهاتف، كاميرات المراقبة، إنترفون، إنذار الحريق والسرقة، وأنظمة التحكم الآلي في المنزل.',
          fr: 'Réseaux informatiques et téléphoniques, vidéosurveillance, interphonie, alarme incendie et intrusion, et systèmes de domotique.',
        },
      },
    ],
    bullets: [
      { ar: 'تصميم المخططات الكهربائية ودراسة الأحمال قبل التنفيذ.', fr: 'Conception des schémas électriques et étude des charges avant exécution.' },
      { ar: 'تمديدات مدمجة في الجدران والأسقف بتشطيب نظيف.', fr: 'Câblage encastré dans les murs et plafonds, finition soignée.' },
      { ar: 'تركيب وتجميع اللوحات الكهربائية وبرمجة أجهزة الحماية.', fr: 'Installation et assemblage des tableaux, paramétrage des protections.' },
      { ar: 'تمديد شبكات التأريض وقياس مقاومتها بجهاز معاير.', fr: 'Mise en place des réseaux de terre et mesure de résistance au telluromètre étalonné.' },
      { ar: 'تركيب الإنارة الداخلية والخارجية وأنظمة إضاءة الطوارئ.', fr: "Pose de l'éclairage intérieur, extérieur et des blocs autonomes de sécurité." },
      { ar: 'ربط التجهيزات الثقيلة: مضخات، مكيفات، مصاعد، ولوحات المطبخ.', fr: 'Raccordement des équipements lourds : pompes, climatiseurs, ascenseurs, tableaux de cuisine.' },
      { ar: 'اختبارات العزل والاستمرارية وتسليم ملف تقني كامل.', fr: "Essais d'isolement et de continuité, remise d'un dossier technique complet." },
      { ar: 'تدخل سريع لإصلاح الأعطال والطوارئ.', fr: "Intervention rapide pour les pannes et les urgences." },
    ],
    benefits: [
      { ar: 'أمان تام للمنشأة والساكنين وفق NF C 15-100.', fr: 'Sécurité totale de l’installation et des occupants selon la NF C 15-100.' },
      { ar: 'فاتورة كهرباء أقل بفضل الإضاءة الموفرة وتصحيح معامل الاستطاعة.', fr: "Facture réduite grâce à l'éclairage économe et à la compensation d'énergie réactive." },
      { ar: 'مخططات محدّثة تسهّل أي صيانة أو توسعة مستقبلية.', fr: 'Plans à jour facilitant toute maintenance ou extension future.' },
      { ar: 'فريق كهربائيون مؤهلون ومؤمَّنون.', fr: 'Électriciens qualifiés et assurés.' },
      { ar: 'ضمان على الأشغال والمواد المستعملة.', fr: 'Garantie sur les travaux et les matériaux utilisés.' },
      { ar: 'احترام صارم لآجال التنفيذ المعتمدة.', fr: 'Respect strict des délais d’exécution convenus.' },
    ],
    deliverables: [
      { ar: 'مخططات تنفيذية ومخطط أحادي الخط (Schéma unifilaire).', fr: 'Plans d’exécution et schéma unifilaire.' },
      { ar: 'مذكرة حسابية للأحمال ومقاطع الكابلات.', fr: 'Note de calcul des charges et sections de câbles.' },
      { ar: 'محضر اختبارات العزل والتأريض.', fr: 'Procès-verbal des essais d’isolement et de terre.' },
      { ar: 'دليل الاستعمال وقائمة المعدات المركّبة.', fr: "Notice d'utilisation et nomenclature du matériel installé." },
    ],
    faq: [
      {
        q: { ar: 'هل تتدخلون في الإصلاحات الصغيرة؟', fr: 'Intervenez-vous sur les petits dépannages ?' },
        a: {
          ar: 'نعم، نتدخل في الأعطال الصغيرة كإصلاح قاطع أو مأخذ أو إضاءة، كما نتعامل مع المشاريع الكاملة. لا يوجد مشروع صغير جدًا.',
          fr: 'Oui, nous intervenons sur les petites pannes (disjoncteur, prise, éclairage) comme sur les projets complets. Aucun chantier n’est trop petit.',
        },
      },
      {
        q: { ar: 'هل تحصلون على رخصة الأشغال الكهربائية؟', fr: 'Obtenez-vous l’attestation de conformité électrique ?' },
        a: {
          ar: 'نعم، نُنجز المنشأة وفق المقتضيات المغربية ونسلّم كل الوثائق التقنية اللازمة للحصول على شهادة المطابقة.',
          fr: 'Oui, nous réalisons l’installation conformément à la réglementation marocaine et fournissons tous les documents techniques nécessaires à l’attestation de conformité.',
        },
      },
      {
        q: { ar: 'كم يستغرق تنفيذ كهرباء شقة؟', fr: 'Combien de temps pour l’électricité d’un appartement ?' },
        a: {
          ar: 'شقة بمتوسط 100 م² تستغرق عادة بين 5 و10 أيام عمل حسب عدد الدارات وحجم التمديدات.',
          fr: 'Un appartement de 100 m² demande généralement 5 à 10 jours ouvrés selon le nombre de circuits et l’ampleur des travaux.',
        },
      },
    ],
    keywords: {
      ar: 'كهربائي طنجة، تركيب لوحات كهربائية، صيانة كهربائية المغرب، تأريض، إضاءة LED',
      fr: 'électricien Tanger, tableau électrique, maintenance électrique Maroc, mise à la terre, éclairage LED',
    },
  },

  {
    slug: 'plomberie',
    icon: 'Droplets',
    tone: 'sky',
    image: '/images/services/plomberie.jpg',
    gallery: [
      '/images/services/plomberie.jpg',
      '/images/services/plomberie-2.jpg',
      '/images/services/plomberie-3.jpg',
    ],
    title: { ar: 'السباكة وشبكات المياه', fr: 'Plomberie et réseaux d’eau' },
    short: {
      ar: 'تغذية وتصريف، مضخات رفع الضغط، شبكات المياه، حلول مانعة للتسرب. تشطيب نظيف وصيانة سهلة.',
      fr: 'Alimentation et évacuation, pompes de surpression, réseaux d’eau et solutions anti-fuites. Finition propre et maintenance facile.',
    },
    tagline: {
      ar: 'شبكات مياه محكمة، نظيفة، وسهلة الصيانة',
      fr: 'Des réseaux d’eau étanches, propres et faciles à entretenir',
    },
    intro: {
      ar: 'نُنجز شبكات التغذية والتصريف للمشاريع السكنية والتجارية بمواد عالية الجودة وأنابيب معتمدة، مع دراسة الضغط والتدفق لضمان تدفّق منتظم في كل نقطة استعمال، حتى في الطوابق العلوية وفي أوقات الذروة.',
      fr: "Nous réalisons les réseaux d'alimentation et d'évacuation pour les projets résidentiels et commerciaux avec des matériaux de haute qualité et des tubes certifiés, en étudiant pression et débit pour garantir un écoulement régulier à chaque point d'usage, même aux étages supérieurs et aux heures de pointe.",
    },
    body: [
      {
        ar: 'تبدأ دراستنا بحساب احتياج الماء الساخن والبارد (تسخين فوري أو بمجمع)، تحديد الأقطار المناسبة، واختيار مضخة رفع الضغط ووعاء التمدد عند الحاجة. الشبكات المحسوبة بشكل صحيح تعني ضغطًا مستقرًا وأصواتًا أقل وعدم حدوث صدمات مائية (coup de bélier).',
        fr: "Notre étude commence par le calcul des besoins en eau chaude et froide (production instantanée ou par ballon), la détermination des diamètres adaptés et le choix du surpresseur et du vase d'expansion si nécessaire. Un réseau bien dimensionné, c'est une pression stable, moins de bruit et l'absence de coups de bélier.",
      },
      {
        ar: 'نستعمل أنابيب PPR و PEX المعتمدة للشبكات المدمجة، وأنابيب PVC و PEHD للتصريف والخارجي، مع لحام حراري دقيق واختبار ضغط إلزامي قبل ردم الجدران أو صبّ الأرضيات. هذا الاختبار هو ضمانتنا ضد التسربات المستقبلية.',
        fr: "Nous utilisons des tubes PPR et PEX certifiés pour les réseaux encastrés, et du PVC et PEHD pour l'évacuation et l'extérieur, avec une soudure thermique soignée et un test de pression obligatoire avant fermeture des murs ou coulage des dalles. Ce test est notre garantie contre les fuites futures.",
      },
      {
        ar: 'في التصريف، نحرص على الميلان الصحيح للأفقيات، وتركيب سيفونات هوائية لمنع الروائح، ومجاري ذات قطر كافٍ لتفادي الانسدادات المتكررة التي تكلّف العملاء كثيرًا على المدى الطويل.',
        fr: "En évacuation, nous veillons à la pente correcte des horizontales, à la pose de siphons et de ventilations primaires pour empêcher les remontées d'odeurs, et à des diamètres suffisants pour éviter les bouchages récurrents, si coûteux à long terme.",
      },
    ],
    scope: [
      {
        icon: 'Droplet',
        title: { ar: 'شبكات التغذية بالماء', fr: 'Réseaux d’alimentation en eau' },
        body: {
          ar: 'تمديد شبكات الماء البارد والساخن، تغذية الحمامات والمطابخ، وربط العدادات والخزانات علوية أو أرضية.',
          fr: 'Distribution eau froide et chaude, alimentation des salles de bains et cuisines, raccordement compteurs et réservoirs haute ou basse pression.',
        },
      },
      {
        icon: 'ArrowDownToLine',
        title: { ar: 'شبكات التصريف والصرف الصحي', fr: 'Évacuation et assainissement' },
        body: {
          ar: 'مجاري داخلية وخارجية، ربط بالشبكة العمومية، أحواض التفتيش، وحلول التصريف للمناطق بدون شبكة عامة (فوسات سبورت).',
          fr: 'Réseaux intérieurs et extérieurs, raccordement au réseau public, regards de visite et solutions pour zones non raccordées (fosse septique).',
        },
      },
      {
        icon: 'Gauge',
        title: { ar: 'مضخات رفع الضغط', fr: 'Pompes de surpression' },
        body: {
          ar: 'حساب واختيار وتركيب مجموعات الضخ، خزانات الضغط، ومحولات التردد لتوفير الطاقة واستقرار الضغط.',
          fr: 'Étude, sélection et pose de groupes de surpression, réservoirs à vessie et variateurs de fréquence pour économiser l’énergie et stabiliser la pression.',
        },
      },
      {
        icon: 'Waves',
        title: { ar: 'معالجة المياه وتليينها', fr: 'Traitement et adoucissement de l’eau' },
        body: {
          ar: 'مرشحات، أجهزة تليين، فلاتر مضادة للشوائب والكلور، وأنظمة تقليل عُسر الماء لحماية الأجهزة والمبادلات الحرارية.',
          fr: 'Filtres, adoucisseurs, filtration anti-impuretés et anti-chlore, et réduction de la dureté pour protéger les équipements et les échangeurs thermiques.',
        },
      },
      {
        icon: 'ShowerHead',
        title: { ar: 'التجهيزات الصحية والتشطيب', fr: 'Sanitaires et finitions' },
        body: {
          ar: 'تركيب السخانات، أطقم الحمامات، المغاسل، الدشّات، والمراحيض المعلّقة مع تثبيت مخفي وأنيق.',
          fr: 'Pose de chauffe-eau, ensembles sanitaires, lavabos, douches et WC suspendus, avec fixation encastrée et rendu esthétique.',
        },
      },
      {
        icon: 'Search',
        title: { ar: 'كشف التسربات وإصلاحها', fr: 'Détection et réparation de fuites' },
        body: {
          ar: 'كشف التسربات دون تكسير بطرق صوتية وحرارية، إصلاح دقيق، ثم إعادة الترميم بتشطيب مطابق للأصل.',
          fr: 'Détection de fuites sans casse par méthodes acoustiques et thermiques, réparation précise puis remise en état à l’identique.',
        },
      },
    ],
    bullets: [
      { ar: 'دراسة الأقطار والتدفق لكل نقطة استعمال.', fr: 'Dimensionnement des diamètres et débits pour chaque point d’usage.' },
      { ar: 'تمديدات داخلية مدمجة في الجدران والأرضيات.', fr: 'Réseaux encastrés dans les murs et les dalles.' },
      { ar: 'لحام حراري لأنابيب PPR و PEX مع اختبار ضغط إلزامي.', fr: 'Soudure thermique PPR et PEX avec test de pression obligatoire.' },
      { ar: 'شبكات تصريف بميلان مدروس وتهوية لمنع الروائح.', fr: 'Évacuations à pente étudiée et ventilation anti-odeurs.' },
      { ar: 'خزانات ومجموعات ضخ وربط أنظمة التسخين الشمسي.', fr: 'Réservoirs, groupes de surpression et raccordement au chauffe-eau solaire.' },
      { ar: 'تجهيز مطابخ وحمامات كامل مع تثبيت المخفي.', fr: 'Équipement complet de cuisines et salles de bains avec fixations encastrées.' },
      { ar: 'تجربة الشبكة قبل التسليم وتقرير مصوّر.', fr: 'Mise en épreuve du réseau avant réception avec rapport photographique.' },
      { ar: 'عقد صيانة دورية يشمل فحص المضخات والسخانات.', fr: 'Contrat de maintenance périodique incluant le contrôle des pompes et chauffe-eau.' },
    ],
    benefits: [
      { ar: 'ضغط مستقر في كل الطوابق دون تقلّب أثناء الاستعمال.', fr: 'Pression stable à tous les étages, sans variation en usage simultané.' },
      { ar: 'اختبار ضغط موثّق قبل إغلاق الجدران = صفر تسربات مفاجئة.', fr: 'Test de pression documenté avant fermeture des murs : zéro fuite surprise.' },
      { ar: 'مواد معتمدة صالحة لمياه الشرب ومقاومة للكلس.', fr: 'Matériaux certifiés aptes à l’eau potable et résistants au calcaire.' },
      { ar: 'صيانة سهلة بفضل نقاط عزل وقواطع محكمة.', fr: 'Maintenance facilitée par des vannes d’isolement à chaque zone.' },
      { ar: 'تقليل استهلاك الماء والكهرباء بصنابير وتجهيزات فعالة.', fr: 'Réduction de la consommation d’eau et d’électricité grâce à des équipements efficaces.' },
      { ar: 'تشطيب نظيف يحافظ على جمالية المكان.', fr: 'Finitions propres qui préservent l’esthétique des lieux.' },
    ],
    deliverables: [
      { ar: 'مخطط شبكة التغذية والتصريف.', fr: 'Plan du réseau d’alimentation et d’évacuation.' },
      { ar: 'محضر اختبار الضغط قبل الإغلاق.', fr: 'Procès-verbal du test de pression avant fermeture.' },
      { ar: 'قائمة المعدات والتجهيزات المركّبة.', fr: 'Nomenclature des équipements installés.' },
      { ar: 'شهادة ضمان على الأشغال.', fr: 'Attestation de garantie sur les travaux.' },
    ],
    faq: [
      {
        q: { ar: 'هل تكشفون عن تسرب الماء دون تكسير؟', fr: 'Détectez-vous les fuites sans casser ?' },
        a: {
          ar: 'نعم، نستعمل أجهزة كشف صوتية وحرارية لتحديد مكان التسرب بدقة قبل أي عملية تكسير، ما يقلّل التلف والتكلفة.',
          fr: 'Oui, nous utilisons des détecteurs acoustiques et thermiques pour localiser précisément la fuite avant toute casse, ce qui réduit les dégâts et le coût.',
        },
      },
      {
        q: { ar: 'هل تصلحون انسداد المجاري؟', fr: 'Débouchez-vous les canalisations ?' },
        a: {
          ar: 'نعم، نتدخل بتنظيف بالضغط العالي أو بالآلة الحلزونية، ونقوم بتصوير المجرى بالكاميرا عند الحاجة لتحديد السبب الجذري.',
          fr: 'Oui, nous intervenons par hydrocurage haute pression ou furet, avec inspection caméra si nécessaire pour identifier la cause profonde.',
        },
      },
      {
        q: { ar: 'ما مدة ضمان شبكة السباكة؟', fr: 'Quelle est la garantie du réseau de plomberie ?' },
        a: {
          ar: 'نمنح ضمانًا على الأشغال لمدة سنة واحدة على الأقل، مع ضمان المصنّع على الأنابيب والمضخات حسب الماركة.',
          fr: 'Nous offrons une garantie sur les travaux d’au moins un an, en plus de la garantie constructeur sur les tubes et les pompes selon la marque.',
        },
      },
    ],
    keywords: {
      ar: 'سباك طنجة، تركيب مضخة ماء، كشف تسربات المغرب، شبكات الصرف الصحي، سخان ماء',
      fr: 'plombier Tanger, pompe de surpression, détection de fuite Maroc, assainissement, chauffe-eau',
    },
  },

  {
    slug: 'chauffage-central',
    icon: 'Flame',
    tone: 'orange',
    image: '/images/services/chauffage.jpg',
    gallery: [
      '/images/services/chauffage.jpg',
      '/images/services/chauffage-2.jpg',
      '/images/services/chauffage-3.jpg',
    ],
    title: { ar: 'التدفئة المركزية', fr: 'Chauffage central' },
    short: {
      ar: 'غلايات، رادياتورات، تدفئة أرضية، شبكات مائية. تحكم ذكي لراحة وتوفير.',
      fr: 'Chaudières, radiateurs, chauffage au sol et réseaux hydrauliques. Contrôle intelligent pour plus de confort et d’économies.',
    },
    tagline: {
      ar: 'دفء متجانس في كل غرفة، بطاقة أقل',
      fr: 'Une chaleur homogène dans chaque pièce, avec moins d’énergie',
    },
    intro: {
      ar: 'صمّمنا أنظمة التدفئة المركزية في أطلس تك كونسيبت لتكون هادئة، متجانسة، واقتصادية. نبدأ بحساب الاحتياج الحراري لكل غرفة (Bilan thermique) ثم نختار الغلاية والرادياتورات والأقطار بناءً على أرقام، لا على التقدير.',
      fr: "Chez Atlas Tech Concept, nos systèmes de chauffage central sont conçus pour être silencieux, homogènes et économes. Nous commençons par un bilan thermique pièce par pièce, puis nous choisissons la chaudière, les radiateurs et les diamètres sur la base de chiffres, non d'estimations.",
    },
    body: [
      {
        ar: 'نقوم بحساب الاحتياج الحراري انطلاقًا من معطيات المبنى: المساحة، ارتفاع السقف، جودة العزل، الطوابق المعرّضة للرياح، ودرجة الحرارة الخارجية للمنطقة. بعد ذلك نختار قدرة الغلاية بدقة، لأن الغلاية المفرطة في القدرة تستهلك أكثر وتتآكل أسرع، والناقصة لا تسخّن في أبرد أيام السنة.',
        fr: "Nous calculons les besoins thermiques à partir des données du bâtiment : surface, hauteur sous plafond, qualité de l'isolation, étages exposés au vent et température extérieure de la région. Nous dimensionnons ensuite la puissance de la chaudière précisément, car une chaudière surdimensionnée consomme plus et s'use plus vite, tandis qu'une sous-dimensionnée ne chauffe pas lors des journées les plus froides.",
      },
      {
        ar: 'نقترح عليك مقارنة بين الأنظمة: غلاية غاز تقليدية، غلاية تكثيف عالية المردودية، تدفئة أرضية بالماء الساخن، أو مضخة حرارية للتدفئة والتبريد معًا. المضخة الحرارية غالبًا هي الحل الأمثل اقتصاديًا في المناخ المتوسطي، إذ تعمل بالكهرباء بمردود يصل إلى 4 أضعاف الطاقة المستهلكة.',
        fr: "Nous vous proposons une comparaison des systèmes : chaudière gaz classique, chaudière à condensation à haut rendement, plancher chauffant hydraulique ou pompe à chaleur réversible. Dans le climat méditerranéen, la pompe à chaleur est souvent le choix le plus économique, avec un COP pouvant atteindre 4 fois l'énergie consommée.",
      },
      {
        ar: 'نُنهي كل مشروع بموازنة الشبكة (équilibrage) وطرد الهواء، ثم نبرمج المنظم لتقليل الحرارة ليلًا وتشغيل الغرف المستعملة فقط. هذان الإجراءان وحدهما يوفّران عادة بين 15% و25% من الاستهلاك.',
        fr: "Nous terminons chaque projet par l'équilibrage du réseau et le purgage, puis nous programmons le régulateur pour réduire la température la nuit et ne chauffer que les pièces occupées. Ces deux mesures seules permettent généralement 15 à 25 % d'économies de consommation.",
      },
    ],
    scope: [
      {
        icon: 'Flame',
        title: { ar: 'الغلايات وبيوت المراجل', fr: 'Chaudières et chaufferies' },
        body: {
          ar: 'اختيار وتركيب غلايات الغاز والغازوال المكثّفة، أبعاد بيوت المراجل، التهوية، المدخنة، وأنظمة الأمان.',
          fr: 'Sélection et installation de chaudières gaz et gazoil à condensation, dimensionnement des chaufferies, ventilation, cheminée et sécurités.',
        },
      },
      {
        icon: 'ThermometerSun',
        title: { ar: 'الرادياتورات والتدفئة الأرضية', fr: 'Radiateurs et plancher chauffant' },
        body: {
          ar: 'تركيب رادياتورات ألومنيوم أو صلب بغطاء، تدفئة أرضية بالماء الساخن، وحلول تسخين الجدار (panneaux).',
          fr: 'Pose de radiateurs aluminium ou acier, planchers chauffants hydrauliques et solutions de chauffe murale (panneaux).',
        },
      },
      {
        icon: 'GitBranch',
        title: { ar: 'الشبكات المائية والعزل', fr: 'Réseaux hydrauliques et isolation' },
        body: {
          ar: 'شبكات نحاسية أو متعددة الطبقات، عزل الأنابيب، مجموعات التوزيع، ومحابس الموازنة لكل خط.',
          fr: 'Réseaux cuivre ou multicouche, calorifugeage, nourrices de distribution et vannes d’équilibrage par ligne.',
        },
      },
      {
        icon: 'SlidersHorizontal',
        title: { ar: 'التحكم الذكي والبرمجة', fr: 'Régulation intelligente' },
        body: {
          ar: 'ثرموستات ذكية لكل غرفة، منظمات خارجية، تحكم عبر الهاتف، وربط مع أنظمة الطاقة الشمسية.',
          fr: 'Thermostats connectés par pièce, régulateurs avec sonde extérieure, contrôle depuis le smartphone et couplage au solaire.',
        },
      },
      {
        icon: 'Wrench',
        title: { ar: 'الصيانة والتنظيف الدوري', fr: 'Entretien et maintenance périodique' },
        body: {
          ar: 'تنظيف الغلاية والمبادل، ضبط احتراق، فحص الأمان، تبديل الأنابيب الهوائية، وعقود صيانة سنوية.',
          fr: 'Nettoyage chaudière et échangeur, réglage de combustion, contrôle des sécurités, remplacement des flexibles et contrats annuels.',
        },
      },
      {
        icon: 'Leaf',
        title: { ar: 'الطاقة الشمسية الحرارية', fr: 'Solaire thermique' },
        body: {
          ar: 'جمعات شمسية لتسخين الماء والدعم الحراري، مع تخزين وربط ذكي بالغلاية لتقليل استهلاك الغاز.',
          fr: 'Capteurs solaires pour l’eau chaude et l’appoint de chauffage, avec stockage et couplage intelligent à la chaudière.',
        },
      },
    ],
    bullets: [
      { ar: 'حساب الاحتياج الحراري غرفة بغرفة قبل أي شراء.', fr: 'Bilan thermique pièce par pièce avant tout achat.' },
      { ar: 'تصميم بيوت المراجل وفق معايير التهوية والسلامة.', fr: 'Conception des chaufferies selon les normes de ventilation et de sécurité.' },
      { ar: 'تمديد شبكات نحاس أو متعددة الطبقات مع عزل كامل.', fr: 'Réseaux cuivre ou multicouche avec calorifugeage complet.' },
      { ar: 'تركيب الغلايات ورادياتورات الألومنيوم أو الصلب.', fr: 'Installation de chaudières et radiateurs aluminium ou acier.' },
      { ar: 'تدفئة أرضية للفيلات والمشاريع الكبرى.', fr: 'Plancher chauffant pour villas et grands projets.' },
      { ar: 'برمجة المنظمات والثرموستات وربطها بالهاتف.', fr: 'Programmation des régulateurs et thermostats connectés.' },
      { ar: 'تشغيل، موازنة، طرد الهواء واختبار الاحتراق.', fr: 'Mise en service, équilibrage, purgage et test de combustion.' },
      { ar: 'عقود صيانة سنوية مع تدخل وقائي قبل الشتاء.', fr: 'Contrats annuels avec intervention préventive avant l’hiver.' },
    ],
    benefits: [
      { ar: 'دفء متجانس دون نقاط باردة أو اختلاف بين الغرف.', fr: 'Chaleur homogène, sans points froids ni écarts entre les pièces.' },
      { ar: 'توفير 15%–25% بفضل البرمجة والموازنة.', fr: '15 à 25 % d’économies grâce à la programmation et à l’équilibrage.' },
      { ar: 'تشغيل هادئ جدًا مع خفض استهلاك الصيانة.', fr: 'Fonctionnement très silencieux et coûts de maintenance réduits.' },
      { ar: 'أمان كامل: حماية من التسرب، من الجفاف، ومن ارتفاع الحرارة.', fr: 'Sécurité complète : anti-fuite, anti-marche à sec, protection surchauffe.' },
      { ar: 'إمكانية دمج التبريد الصيفي بنفس الشبكة.', fr: 'Possibilité d’intégrer le rafraîchissement estival sur le même réseau.' },
      { ar: 'قطع غيار متوفرة ودعم سريع.', fr: 'Pièces de rechange disponibles et SAV rapide.' },
    ],
    deliverables: [
      { ar: 'دراسة حرارية للاحتياج حسب الغرف.', fr: 'Bilan thermique par pièce.' },
      { ar: 'مخطط الشبكة ومواقع الرادياتورات.', fr: 'Plan du réseau et implantation des radiateurs.' },
      { ar: 'محضر تشغيل واختبارات أمان.', fr: 'Procès-verbal de mise en service et essais de sécurité.' },
      { ar: 'دفتر الصيانة وجدول التدخلات.', fr: 'Carnet d’entretien et planning des interventions.' },
    ],
    faq: [
      {
        q: { ar: 'ما الفرق بين التدفئة المركزية والمكيف في التدفئة؟', fr: 'Chauffage central ou climatisation réversible ?' },
        a: {
          ar: 'المكيف يسخّن الهواء سريعًا لكنه غير متجانس ويجفف الهواء، بينما التدفئة المائية تعطي دفئًا ناعمًا ومتجانسًا ومستمرًا وأقل ضجيجًا. الاختيار يعتمد على الاستعمال: تدفئة عرضية أو تدفئة مستمرة طوال الشتاء.',
          fr: "La climatisation chauffe l'air rapidement mais de façon peu homogène et asséchante, alors qu'un chauffage hydraulique procure une chaleur douce, homogène, continue et plus silencieuse. Le choix dépend de l'usage : chauffage ponctuel ou continu tout l'hiver.",
        },
      },
      {
        q: { ar: 'هل يمكن تركيب تدفئة مركزية في شقة قديمة؟', fr: 'Peut-on installer un chauffage central dans un appartement ancien ?' },
        a: {
          ar: 'نعم، ونقترح في هذه الحالة حلولًا أقل تدخلًا مثل الشبكات أحادية الأنبوب، التمديد على الجدران، أو ألواح التسخين الكهربائية الفعالة لتقليل أشغال التكسير.',
          fr: "Oui. Nous proposons alors des solutions moins invasives : réseau monotube, distribution en apparent ou panneaux rayonnants électriques performants pour limiter les travaux.",
        },
      },
      {
        q: { ar: 'كم مرة يجب صيانة الغلاية؟', fr: 'À quelle fréquence entretenir la chaudière ?' },
        a: {
          ar: 'مرة واحدة سنويًا قبل فصل الشتاء على الأقل: تنظيف، ضبط الاحتراق، وفحص الأمان. الصيانة الوقائية تمدّد عمر الغلاية وتقلّل الاستهلاك.',
          fr: "Au moins une fois par an, avant l'hiver : nettoyage, réglage de combustion et contrôle des sécurités. L'entretien préventif prolonge la durée de vie et réduit la consommation.",
        },
      },
    ],
    keywords: {
      ar: 'تدفئة مركزية طنجة، تدفئة أرضية، غلاية غاز، رادياتور، مضخة حرارية المغرب',
      fr: 'chauffage central Tanger, plancher chauffant, chaudière gaz, radiateur, pompe à chaleur Maroc',
    },
  },

  {
    slug: 'climatisation',
    icon: 'Wind',
    tone: 'violet',
    image: '/images/services/climatisation.jpg',
    gallery: [
      '/images/services/climatisation.jpg',
      '/images/services/climatisation-2.jpg',
      '/images/services/climatisation-3.jpg',
    ],
    title: { ar: 'التكييف والتهوية', fr: 'Climatisation et ventilation' },
    short: {
      ar: 'سبليت، VRV/VRF، مخفي، تهوية ميكانيكية، شفط. دراسة تدفق الهواء واختيار المعدات المناسبة.',
      fr: 'Split, VRV/VRF, gainables, ventilation mécanique et extraction. Étude du flux d’air et choix des équipements adaptés.',
    },
    tagline: {
      ar: 'هواء نقي ودرجة حرارة مضبوطة في كل فصل',
      fr: 'Un air sain et une température maîtrisée en toute saison',
    },
    intro: {
      ar: 'التكييف في المغرب ليس ترفًا بل ضرورة لجودة الحياة والإنتاجية. ندرس مشروعك حراريًا (bilan frigorifique) لتحديد الاستطاعة الحقيقية لكل فضاء، ثم نقترح النظام الأنسب: سبليت للشقق، مخفي أو مجاري للتصاميم الأنيقة، و VRV/VRF للمباني الكبيرة والفنادق والمراكز التجارية.',
      fr: "Au Maroc, la climatisation n'est pas un luxe mais une nécessité pour la qualité de vie et la productivité. Nous réalisons une étude frigorifique pour déterminer la puissance réelle de chaque espace, puis nous proposons le système adapté : split pour les appartements, gainable ou cassette pour les designs soignés, et VRV/VRF pour les grands bâtiments, hôtels et centres commerciaux.",
    },
    body: [
      {
        ar: 'الحساب الصحيح للمناخ ضروري لأن المكيف المفرط في القدرة يشتغل بشكل متقطع، يبرّد بشكل غير مريح، يستهلك أكثر ويقصّر عمر الضاغط. أما المكيف الناقص فيعمل بلا توقف دون الوصول إلى الحرارة المطلوبة. لهذا نحسب المعطيات الحقيقية: المساحة، التوجيه، النوافذ، عدد الأشخاص، والحرارة المنتجة داخل المكان.',
        fr: "Un dimensionnement correct est indispensable : une climatisation surdimensionnée fonctionne par à-coups, refroidit inconfortablement, consomme davantage et raccourcit la durée de vie du compresseur ; une climatisation sous-dimensionnée tourne sans arrêt sans atteindre la consigne. Nous calculons donc les données réelles : surface, orientation, surfaces vitrées, nombre d'occupants et apports internes.",
      },
      {
        ar: 'نولي أهمية خاصة لجودة الهواء: في المنازل والمكاتب الحديثة المحكمة، نحتاج تهوية ميكانيكية مدروسة (VMC) تجدد الهواء وتخرج الرطوبة وتمنع تراكم غاز ثاني أكسيد الكربون والروائح. في المطاعم والمطابخ نركّب أنظمة شفط وتهوية مطابقة للمعايير مع تعويض الهواء المُخرَج.',
        fr: "Nous accordons une attention particulière à la qualité de l'air : dans les logements et bureaux modernes bien étanches, une ventilation mécanique contrôlée est indispensable pour renouveler l'air, évacuer l'humidité et éviter l'accumulation de CO₂ et les odeurs. Dans les restaurants et cuisines, nous installons des systèmes d'extraction conformes aux normes, avec compensation de l'air extrait.",
      },
      {
        ar: 'نقوم بتشغيل الأنظمة بعد التركيب، نقيس درجات الحرارة والمردود، ثم نجدد الفلاتر ونضع برنامج صيانة دورية يحافظ على الأداء ويقلّل استهلاك الكهرباء الذي قد يتضاعف إذا أُهملت النظافة.',
        fr: "Après l'installation, nous mettons en service, mesurons les températures et le rendement, remplaçons les filtres et définissons un programme de maintenance qui préserve la performance et évite une surconsommation électrique pouvant doubler en cas de négligence.",
      },
    ],
    scope: [
      {
        icon: 'AirVent',
        title: { ar: 'مكيفات سبليت وأسبليت إنفرتر', fr: 'Split et split inverter' },
        body: {
          ar: 'تركيب أنظمة سبليت عادية وإنفرتر موفرة للطاقة للمنازل والمكاتب، مع تمديد النحاس وتصريف المكثفات بشكل أنيق.',
          fr: 'Pose de systèmes split classiques et inverter à faible consommation pour maisons et bureaux, avec lignes cuivre et évacuation de condensats soignées.',
        },
      },
      {
        icon: 'Boxes',
        title: { ar: 'أنظمة VRV / VRF المركزية', fr: 'Systèmes VRV / VRF' },
        body: {
          ar: 'حلول متعددة الوحدات لوحدة واحدة خارجية، مثالية للفنادق والمكاتب والفيلات الكبيرة، مع تحكم مستقل لكل غرفة.',
          fr: 'Solutions multi-split à unité extérieure unique, idéales pour hôtels, bureaux et grandes villas, avec régulation indépendante par zone.',
        },
      },
      {
        icon: 'Layers',
        title: { ar: 'التكييف المخفي والمجاري', fr: 'Gainables et cassette' },
        body: {
          ar: 'أنظمة مخفية في السقف المستعار مع شبكة مجاري وفوهات توزيع — أنظف وأجمل من الناحية الجمالية وأكثر توزيعًا للهواء.',
          fr: 'Systèmes encastrés en faux plafond avec réseau de gaines et bouches de diffusion — plus esthétique et bien mieux réparti.',
        },
      },
      {
        icon: 'Fan',
        title: { ar: 'التهوية الميكانيكية VMC', fr: 'Ventilation mécanique VMC' },
        body: {
          ar: 'أنظمة تهوية بسيطة أو مزدوجة التدفق لتجديد الهواء في المنازل والمكاتب ومنع الرطوبة والتكاثف.',
          fr: 'Ventilation simple ou double flux pour renouveler l’air des logements et bureaux et prévenir humidité et condensation.',
        },
      },
      {
        icon: 'UtensilsCrossed',
        title: { ar: 'شفط وتهوية المطابخ والمطاعم', fr: 'Extraction cuisine et restauration' },
        body: {
          ar: 'هوات شفط، مرشحات دهون، أنظمة تعويض الهواء، ومراوح مقاومة للحرارة، وفق معايير المطاعم.',
          fr: 'Hottes, filtres à graisses, compensation d’air, ventilateurs résistants à la chaleur, selon les normes de restauration.',
        },
      },
      {
        icon: 'Settings',
        title: { ar: 'الصيانة وضبط الغاز', fr: 'Maintenance et charge de fluide' },
        body: {
          ar: 'تنظيف فلاتر ومبادلات، كشف التسرب، إعادة شحن غاز R410A/R32، وقياس الأداء بعد كل عملية.',
          fr: 'Nettoyage filtres et échangeurs, détection de fuite, recharge de fluide R410A/R32 et mesure de performance après intervention.',
        },
      },
    ],
    bullets: [
      { ar: 'دراسة حرارية (bilan frigorifique) لكل غرفة قبل الاقتراح.', fr: 'Bilan frigorifique par pièce avant toute proposition.' },
      { ar: 'اختيار الاستطاعة الصحيحة بالـ BTU، لا بالتقدير التجاري.', fr: 'Choix de la puissance réelle en BTU, sans estimation commerciale.' },
      { ar: 'تمديد أنابيب النحاس معزولة وتصريف مكثفات مدروس.', fr: 'Lignes cuivre isolées et évacuation de condensats étudiée.' },
      { ar: 'تركيب سبليت، مجاري، كاسيت وأنظمة VRV/VRF.', fr: 'Installation split, gainable, cassette et VRV/VRF.' },
      { ar: 'شبكات تهوية وشفط للمطابخ والمطاعم ودورات المياه.', fr: 'Réseaux de ventilation et d’extraction pour cuisines, restaurants et sanitaires.' },
      { ar: 'ربط الأنظمة بلوحة كهربائية آمنة وبمفاتيح حماية.', fr: 'Raccordement électrique sécurisé avec protections dédiées.' },
      { ar: 'ضبط الشحن والاختبار وقياس مردود التبريد.', fr: 'Réglage de charge, essais et mesure du rendement frigorifique.' },
      { ar: 'عقود صيانة بزيارتين سنويًا على الأقل.', fr: 'Contrats de maintenance avec au moins deux visites par an.' },
    ],
    benefits: [
      { ar: 'درجة حرارة مضبوطة دون تيارات هواء مزعجة.', fr: 'Température maîtrisée sans courants d’air désagréables.' },
      { ar: 'أنظمة إنفرتر توفّر حتى 40% من الكهرباء.', fr: 'Technologie inverter : jusqu’à 40 % d’économie d’électricité.' },
      { ar: 'حلول مخفية تحفظ جمالية المكان.', fr: 'Solutions encastrées qui préservent l’esthétique des lieux.' },
      { ar: 'هواء أنقى بفلاتر متعددة المراحل ضد الغبار وحبوب الطلع.', fr: 'Air plus sain grâce aux filtres multi-étages anti-poussière et pollen.' },
      { ar: 'تشغيل هادئ مناسب لغرف النوم والمكاتب.', fr: 'Fonctionnement silencieux, adapté aux chambres et bureaux.' },
      { ar: 'غازات تبريد R32 و R410A صديقة للبيئة.', fr: 'Fluides frigorigènes R32 et R410A respectueux de l’environnement.' },
    ],
    deliverables: [
      { ar: 'تقرير الدراسة الحرارية واختيار الاستطاعات.', fr: 'Rapport d’étude frigorifique et sélection des puissances.' },
      { ar: 'مخطط مواقع الوحدات الداخلية والخارجية.', fr: 'Plan d’implantation des unités intérieures et extérieures.' },
      { ar: 'محضر التشغيل وقياس درجات الحرارة.', fr: 'Procès-verbal de mise en service et relevé des températures.' },
      { ar: 'برنامج الصيانة ودفتر الأمبيراج.', fr: 'Programme de maintenance et carnet d’entretien.' },
    ],
    faq: [
      {
        q: { ar: 'ما الاستطاعة المناسبة لغرفة 20 م²؟', fr: 'Quelle puissance pour une pièce de 20 m² ?' },
        a: {
          ar: 'عادة بين 9000 و12000 BTU حسب التوجيه والمساحات الزجاجية وعدد الأشخاص. القيمة الدقيقة تُحدَّد بالحساب الحراري وليس بالمساحة وحدها.',
          fr: "Généralement entre 9 000 et 12 000 BTU selon l'orientation, les surfaces vitrées et le nombre d'occupants. La valeur exacte résulte du bilan thermique, pas de la surface seule.",
        },
      },
      {
        q: { ar: 'هل تنصحون بأنظمة إنفرتر؟', fr: 'Recommandez-vous les systèmes inverter ?' },
        a: {
          ar: 'نعم، خصوصًا للاستعمال اليومي الطويل: الاستثمار الأولي أعلى بنحو 15% لكن التوفير في الكهرباء والهدوء وعمر الضاغط يجعل الفارق يُستَرد بسرعة.',
          fr: "Oui, surtout pour un usage quotidien prolongé : l'investissement initial est environ 15 % plus élevé, mais les économies d'électricité, le silence et la longévité du compresseur rendent l'écart très vite rentable.",
        },
      },
      {
        q: { ar: 'كل كم يجب تنظيف المكيف؟', fr: 'À quelle fréquence nettoyer le climatiseur ?' },
        a: {
          ar: 'تنظيف الفلاتر كل شهرين في موسم الاستعمال، وصيانة شاملة مع تنظيف المبادلات مرة في السنة. المناطق الساحلية مثل طنجة تتطلب اهتمامًا أكبر بسبب الرطوبة والملح.',
          fr: "Nettoyage des filtres tous les deux mois en saison, et entretien complet avec nettoyage des échangeurs une fois par an. Les zones côtières comme Tanger demandent plus d'attention en raison de l'humidité et du sel.",
        },
      },
    ],
    keywords: {
      ar: 'تكييف طنجة، تركيب مكيف سبليت، VRV، تهوية ميكانيكية، شفط مطاعم المغرب',
      fr: 'climatisation Tanger, installation split, VRV, ventilation mécanique, extraction restaurant Maroc',
    },
  },

  {
    slug: 'energie-solaire',
    icon: 'Sun',
    tone: 'emerald',
    image: '/images/services/solaire.jpg',
    gallery: [
      '/images/services/solaire.jpg',
      '/images/services/solaire-2.jpg',
      '/images/services/solaire-3.jpg',
    ],
    title: { ar: 'الطاقة الشمسية', fr: 'Énergie solaire' },
    short: {
      ar: 'دراسة وتركيب ومراقبة: ألواح، عواكس، بطاريات. استهلاك ذاتي وتحسين العائد.',
      fr: 'Étude, installation et suivi : panneaux, onduleurs et batteries. Autoconsommation et optimisation du rendement.',
    },
    tagline: {
      ar: 'استثمار مستدام يخفض فاتورتك لـ 25 سنة',
      fr: 'Un investissement durable qui réduit votre facture pendant 25 ans',
    },
    intro: {
      ar: 'المغرب من أغنى بلدان العالم بالنصيب الشمسي (أكثر من 3000 ساعة إشعاع سنويًا)، ما يجعل الاستثمار في الطاقة الشمسية أحد أفضل القرارات المالية لأي مبني. في أطلس تك كونسيبت ندرس استهلاكك الحقيقي، نحلّل منحنى الفاتورة، ثم نصمّم نظامًا يقلّل أكثر قدر ممكن من الطاقة المشتراة من الشبكة.',
      fr: "Le Maroc est l'un des pays les mieux dotés en ensoleillement (plus de 3 000 heures d'irradiation par an), ce qui fait du solaire l'un des meilleurs choix financiers pour un bâtiment. Chez Atlas Tech Concept, nous étudions votre consommation réelle, analysons la courbe de facturation et concevons un système qui minimise au maximum l'énergie achetée au réseau.",
    },
    body: [
      {
        ar: 'نشتغل على ثلاثة أنماط حسب حاجتك: نظام استهلاك ذاتي بدون بطاريات (الأبسط والأسرع مردودية)، نظام هجين ببطاريات لضمان التغذية أثناء انقطاع الكهرباء، ونظام مستقل كليًا (off-grid) للفيلات والمناطق النائية والمواقع المهنية بعيدًا عن الشبكة.',
        fr: "Nous travaillons sur trois architectures selon votre besoin : l'autoconsommation sans batterie (la plus simple et la plus rapidement rentable), le système hybride avec batteries pour assurer la continuité pendant les coupures, et le système totalement autonome (off-grid) pour les fermes, zones isolées et sites professionnels hors réseau.",
      },
      {
        ar: 'الدراسة هي جوهر المشروع: نحلّل فاتورتك لسنة كاملة، نحدّد نسبة الاستهلاك النهاري مقابل الليلي، نقيس الإشعاع الشمسي في موقعك، ونحدّد اتجاه وميلان الألواح، ثم نحسب المردود المتوقع، زمن الاسترداد (retour sur investissement) والتوفير على 25 سنة. لا نبيع أنظمة جاهزة، بل نصمّم نظامًا يناسب منحنى استهلاكك.',
        fr: "L'étude est le cœur du projet : nous analysons une année complète de factures, distinguons la consommation diurne de la nocturne, mesurons l'irradiation sur votre site, déterminons l'orientation et l'inclinaison des panneaux, puis calculons le rendement attendu, le retour sur investissement et les économies sur 25 ans. Nous ne vendons pas de kits standardisés : nous concevons un système adapté à votre courbe de consommation.",
      },
      {
        ar: 'نستعمل ألواحًا مونوكريستالية عالية المردودية من ماركات عالمية معتمدة، عواكس هجينة بضمان يصل إلى 10 سنوات، وبطاريات ليثيوم LiFePO4 بدورات تفوق 6000 دورة. ونركّز كثيرًا على جودة التركيب: الهياكل، التأريض، الحمايات، ونظام المراقبة عن بعد الذي يسمح بمتابعة الإنتاج من الهاتف واكتشاف أي خلل بسرعة.',
        fr: "Nous utilisons des panneaux monocristallins à haut rendement de marques mondiales certifiées, des onduleurs hybrides garantis jusqu'à 10 ans et des batteries lithium LiFePO4 dépassant 6 000 cycles. Nous accordons une grande importance à la qualité de la pose : structures, mise à la terre, protections et supervision à distance permettant de suivre la production depuis le smartphone et de détecter rapidement toute anomalie.",
      },
    ],
    scope: [
      {
        icon: 'Ruler',
        title: { ar: 'الدراسة الهندسية والجدوى', fr: 'Étude technique et de rentabilité' },
        body: {
          ar: 'تحليل الفاتورة، حساب الإشعاع، تصميم النظام، تقدير الإنتاج والتوفير وزمن الاسترداد بالتفصيل.',
          fr: 'Analyse de facture, calcul d’irradiation, dimensionnement, estimation de production, d’économies et de retour sur investissement détaillé.',
        },
      },
      {
        icon: 'Sun',
        title: { ar: 'الألواح الكهروضوئية', fr: 'Panneaux photovoltaïques' },
        body: {
          ar: 'ألواح مونوكريستالية عالية الكفاءة، هياكل تركيب على الأسطح المائلة أو المسطحة أو الأرض أو المظلات.',
          fr: 'Panneaux monocristallins haute efficacité, structures pour toitures inclinées, terrasses, sol ou ombrières.',
        },
      },
      {
        icon: 'Cpu',
        title: { ar: 'العواكس والأنظمة الهجينة', fr: 'Onduleurs et systèmes hybrides' },
        body: {
          ar: 'عواكس سلسلة وهجينة، أنظمة ثلاثية الأطوار للمشاريع المهنية، وحلول الربط بالشبكة أو العزل التام.',
          fr: 'Onduleurs string et hybrides, systèmes triphasés pour projets professionnels, raccordement réseau ou site isolé.',
        },
      },
      {
        icon: 'BatteryCharging',
        title: { ar: 'البطاريات والتخزين', fr: 'Batteries et stockage' },
        body: {
          ar: 'بطاريات ليثيوم LiFePO4 و AGM/GEL، غرف تخزين مهوّاة، وحساب سعة التخزين حسب الحمولة الليلية.',
          fr: 'Batteries lithium LiFePO4 et AGM/GEL, locaux de stockage ventilés et calcul de capacité selon la charge nocturne.',
        },
      },
      {
        icon: 'MonitorSmartphone',
        title: { ar: 'المراقبة والقياس عن بعد', fr: 'Supervision et monitoring' },
        body: {
          ar: 'تطبيقات مراقبة الإنتاج والاستهلاك، تنبيهات آليّة عند أي خلل، وتقارير أداء شهرية.',
          fr: 'Applications de suivi de production et consommation, alertes automatiques en cas d’anomalie et rapports de performance mensuels.',
        },
      },
      {
        icon: 'SunMedium',
        title: { ar: 'السخانات الشمسية', fr: 'Chauffe-eau solaires' },
        body: {
          ar: 'جمعات شمسية حرارية لتسخين الماء للاستعمال المنزلي والفندقي، مع خزان معزول وربط كهربائي احتياطي.',
          fr: 'Capteurs thermiques pour l’eau chaude domestique et hôtelière, avec ballon isolé et appoint électrique.',
        },
      },
    ],
    bullets: [
      { ar: 'تحليل فاتورة الكهرباء لسنة كاملة قبل التصميم.', fr: 'Analyse d’une année complète de factures avant conception.' },
      { ar: 'تصميم النظام وحساب عدد الألواح والعاكس والبطاريات.', fr: 'Dimensionnement du système : nombre de panneaux, onduleur et batteries.' },
      { ar: 'تركيب الألواح على الهياكل المعدنية أو الأسطح.', fr: 'Pose des panneaux sur structures métalliques ou toitures.' },
      { ar: 'تأريض وحماية ضد الصواعق والحمايات الكهربائية.', fr: 'Mise à la terre, protection foudre et protections électriques.' },
      { ar: 'توصيلات DC/AC، لوحات الحماية وأنظمة القياس.', fr: 'Raccordements DC/AC, tableaux de protection et systèmes de mesure.' },
      { ar: 'تشغيل النظام وإعداده ثم تكوين العميل على الاستعمال.', fr: 'Mise en service, paramétrage et formation du client à l’usage.' },
      { ar: 'مراقبة عن بعد وتدخلات صيانة دورية (تنظيف، فحص).', fr: 'Supervision à distance et maintenance périodique (nettoyage, contrôle).' },
      { ar: 'مساعدة في ملفات الربط والدعم الإداري.', fr: 'Aide aux démarches de raccordement et accompagnement administratif.' },
    ],
    benefits: [
      { ar: 'تخفيض الفاتورة الكهربائية بين 30% و70% حسب النظام.', fr: 'Réduction de la facture électrique de 30 à 70 % selon le système.' },
      { ar: 'زمن استرداد للاستثمار يُعادل عادة 4 إلى 7 سنوات.', fr: 'Retour sur investissement généralement de 4 à 7 ans.' },
      { ar: 'عمر تشغيلي للألواح يتجاوز 25 سنة بضمان خطي.', fr: 'Durée de vie des panneaux supérieure à 25 ans avec garantie linéaire.' },
      { ar: 'استقلالية طاقية وحماية من انقطاع الكهرباء.', fr: 'Autonomie énergétique et protection contre les coupures.' },
      { ar: 'قيمة مضافة للعقار: مبنى موفّر للطاقة يُقدَّر أكثر.', fr: 'Plus-value immobilière : un bâtiment économe est mieux valorisé.' },
      { ar: 'مساهمة حقيقية في تقليل البصمة الكربونية.', fr: 'Contribution réelle à la réduction de l’empreinte carbone.' },
    ],
    deliverables: [
      { ar: 'دراسة جدوى مفصّلة مع زمن الاسترداد.', fr: 'Étude de rentabilité détaillée avec retour sur investissement.' },
      { ar: 'مخطط كهربائي DC/AC ومخطط الهيكل.', fr: 'Schéma électrique DC/AC et plan de structure.' },
      { ar: 'محضر التشغيل وقياس الإنتاج الأولي.', fr: 'Procès-verbal de mise en service et relevé de production initiale.' },
      { ar: 'حساب المراقبة عن بعد وتكوين على الاستعمال.', fr: 'Compte de supervision à distance et formation à l’utilisation.' },
    ],
    faq: [
      {
        q: { ar: 'كم تكلفة نظام شمسي لمنزل؟', fr: 'Combien coûte un système solaire pour une maison ?' },
        a: {
          ar: 'التكلفة تعتمد على الاستهلاك والنظام المختار. منزل باستهلاك متوسط (300–400 درهم شهريًا) يحتاج عادة نظامًا بين 3 و5 كيلوواط، ونمنح تقديرًا دقيقًا مجانًا بعد تحليل الفاتورة.',
          fr: "Le coût dépend de la consommation et de l'architecture choisie. Une maison à consommation moyenne (300–400 MAD/mois) nécessite généralement 3 à 5 kWc. Nous fournissons un chiffrage précis gratuitement après analyse de la facture.",
        },
      },
      {
        q: { ar: 'هل يعمل النظام عند انقطاع الكهرباء؟', fr: 'Le système fonctionne-t-il en cas de coupure ?' },
        a: {
          ar: 'الأنظمة الهجينة مع بطاريات نعم، وهي مصممة تحديدًا لهذا الغرض. أما الأنظمة المرتبطة بالشبكة بدون بطاريات فتتوقف تلقائيًا لأسباب أمنية لحماية الفنيين أثناء الصيانة.',
          fr: "Les systèmes hybrides avec batteries oui, ils sont conçus pour cela. En revanche, les systèmes reliés au réseau sans batterie s'arrêtent automatiquement pour des raisons de sécurité, afin de protéger les techniciens du réseau.",
        },
      },
      {
        q: { ar: 'هل تحتاج الألواح للتنظيف؟', fr: 'Les panneaux nécessitent-ils d’être nettoyés ?' },
        a: {
          ar: 'نعم، التنظيف كل 2 إلى 3 أشهر يرفع الإنتاج بنسبة ملحوظة، خصوصًا في المناطق الساحلية كطنجة حيث يتراكم الغبار والملح. ننصح بتدخل احترافي مرتين سنويًا للفحص والتنظيف.',
          fr: "Oui, un nettoyage tous les 2 à 3 mois augmente sensiblement la production, surtout en zone côtière comme Tanger où poussière et sel s'accumulent. Nous recommandons deux interventions professionnelles par an pour contrôle et nettoyage.",
        },
      },
      {
        q: { ar: 'ما الضمانات المقدمة؟', fr: 'Quelles garanties offrez-vous ?' },
        a: {
          ar: '10 إلى 15 سنة على الألواح حسب الماركة، 5 إلى 10 سنوات على العواكس، و3 إلى 10 سنوات على البطاريات، إضافة إلى ضمان سنتين على الأشغال والتركيب.',
          fr: "10 à 15 ans sur les panneaux selon la marque, 5 à 10 ans sur les onduleurs, 3 à 10 ans sur les batteries, en plus d'une garantie de deux ans sur la pose et l'installation.",
        },
      },
    ],
    keywords: {
      ar: 'طاقة شمسية طنجة، تركيب ألواح شمسية المغرب، عاكس شمسي، بطاريات ليثيوم، سخان شمسي',
      fr: 'énergie solaire Tanger, installation panneaux solaires Maroc, onduleur, batteries lithium, chauffe-eau solaire',
    },
  },

  {
    slug: 'amenagement-interieur',
    icon: 'LayoutPanelTop',
    tone: 'rose',
    image: '/images/services/amenagement.jpg',
    gallery: [
      '/images/services/amenagement.jpg',
      '/images/services/amenagement-2.jpg',
      '/images/services/amenagement-3.jpg',
    ],
    title: { ar: 'التجهيز الداخلي والتشطيب', fr: 'Aménagement intérieur et finition' },
    short: {
      ar: 'قواطع، أسقف مستعارة، أرضيات وكسوة، نجارة، أبواب، تجهيز مطبخ وحمام. تفاصيل وتشطيب ممتاز.',
      fr: 'Cloisons, faux plafonds, sols et revêtements, menuiserie, portes, cuisines et salles de bains. Détails soignés et finition excellente.',
    },
    tagline: {
      ar: 'التفاصيل الصغيرة هي التي تصنع المكان الجميل',
      fr: 'Ce sont les détails qui font la beauté d’un espace',
    },
    intro: {
      ar: 'التشطيب هو المرحلة التي يلمسها العميل كل يوم. في أطلس تك كونسيبت نتعامل معها بمنطق الحرفية والحس الجمالي: استقامة الزوايا، دقة التعشيق، تناسق الألوان، وتشطيب نظيف عند نقاط الالتقاء بين الخامات — وهي بالضبط النقاط التي تكشف الفرق بين عمل عادي وعمل ممتاز.',
      fr: "La finition est l'étape que le client côtoie chaque jour. Chez Atlas Tech Concept, nous l'abordons avec rigueur artisanale et sens esthétique : alignement des angles, précision des assemblages, harmonie des couleurs et finitions nettes aux jonctions entre matériaux — précisément là où se révèle la différence entre un travail ordinaire et un travail excellent.",
    },
    body: [
      {
        ar: 'نعمل انطلاقًا من مخططات التصميم الداخلي، ونحوّل كل تفصيل إلى بند تنفيذي واضح: نوع الجبس ومقاومته للرطوبة، سماكة الألواح، نوع الدهن وعدد الطبقات، نوع الأرضية ومقاومتها للاحتكاك، وتفاصيل الأبواب والزجاج. هذا المستوى من الدقة يمنع المفاجآت ويجعل الميزانية قابلة للتحكم.',
        fr: "Nous partons des plans de design intérieur et traduisons chaque détail en poste d'exécution clair : type de plâtre et sa résistance à l'humidité, épaisseur des plaques, type de peinture et nombre de couches, revêtement de sol et résistance à l'usure, détails des portes et vitrages. Ce niveau de précision évite les surprises et rend le budget maîtrisable.",
      },
      {
        ar: 'نُنجز الأعمال التقنية (الكهرباء، السباكة، التكييف) بشكل مدمج ومتزامن مع أعمال التشطيب، لأن التنسيق بين المهن هو الذي يمنع الأخطاء الأكثر شيوعًا: مأخذ في المكان الخطأ، فوهة تكييف غير متناسقة مع السقف، أو باب يتعارض مع تمديد. هذا التنسيق هو ميزتنا الأساسية كشركة متعددة التخصصات.',
        fr: "Nous réalisons les lots techniques (électricité, plomberie, climatisation) de façon encastrée et synchronisée avec les finitions, car c'est la coordination entre corps d'état qui évite les erreurs les plus fréquentes : prise au mauvais endroit, bouche de climatisation désalignée par rapport au plafond, ou porte en conflit avec une gaine. Cette coordination est notre force en tant qu'entreprise pluridisciplinaire.",
      },
      {
        ar: 'نختار الخامات مع العميل حسب الميزانية والنمط: من الحلول الاقتصادية المتينة إلى الخامات الراقية. ونحترم جدولًا زمنيًا واضحًا، مع مراحل تسليم وسيطة يتحقق فيها العميل من الجودة قبل الانتقال إلى المرحلة الموالية.',
        fr: "Nous sélectionnons les matériaux avec le client selon le budget et le style : des solutions économiques durables aux finitions haut de gamme. Nous respectons un planning clair, avec des jalons intermédiaires où le client valide la qualité avant de passer à l'étape suivante.",
      },
    ],
    scope: [
      {
        icon: 'LayoutPanelTop',
        title: { ar: 'الأسقف المستعارة والجبس', fr: 'Faux plafonds et staff' },
        body: {
          ar: 'أسقف مستعارة بإنارة مخفية، ديكورات جبس، حواجز، وأقواس، مع معالجة نقاط الرطوبة في الحمامات والمطابخ.',
          fr: 'Faux plafonds avec éclairage indirect, décors en staff, corniches et arches, avec traitement des zones humides en salles de bains et cuisines.',
        },
      },
      {
        icon: 'Columns3',
        title: { ar: 'القواطع والأصباغ', fr: 'Cloisons et peinture' },
        body: {
          ar: 'قواطع طوب أو جبس أو زجاج، عزل صوتي، أعمال الجبس المسطح، والصباغة الداخلية والخارجية بطبقات متعددة.',
          fr: 'Cloisons brique, plâtre ou verre, isolation acoustique, enduits et peinture intérieure et extérieure en plusieurs couches.',
        },
      },
      {
        icon: 'Grid3x3',
        title: { ar: 'الأرضيات والكسوة', fr: 'Sols et revêtements' },
        body: {
          ar: 'رخام، بورسلان، جرانيت، باركي، أرضيات فينيل و SPC، وتكسية الجدران بالحجر أو الخشب أو الزليج.',
          fr: 'Marbre, porcelaine, granit, parquet, sols vinyle et SPC, habillage mural en pierre, bois ou zellige.',
        },
      },
      {
        icon: 'DoorOpen',
        title: { ar: 'النجارة والأبواب والخزائن', fr: 'Menuiserie, portes et placards' },
        body: {
          ar: 'أبواب خشب أو ألومنيوم، خزائن مدمجة (dressing)، مطابخ حسب القياس، ونجارة داخلية بتفاصيل دقيقة.',
          fr: 'Portes bois ou aluminium, placards intégrés (dressing), cuisines sur mesure et menuiserie intérieure aux détails soignés.',
        },
      },
      {
        icon: 'CookingPot',
        title: { ar: 'تجهيز المطابخ والحمامات', fr: 'Équipement cuisines et salles de bains' },
        body: {
          ar: 'تصميم وتنفيذ المطابخ كاملةً، الوحدات، الأسطح (plan de travail)، حواجز الدش، والمرايا والخزائن.',
          fr: 'Conception et réalisation de cuisines complètes : meubles, plans de travail, parois de douche, miroirs et meubles vasques.',
        },
      },
      {
        icon: 'Paintbrush',
        title: { ar: 'الديكور والتزيين النهائي', fr: 'Décoration et habillage final' },
        body: {
          ar: 'اختيار الأثاث والإضاءة والستائر والإكسسوارات، تنسيق الألوان، ولمسات نهائية تجعل المكان متكاملًا.',
          fr: 'Sélection de mobilier, luminaires, rideaux et accessoires, harmonisation des couleurs et touches finales qui rendent l’espace cohérent.',
        },
      },
    ],
    bullets: [
      { ar: 'أشغال الهدم وإعادة التقسيم الداخلي.', fr: 'Démolition et redistribution des espaces intérieurs.' },
      { ar: 'بناء القواطع الجبسية والطوبية مع العزل الصوتي.', fr: 'Construction de cloisons en plâtre et brique avec isolation acoustique.' },
      { ar: 'تركيب الأسقف المستعارة والإنارة المخفية.', fr: 'Pose de faux plafonds et d’éclairage indirect.' },
      { ar: 'تبليط الأرضيات والجدران بالرخام والبورسلان والزليج.', fr: 'Carrelage des sols et murs en marbre, porcelaine et zellige.' },
      { ar: 'تركيب الباركي والفينيل وأرضيات SPC.', fr: 'Pose de parquet, vinyle et sols SPC.' },
      { ar: 'نجارة الأبواب والخزائن المدمجة والمطابخ.', fr: 'Menuiserie de portes, placards intégrés et cuisines.' },
      { ar: 'الصباغة الداخلية والخارجية وتشطيب الجدران.', fr: 'Peinture intérieure et extérieure et finition des murs.' },
      { ar: 'تنسيق كامل مع مهن الكهرباء والسباكة والتكييف.', fr: 'Coordination complète avec les lots électricité, plomberie et climatisation.' },
    ],
    benefits: [
      { ar: 'مسؤول واحد عن كل المهن: لا تنازع مسؤوليات ولا تأخير.', fr: 'Un seul responsable pour tous les lots : aucune dilution de responsabilité, aucun retard.' },
      { ar: 'التقنيات مدمجة بشكل صحيح من أول مرة.', fr: 'Les techniques sont encastrées correctement du premier coup.' },
      { ar: 'عقود واضحة، جدول زمني، ومراحل تحقق وسيطة.', fr: 'Devis clairs, planning et jalons de validation intermédiaires.' },
      { ar: 'خامات مختارة تدوم وتحافظ على مظهرها.', fr: 'Matériaux choisis pour durer et conserver leur aspect.' },
      { ar: 'احترام لون وهوية المكان في كل تفصيل.', fr: "Respect de l'identité et des couleurs du lieu dans chaque détail." },
      { ar: 'تنظيف وإخلاء الموقع في نهاية الأشغال.', fr: 'Nettoyage et évacuation du chantier en fin de travaux.' },
    ],
    deliverables: [
      { ar: 'مخططات التصميم الداخلي والواجهات ثلاثية الأبعاد.', fr: 'Plans d’aménagement intérieur et vues 3D.' },
      { ar: 'قائمة الخامات والكميات المعتمدة مع العميل.', fr: 'Nomenclature des matériaux et quantités validée avec le client.' },
      { ar: 'دفتر الحالة والصور قبل/بعد.', fr: 'Dossier photo avant/après.' },
      { ar: 'ضمان على الأشغال وقائمة الصيانة السنوية.', fr: 'Garantie sur les travaux et calendrier d’entretien annuel.' },
    ],
    faq: [
      {
        q: { ar: 'هل تتولون المشروع كاملًا من الألف إلى الياء؟', fr: 'Prenez-vous le projet de A à Z ?' },
        a: {
          ar: 'نعم، هذه أكبر ميزة لدينا: نتولى الكهرباء والسباكة والتكييف والجبس والتبليط والصباغة والنجارة تحت إدارة واحدة، ما يقلّل التكاليف ويضمن التنسيق.',
          fr: "Oui, c'est notre plus grand atout : nous prenons en charge électricité, plomberie, climatisation, plâtrerie, carrelage, peinture et menuiserie sous une direction unique, ce qui réduit les coûts et garantit la coordination.",
        },
      },
      {
        q: { ar: 'كم يستغرق تشطيب شقة 100 م²؟', fr: 'Quel délai pour finir un appartement de 100 m² ?' },
        a: {
          ar: 'تشطيب كامل بمستوى جيد يستغرق عادة بين 5 و9 أسابيع حسب حجم الأعمال ومدى توفر الخامات المختارة.',
          fr: 'Une finition complète de bon niveau demande généralement 5 à 9 semaines selon l’ampleur des travaux et la disponibilité des matériaux choisis.',
        },
      },
      {
        q: { ar: 'هل تقدّمون تصميمًا ثلاثي الأبعاد قبل التنفيذ؟', fr: 'Fournissez-vous un rendu 3D avant travaux ?' },
        a: {
          ar: 'نعم، نقترح تصميمًا ثلاثي الأبعاد للفضاءات الرئيسية حتى ترى النتيجة قبل انطلاق الأشغال وتعدّل ما تريد.',
          fr: "Oui, nous proposons une modélisation 3D des espaces principaux afin que vous visualisiez le résultat avant le début des travaux et puissiez ajuster.",
        },
      },
    ],
    keywords: {
      ar: 'تشطيب داخلي طنجة، أسقف مستعارة، رخام بورسلان، نجارة مطابخ، ديكور داخلي المغرب',
      fr: 'aménagement intérieur Tanger, faux plafond, marbre porcelaine, menuiserie cuisine, décoration Maroc',
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceSlugs(): string[] {
  return services.map((s) => s.slug);
}
