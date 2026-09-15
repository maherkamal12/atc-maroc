import type { Locale } from '@/lib/i18n';

/**
 * Long-form article bodies, one complete entry per blog post.
 * Every post in `site.ts` has a body here — no article is a stub.
 */
export type BlogSection = {
  /** Optional section heading. */
  h?: Record<Locale, string>;
  /** Body paragraph (required). */
  p: Record<Locale, string>;
  /** Optional bullet list rendered after the paragraph. */
  list?: Record<Locale, string>[];
};

export const blogBodies: Record<string, BlogSection[]> = {

    'reduire-facture-electricite-maroc': [
      {
        p: {
          ar: 'فاتورة الكهرباء في المغرب تتكوّن من شقّين: الاستطاعة المشتركة (الجزء الثابت) والطاقة المستهلكة (الجزء المتغيّر). كثير من الناس يركّزون على الثاني فقط، بينما تصحيح الاستطاعة المشتركة قد يوفّر مبالغ معتبرة سنويًا إذا كانت مبالغًا فيها بالنسبة لاستعمالك الفعلي.',
          fr: "Au Maroc, la facture d'électricité comprend deux parties : la puissance souscrite (part fixe) et l'énergie consommée (part variable). Beaucoup ne se concentrent que sur la seconde, alors qu'ajuster la puissance souscrite peut générer des économies annuelles significatives si elle est surévaluée par rapport à votre usage réel.",
        },
      },
      {
        h: { ar: '1. استبدل الإضاءة بالكامل بـ LED', fr: '1. Remplacez tout l’éclairage par des LED' },
        p: {
          ar: 'الإضاءة تمثّل عادة بين 12% و20% من الاستهلاك المنزلي. مصباح LED يستهلك 7 واط مقابل 50 واط لمصباح هالوجين لنفس الإضاءة تقريبًا. في منزل به 30 مصباحًا، الفرق يعادل مئات الدراهم سنويًا، وعمر LED يصل إلى 25.000 ساعة أي 10 أضعاف الهالوجين.',
          fr: "L'éclairage représente habituellement 12 à 20 % de la consommation domestique. Une LED consomme 7 W là où une halogène demande 50 W pour un éclairement comparable. Dans une maison de 30 points lumineux, l'écart équivaut à plusieurs centaines de dirhams par an, avec une durée de vie jusqu'à 25 000 heures, soit dix fois l'halogène.",
        },
      },
      {
        h: { ar: '2. غيّر السخان الكهربائي بسخان شمسي', fr: '2. Remplacez le chauffe-eau électrique par du solaire' },
        p: {
          ar: 'تسخين الماء هو أكبر مستهلك منفرد للكهرباء في المنزل، وقد يبلغ 30% أو أكثر من الفاتورة. السخان الشمسي يوفّر بين 60% و80% من هذه الطاقة، ومع ارتفاع الأسعار يصبح الاستثمار مستردًا في سنوات قليلة فقط.',
          fr: "Le chauffage de l'eau est le plus gros poste individuel d'une maison, pouvant dépasser 30 % de la facture. Un chauffe-eau solaire couvre 60 à 80 % de ce besoin, et avec la hausse des tarifs, l'investissement est amorti en quelques années seulement.",
        },
      },
      {
        h: { ar: '3. اضبط المكيف على 24–26 درجة', fr: '3. Réglez la climatisation entre 24 et 26 °C' },
        p: {
          ar: 'كل درجة أقل تعني استهلاكًا إضافيًا يقارب 7%. ضبط المكيف على 26° مع مروحة سقف يعطي إحساسًا بالبرودة مماثلًا لـ 23° باستهلاك أقل بكثير، ويقلّل أيضًا إجهاد الضاغط ويطيل عمر الجهاز.',
          fr: "Chaque degré en moins augmente la consommation d'environ 7 %. Régler la climatisation à 26 °C avec un ventilateur de plafond procure une sensation comparable à 23 °C pour bien moins d'énergie, tout en réduisant la charge du compresseur et en prolongeant sa durée de vie.",
        },
      },
      {
        h: { ar: '4. نظّف الفلاتر وصيانة المكيفات سنويًا', fr: '4. Nettoyez les filtres et entretenez la climatisation' },
        p: {
          ar: 'الفلاتر المسدودة تقلّل تدفق الهواء فيشتغل الضاغط لمدة أطول للوصول لنفس النتيجة، ويرتفع الاستهلاك. التنظيف كل شهرين في الموسم والصيانة السنوية الكاملة يوفّران عادة بين 10% و15% من استهلاك التكييف.',
          fr: "Des filtres encrassés réduisent le débit d'air : le compresseur tourne plus longtemps pour le même résultat et la consommation grimpe. Un nettoyage tous les deux mois en saison et un entretien annuel complet permettent typiquement 10 à 15 % d'économie sur la climatisation.",
        },
      },
      {
        h: { ar: '5. اطلب دراسة تصحيح معامل الاستطاعة', fr: '5. Faites étudier la compensation d’énergie réactive' },
        p: {
          ar: 'في الفواتير المهنية (المتوسطة والفاعلة)، تُحتسب طاقة تفاعلية تُدفع دون استعمال حقيقي. تركيب مكثفات (Condensateurs) أو بطارية مكثفات مناسبة ينهي هذا الهدر ويمكن أن يخفض الفاتورة بنسبة تتراوح بين 5% و15% بدون أي تغيير في الاستعمال.',
          fr: "Dans les factures professionnelles, une énergie réactive est facturée sans usage réel. Installer des condensateurs adaptés supprime ce gaspillage et peut réduire la facture de 5 à 15 % sans modifier l'usage.",
        },
      },
      {
        h: { ar: '6. استعمل البرمجة والمنظمات الذكية', fr: '6. Utilisez la programmation et les régulations connectées' },
        p: {
          ar: 'منظم حرارة ذكي واحد يمكن أن يوفّر أكثر من استثماره في سنة: يخفض الحرارة ليلًا، يوقف التسخين عند غيابك، ويمنع تسخين غرف غير مستعملة. نفس المنطق ينطبق على تسخين الماء الكهربائي بجهاز تايمر.',
          fr: "Un thermostat connecté peut s'amortir en moins d'un an : il abaisse la température la nuit, coupe le chauffage en votre absence et évite de chauffer les pièces inoccupées. Même logique pour la production d'eau chaude électrique, via un programmateur.",
        },
      },
      {
        h: { ar: '7. اقتنِ الأجهزة ذات تصنيف طاقي مرتفع', fr: '7. Choisissez des appareils bien classés énergétiquement' },
        p: {
          ar: 'الفارق بين ثلاجة A+ و A+++ قد يبلغ 40% من الاستهلاك. على عمر الجهاز (10 سنوات) يصبح الفرق في الفاتورة أكبر من ثمن الجهاز نفسه. القراءة الجيدة لبطاقة الطاقة قبل الشراء هي أفضل استثمار مجاني.',
          fr: "L'écart entre un réfrigérateur A+ et A+++ peut atteindre 40 % de consommation. Sur 10 ans de vie, la différence de facture dépasse le prix de l'appareil. Bien lire l'étiquette énergie avant l'achat est le meilleur investissement gratuit.",
        },
      },
      {
        h: { ar: '8. اقضِ على استهلاك "الوضع الاحتياطي"', fr: '8. Éliminez la consommation en veille' },
        p: {
          ar: 'الأجهزة في وضع الاستعداد تستهلك 24 ساعة يوميًا دون أن تلاحظ: تلفاز، مستقبل، شواحن، حاسوب. تركيب مأخذ بمفتاح لكل مجموعة، أو مقبس متعدد بمفتاح، يقطع هذا الاستهلاك المباشر ويوفّر بين 5% و8% من الفاتورة.',
          fr: "Les appareils en veille consomment 24 heures sur 24 sans qu'on le remarque : télévision, décodeur, chargeurs, ordinateur. Un bloc de prises à interrupteur par groupe coupe cette consommation silencieuse et économise 5 à 8 % de la facture.",
        },
      },
      {
        h: { ar: '9. فكّر في الألواح الشمسية للاستهلاك الذاتي', fr: '9. Étudiez le solaire en autoconsommation' },
        p: {
          ar: 'المغرب يستفيد من أكثر من 3000 ساعة إشعاع سنويًا. نظام استهلاك ذاتي بقدرة 3 كيلوواط ينتج بين 12 و15 كيلوواط/ساعة يوميًا، وهي تغطي جزءًا كبيرًا من الاستهلاك النهاري. الاستثمار يُستَرد عادة في 4 إلى 7 سنوات، ثم تصبح الكهرباء شبه مجانية لعشرين سنة إضافية.',
          fr: "Le Maroc bénéficie de plus de 3 000 heures d'irradiation par an. Un système de 3 kW en autoconsommation produit 12 à 15 kWh par jour, couvrant une bonne part de la consommation diurne. L'investissement est généralement amorti en 4 à 7 ans, puis l'électricité devient quasi gratuite pendant vingt ans supplémentaires.",
        },
      },
    ],
    'choisir-climatisation-tanger': [
      {
        p: {
          ar: 'مناخ طنجة ساحلي: رطوبة نسبية تتراوح غالبًا بين 70% و85%، هواء مالح، وصيف معتدل الحرارة لكنه ثقيل الإحساس. هذا يعني أن معايير اختيار المكيف هنا تختلف تمامًا عن مدن الداخل: التحدي الأكبر ليس التبريد، بل إزالة الرطوبة، مقاومة التآكل، والكفاءة على مدى سنوات.',
          fr: "Le climat de Tanger est océanique : une humidité relative souvent comprise entre 70 et 85 %, un air chargé de sel et un été modéré en température mais lourd à vivre. Les critères de choix d'un climatiseur y diffèrent donc nettement de ceux des villes de l'intérieur : le vrai enjeu n'est pas le refroidissement, mais la déshumidification, la résistance à la corrosion et l'efficacité dans la durée.",
        },
      },
      {
        h: { ar: '1. احسب الاستطاعة على أساس الحجم والحمل لا المساحة فقط', fr: '1. Dimensionnez sur le volume et la charge, pas seulement la surface' },
        p: {
          ar: 'القاعدة الشائعة «100 واط لكل متر مربع» صحيحة للمناطق الجافة فقط. في طنجة يحمل الهواء الرطب حملًا كامنًا (Latent load) يُضاف إلى حمل التبريد، لأن جزءًا من طاقة الجهاز يُستهلك في تكثيف الماء لا في خفض الحرارة. القاعدة العملية: 12.000 BTU لغرفة حتى 22 م²، 18.000 BTU من 25 إلى 35 م²، و24.000 BTU فوق ذلك أو مع سقف مرتفع أو توجّه غربي. والأهم: لا تكبّر الجهاز، لأن المكيف الكبير يبرّد بسرعة ثم يتوقف (Short cycling) فلا يُكمل تجفيف الهواء.',
          fr: "La règle courante de 100 W/m² ne vaut que pour les régions sèches. À Tanger, l'air humide apporte une charge latente qui s'ajoute à la charge de refroidissement : une part de l'énergie sert à condenser l'eau, pas à baisser la température. En pratique : 12 000 BTU jusqu'à 22 m², 18 000 BTU de 25 à 35 m², 24 000 BTU au-delà ou en présence d'une grande hauteur ou d'une exposition ouest. Surtout, ne surdimensionnez pas : un appareil trop puissant refroidit vite puis s'arrête (cyclage court) et n'a pas le temps de finir de déshumidifier.",
        },
      },
      {
        h: { ar: '2. الإنفرتر ضرورة في مناخ رطب، لا رفاهية', fr: '2. En climat humide, l’Inverter est une nécessité, pas un luxe' },
        p: {
          ar: 'المكيف العادي (On/Off) يعمل بكامل طاقته ثم يتوقف، فلا يبقى المبادل باردًا مدة كافية لتكثيف الماء. جهاز الإنفرتر يعمل بسرعة منخفضة ولفترات طويلة، فيحافظ على برودة السطح المبادل ويجفف الهواء فعلًا، مع توفير في الاستهلاك يتراوح عادة بين 30% و40%. في طنجة، هذا الفارق يُحسّ في الإحساس قبل أن يُلاحَظ في الفاتورة.',
          fr: "Un appareil On/Off fonctionne à pleine puissance puis s'arrête : l'échangeur ne reste pas assez froid pour condenser l'eau. Un modèle Inverter tourne à basse vitesse sur de longues périodes, garde l'échangeur froid et déshumidifie réellement, avec 30 à 40 % d'économie habituelle. À Tanger, cette différence se ressent avant même de se lire sur la facture.",
        },
      },
      {
        h: { ar: '3. الحماية من الملح والتآكل', fr: '3. La protection contre le sel et la corrosion' },
        p: {
          ar: 'الهواء المالح يتلف ألياف المبادل الخارجي بسرعة إذا لم تكن معالجة. اطلب مبادلًا بطلاء مضاد للتآكل (Blue Fin أو Golden Fin)، وحوامل ومسامير من الفولاذ المقاوم، وتجنّب تركيب الوحدة الخارجية في مواجهة رذاذ البحر أو في مكان تتجمع فيه المياه. غسل المبادل بماء عذب مرتين سنويًا يطيل عمر الوحدة سنوات مقابل دقائق من العمل.',
          fr: "L'air salin attaque rapidement les ailettes de l'échangeur extérieur s'il n'est pas traité. Exigez un échangeur à revêtement anticorrosion (Blue Fin ou Golden Fin), des supports et vis en acier inoxydable, et évitez d'installer l'unité extérieure face aux embruns ou dans une zone où l'eau stagne. Un rinçage à l'eau douce deux fois par an prolonge la vie de l'appareil de plusieurs années, pour quelques minutes de travail.",
        },
      },
      {
        h: { ar: '4. نوع الوحدة يتبع المكان لا العكس', fr: '4. Le type d’unité suit le lieu, pas l’inverse' },
        p: {
          ar: 'لكل مساحة حلّها المناسب، والخطأ في الاختيار يظهر لاحقًا في شكل التوزيع أو في الميزانية:',
          fr: "Chaque espace a sa solution, et une erreur de choix se paie ensuite en confort de diffusion ou en budget :",
        },
        list: [
          { ar: 'سبليت حائطي: الأفضل لغرف النوم والمكاتب الصغيرة، تركيب بسيط وصيانة سهلة وقطع غيار متوفرة.', fr: "Split mural : idéal pour les chambres et petits bureaux, installation simple, entretien facile et pièces disponibles." },
          { ar: 'كاسيت أو مجرى (Gainable): للمساحات ذات السقف المستعار، يوزّع الهواء بانتظام ولا يشغل حائطًا.', fr: "Cassette ou gainable : pour les espaces à faux plafond, il diffuse uniformément sans occuper de mur." },
          { ar: 'VRV/VRF: للفيلات والمحلات والفنادق، وحدات داخلية متعددة بمكثّف خارجي واحد مع تنظيم مستقل لكل غرفة.', fr: "VRV/VRF : villas, commerces et hôtels — plusieurs unités intérieures pour un seul groupe extérieur, avec régulation indépendante par pièce." },
          { ar: 'تهوية ميكانيكية (VMC): لا تعوّض المكيف، لكنها ضرورية لمنع العفن في الحمامات والمطابخ عالية الرطوبة.', fr: "Ventilation mécanique (VMC) : elle ne remplace pas la climatisation, mais reste indispensable pour éviter les moisissures dans les pièces humides." },
        ],
      },
      {
        h: { ar: '5. التركيب يصنع 70% من النتيجة', fr: '5. L’installation fait 70 % du résultat' },
        p: {
          ar: 'في مناخ رطب تظهر الأخطاء الصغيرة سريعًا: تفريغ غير كافٍ (Tirage au vide) يترك رطوبة داخل الدارة ويتلف الضاغط؛ صرف المكثفات بميل غير صحيح يُقطّر الماء على الحائط؛ عزل ناقص لأنابيب النحاس يجعلها ترشح. اطلب دائمًا تفريغًا كاملًا بعدّاد، عزلًا متصلًا للنحاس، ميلًا واضحًا لماسورة الصرف، وربط المفاصل بعزم مناسب.',
          fr: "En climat humide, les petites erreurs se voient vite : un tirage au vide insuffisant laisse de l'humidité dans le circuit et détruit le compresseur ; une évacuation de condensats mal inclinée fait goutter le mur ; un calorifugeage incomplet des liaisons cuivre les fait ruisseler. Exigez toujours un tirage au vide complet avec manomètre, un isolant continu sur le cuivre, une pente nette vers l'évacuation et un serrage au couple des raccords.",
        },
      },
      {
        h: { ar: '6. الصيانة وقطع الغيار قبل الشعار', fr: '6. Entretien et pièces avant la marque' },
        p: {
          ar: 'نظّف الفلاتر كل شهرين في موسم التشغيل والمبادل الخارجي مرتين سنويًا، وافحص الضغط وشحنة الغاز مرة كل سنة. قبل الشراء تأكد من توفر قطع الغيار والضمان المحلي: ماركة بضمان معتمد في المغرب أفضل من ماركة أقوى لا تجد لها خدمة بعد البيع.',
          fr: "Nettoyez les filtres tous les deux mois en saison et l'échangeur extérieur deux fois par an, et faites contrôler la pression et la charge de gaz une fois par an. Avant l'achat, vérifiez la disponibilité des pièces et la garantie locale : une marque bien représentée au Maroc vaut mieux qu'une marque plus réputée sans service après-vente.",
        },
      },
      {
        h: { ar: 'الخلاصة في خمس نقاط', fr: 'En résumé : cinq points' },
        p: {
          ar: 'إذا احتفظت بخمس قواعد فقط من هذا الدليل، فلتكن هذه:',
          fr: "S'il ne fallait retenir que cinq règles de ce guide, ce seraient celles-ci :",
        },
        list: [
          { ar: 'احسب الحجم والاستعمال أولًا، ثم انتقل إلى الاستطاعة.', fr: "Chiffrez d'abord le volume et l'usage, puis la puissance." },
          { ar: 'فضّل الإنفرتر: يجفف الهواء أفضل ويستهلك أقل.', fr: "Préférez l'Inverter : il déshumidifie mieux et consomme moins." },
          { ar: 'اطلب حماية ضد التآكل الملحي وصيانة دورية مبرمجة.', fr: "Exigez une protection anticorrosion et un entretien périodique planifié." },
          { ar: 'لا تضع الوحدة الخارجية في مواجهة رذاذ البحر مباشرة.', fr: "N'exposez pas l'unité extérieure directement aux embruns." },
          { ar: 'التركيب الجيد والصيانة أهم من سعر الجهاز في النهاية.', fr: "Une bonne installation et un suivi sérieux comptent plus que le prix de l'appareil." },
        ],
      },
    ],

    'panneaux-solaires-guide-maroc': [
      {
        p: {
          ar: 'المغرب يستفيد من أكثر من 3000 ساعة إشعاع شمسي سنويًا، ومع ارتفاع تعريفات الكهرباء أصبح السؤال ليس «هل أركّب الألواح؟» بل «كم أركّب، وبأي نظام، وبأي عائد؟». هذا الدليل يجيب بأرقام واقعية عن الحساب والعائد والضمانات، بعيدًا عن الوعود التجارية.',
          fr: "Le Maroc bénéficie de plus de 3 000 heures d'irradiation par an, et avec la hausse des tarifs la question n'est plus « faut-il installer des panneaux ? » mais « combien, avec quel système et pour quel rendement ? ». Ce guide répond avec des chiffres réalistes sur le dimensionnement, la rentabilité et les garanties, loin des promesses commerciales.",
        },
      },
      {
        h: { ar: '1. الأنواع الثلاثة: أيّها يناسبك فعلًا؟', fr: '1. Les trois types de systèmes : lequel vous convient réellement ?' },
        p: {
          ar: 'قبل أي حساب، يجب تحديد علاقتك بالشبكة. ثلاثة أنظمة تغطي كل الحالات، والخطأ في هذا الاختيار هو أغلى خطأ في المشروع كله:',
          fr: "Avant tout calcul, il faut définir votre rapport au réseau. Trois systèmes couvrent tous les cas, et se tromper ici est l'erreur la plus coûteuse du projet :",
        },
        list: [
          { ar: 'مرتبط بالشبكة (On-grid / استهلاك ذاتي): لا بطاريات، تنتج نهارًا وتستهلك ما تنتجه، والزائد يُصرَّف إلى الشبكة إن كان مسموحًا. الأفضل مردودًا وأقلّ تكلفة.', fr: "Raccordé au réseau (on-grid / autoconsommation) : sans batteries, il produit le jour et vous consommez cette production. Le meilleur rapport coût/rendement." },
          { ar: 'مستقل (Off-grid): بطاريات وذاكرة تخزين كاملة، للمواقع البعيدة أو التي لا تصلها الشبكة.', fr: "Site isolé (off-grid) : batteries et autonomie complète, pour les sites éloignés ou non desservis par le réseau." },
          { ar: 'هجين (Hybride): مرتبط بالشبكة مع بطارية احتياطية، يجمع بين التوفير والاستمرارية عند انقطاع الكهرباء.', fr: "Hybride : raccordé au réseau avec batterie de secours, il combines économies et continuité en cas de coupure." },
        ],
      },
      {
        h: { ar: '2. كيف تحسب حجم النظام في أربع خطوات', fr: '2. Comment dimensionner en quatre étapes' },
        p: {
          ar: 'افتح فاتورة الكهرباء واقرأ الاستهلاك الشهري بالكيلوواط/ساعة (kWh)، ثم طبّق الخطوات التالية على مثال منزل يستهلك 300 kWh شهريًا:',
          fr: "Ouvrez votre facture, relevez la consommation mensuelle en kWh, puis appliquez les étapes suivantes sur l'exemple d'un foyer consommant 300 kWh par mois :",
        },
        list: [
          { ar: 'الخطوة 1: الاستهلاك اليومي = 300 ÷ 30 = 10 كيلوواط/ساعة في اليوم.', fr: "Étape 1 : consommation quotidienne = 300 ÷ 30 = 10 kWh par jour." },
          { ar: 'الخطوة 2: الإنتاج النوعي في المغرب يتراوح بين 4,2 و5,5 كيلوواط/ساعة لكل كيلوواط ذروة يوميًا (طنجة أقرب إلى 4,2–4,6 بسبب الأجواء الساحلية).', fr: "Étape 2 : la productivité au Maroc va de 4,2 à 5,5 kWh/kWc par jour (Tanger plutôt 4,2 à 4,6 en raison de l'ambiance côtière)." },
          { ar: 'الخطوة 3: الاستطاعة المطلوبة = 10 ÷ 4,4 ≈ 2,3 كيلوواط ذروة، أي نحو 5 ألواح من 550 واط.', fr: "Étape 3 : puissance nécessaire = 10 ÷ 4,4 ≈ 2,3 kWc, soit environ 5 panneaux de 550 W." },
          { ar: 'الخطوة 4: عدّل حسب نسبة الاستهلاك النهاري. إذا كنت خارج المنزل نهارًا، أضف بطارية أو اخفض الطموح إلى 60–70% من الاستهلاك.', fr: "Étape 4 : ajustez selon la part de consommation diurne. Si vous êtes absent la journée, ajoutez une batterie ou visez 60 à 70 % de la consommation." },
        ],
      },
      {
        h: { ar: '3. العائد على الاستثمار بالأرقام', fr: '3. Le retour sur investissement en chiffres' },
        p: {
          ar: 'نظام 3 كيلوواط ذروة في طنجة ينتج سنويًا بين 4.800 و5.500 كيلوواط/ساعة. باحتساب تعريفة كهرباء منزلية متوسطة، التوفير السنوي يتراوح عادة بين 5.000 و7.000 درهم، وهي أرقام تُسترد خلال 4 إلى 7 سنوات حسب حجم النظام وسعر التركيب ونمط الاستهلاك. وبعد الاسترداد تبقى الألواح تنتج 20 سنة إضافية على الأقل بمردود متدنٍّ لا يتجاوز 0,5% سنويًا، مع كلفة تشغيل شبه معدومة.',
          fr: "Un système de 3 kWc à Tanger produit entre 4 800 et 5 500 kWh par an. Avec un tarif domestique moyen, l'économie annuelle se situe généralement entre 5 000 et 7 000 dirhams, ce qui amène un amortissement en 4 à 7 ans selon la taille du système, le prix d'installation et le profil de consommation. Ensuite, les panneaux produisent encore vingt ans au moins, avec une dégradation inférieure à 0,5 % par an et un coût d'exploitation quasi nul.",
        },
      },
      {
        h: { ar: '4. الألواح: ما الذي يهم فعلًا؟', fr: '4. Les panneaux : ce qui compte vraiment' },
        p: {
          ar: 'الألواح أحادية البلورة (Monocristallin) نصف الخلية بقدرة 550 واط أصبحت المعيار الحالي، بمردود يقارب 21%. ما يهم قبل الشراء: معامل الحرارة (كلما كان أقل سلبية، انخفض فقدان الإنتاج في حرارة الصيف)، ومقاومة ظاهرة البقعة الساخنة (Hot spot)، ومقاومة الاستقطاب (PID). لا تدفع مبالغ إضافية مقابل فارق نظري في المردود لا يتجاوز 1%؛ فالتركيب والحمايات يؤثران أكثر بكثير.',
          fr: "Les panneaux monocristallins demi-cellule de 550 W sont devenus la norme, avec un rendement proche de 21 %. Ce qui compte avant l'achat : le coefficient de température (plus il est faible, moins la production chute en été), la résistance au point chaud (hot spot) et la résistance à la PID. Ne payez pas un surplus pour un écart de rendement théorique de 1 % : l'installation et les protections pèsent bien davantage.",
        },
      },
      {
        h: { ar: '5. العواكس والبطاريات: أين يضيع المال؟', fr: '5. Onduleurs et batteries : où l’argent se perd' },
        p: {
          ar: 'العاكس هو الدماغ، وجودته تحدد استقرار النظام: عاكس سلسلة (String) يكفي للاستهلاك الذاتي، وعاكس هجين مطلوب إذا أردت بطاريات أو احتياطًا عند الانقطاع. تأكد من وجود أكثر من مدخل MPPT ومن تتبع الشبكة. أما البطاريات، فهي أكبر بند في الميزانية: بطارية الليثيوم LiFePO4 تتحمل 4.000 إلى 6.000 دورة، أي ضعف أو ثلاثة أضعاف بطارية الرصاص، وكلفة الكيلوواط/ساعة المخزَّن عبر عمرها أقل بكثير رغم سعرها الأعلى. ولا تشترِ بطاريات إن كنت غالبًا خارج المنزل نهارًا وتعود بعد غروب الشمس؛ فحينها البطارية ليست رفاهية بل ضرورة، وإلا فالنظام بدونها أوفر وأعقل.',
          fr: "L'onduleur est le cerveau du système et sa qualité conditionne la stabilité : un onduleur string suffit en autoconsommation, un modèle hybride est requis pour des batteries ou un secours en cas de coupure. Vérifiez la présence de plusieurs MPPT et le suivi réseau. Les batteries, elles, constituent le premier poste budgétaire : une batterie lithium LiFePO4 encaisse 4 000 à 6 000 cycles, soit deux à trois fois plus qu'une batterie plomb, pour un coût du kWh stocké bien inférieur sur sa durée de vie malgré un prix d'achat plus élevé. N'achetez pas de batteries si vous êtes surtout absent la journée et rentrez après le coucher du soleil : elles deviennent alors indispensables, sinon le système sans batterie est plus rationnel.",
        },
      },
      {
        h: { ar: '6. الضمانات: اقرأها بالسنتيمتر لا بالدعاية', fr: '6. Les garanties : lisez-les en détail, pas en slogan' },
        p: {
          ar: 'هناك ضمانان مختلفان على الألواح: ضمان المنتج (10 إلى 15 سنة) يغطي عيوب التصنيع، وضمان الأداء (25 إلى 30 سنة) يضمن بقاء الإنتاج فوق 80–85% من القدرة الاسمية. أما العاكس فبين 5 و10 سنوات، والبطارية بين 5 و10 سنوات أو بعدد الدورات أيهما أسبق. ولا تنسَ ضمان التركيب (سنوات) وضمان العزل والحمايات. اطلب كل ذلك مكتوبًا في عرض السعر، لا شفويًا.',
          fr: "Il existe deux garanties distinctes sur les panneaux : la garantie produit (10 à 15 ans) couvre les défauts de fabrication, la garantie de performance (25 à 30 ans) assure une production supérieure à 80-85 % de la puissance nominale. L'onduleur se situe entre 5 et 10 ans, la batterie entre 5 et 10 ans ou en nombre de cycles, selon la première limite atteinte. N'oubliez pas la garantie d'installation et celle de l'étanchéité et des protections. Exigez tout cela par écrit dans le devis, jamais à l'oral.",
        },
      },
      {
        h: { ar: '7. التركيب والأخطاء التي تقتل المردود', fr: '7. L’installation et les erreurs qui tuent le rendement' },
        p: {
          ar: 'لوح جيد بتركيب سيئ ينتج أقل من لوح متوسط بتركيب ممتاز. أبرز الأخطاء: إهمال حساب الظل (مدخنة أو شجرة أو مبنى مجاور تخفض الإنتاج 30% أو أكثر)، استعمال كوابل DC رخيصة بمقطع غير كافٍ، غياب مانع الصواعق وحمايات التيار المستمر والمتردد، تثبيت هيكل لا يتحمل الرياح الساحلية، وإهمال المراقبة (Monitoring) فلا يكتشف أحد توقف سلسلة لأسابيع. أضف إلى ذلك التنظيف: الغبار في المغرب قد يخفض الإنتاج 15% إلى 25%، وغسلة بالماء ثلاث أو أربع مرات سنويًا كافية.',
          fr: "Un bon panneau mal installé produit moins qu'un panneau moyen bien posé. Principales erreurs : négliger les ombrages (cheminée, arbre ou bâtiment voisin peuvent coûter 30 % et plus), utiliser des câbles DC bas de gamme de section insuffisante, omettre le parafoudre et les protections DC/AC, fixer une structure incapable de résister aux vents côtiers, et négliger la supervision : une chaîne peut alors rester arrêtée des semaines sans que personne ne le voie. Ajoutez le nettoyage : la poussière au Maroc peut réduire la production de 15 à 25 %, et trois à quatre lavages par an suffisent.",
        },
      },
      {
        h: { ar: '8. قبل أن توقّع: خمسة أسئلة اسألها للمُركّب', fr: '8. Avant de signer : cinq questions à poser à l’installateur' },
        p: {
          ar: 'الدراسة الجدّية تفرّق بين مركّب ومقاول. اطلب هذه الإجابات مكتوبة، وستعرف فورًا مستواك مع من تتعامل:',
          fr: "Une étude sérieuse distingue l'installateur de l'artisan. Demandez ces réponses par écrit et vous saurez immédiatement à qui vous avez affaire :",
        },
        list: [
          { ar: 'ما الإنتاج السنوي المتوقع بالكيلوواط/ساعة، وعلى أي برنامج حساب بُني؟', fr: "Quelle production annuelle attendez-vous, et sur quel logiciel de calcul repose-t-elle ?" },
          { ar: 'ما نسبة تغطية الاستهلاك النهاري المتوقعة، وما الذي يحدث للفائض؟', fr: "Quel taux de couverture de la consommation diurne, et que devient le surplus ?" },
          { ar: 'ما مراجع الضمانات مكتوبة، وما عنوان الجهة التي تكفلها؟', fr: "Quelles garanties, par écrit, et qui les porte juridiquement ?" },
          { ar: 'هل يشمل العرض مانع الصواعق وحمايات DC/AC والتأريض والمراقبة؟', fr: "Le devis inclut-il parafoudre, protections DC/AC, mise à la terre et supervision ?" },
          { ar: 'ما برنامج الصيانة والتنظيف السنوي، وهل هناك عقد اختياري؟', fr: "Quel programme d'entretien et de nettoyage annuel, avec contrat optionnel ?" },
        ],
      },
    ],


    'entretien-chaudiere-avant-hiver': [
      {
        p: {
          ar: 'معظم أعطال التدفئة لا تحدث في قلب الشتاء، بل في أول موجة برد، لأن الصيانة أُجّلت إلى «وقت الحاجة». ساعة واحدة من الفحص في الخريف تكفي لتفادي شتاء بارد وفاتورة إصلاح في أسوأ توقيت. هذه سبع خطوات مرتّبة، يمكن إنجازها بنفسك أو طلبها من تقني مختص.',
          fr: "La plupart des pannes de chauffage ne surviennent pas au cœur de l'hiver, mais à la première vague de froid, parce que l'entretien a été repoussé. Une heure de contrôle à l'automne évite un hiver froid et une facture de réparation au pire moment. Voici sept étapes, à faire vous-même ou à confier à un technicien.",
        },
      },
      {
        h: { ar: '1. افحص ضغط الدارة وأعد التعبئة عند الحاجة', fr: '1. Contrôlez la pression du circuit et refaites le niveau' },
        p: {
          ar: 'الضغط المطلوب عادة بين 1 و1,5 بار عند الجهاز باردًا. إذا كان أقل من 1 بار، سيتوقف الجهاز عن العمل أو تصدر عنه أصوات. اضبطه بصنبور التعبئة ببطء حتى المؤشر المطلوب، وافحص بعد أسبوع: استمرار الانخفاض يعني تسرّبًا حقيقيًا، وليس عيبًا في المقياس.',
          fr: "La pression attendue se situe généralement entre 1 et 1,5 bar à froid. En dessous de 1 bar, l'appareil s'arrête ou devient bruyant. Complétez lentement par le robinet de remplissage jusqu'à la valeur prescrite, puis revérifiez une semaine plus tard : une baisse persistante signale une vraie fuite, pas un défaut de manomètre.",
        },
      },
      {
        h: { ar: '2. نظّف المرشّي ومصافي الدارة', fr: '2. Nettoyez le filtre et les crépines du circuit' },
        p: {
          ar: 'المرشّي (Filtre à tamis) يحمي المبادل من الصدأ والحصى القادم من الشبكة. أغلقه، فرّغ الضغط، افتحه ونظّف الشبكة، ثم أعد التركيب وافتح الصنبور تدريجيًا مع طرد الهواء. وافحص أيضًا مصافي المداخل إن كانت موجودة.',
          fr: "Le filtre à tamis protège l'échangeur de la rouille et des impuretés du réseau. Fermez les vannes, purgez la pression, ouvrez-le, nettoyez la grille, remontez et rouvrez progressivement en purgeant l'air. Vérifiez également les crépines d'entrée lorsqu'il y en a.",
        },
      },
      {
        h: { ar: '3. اطرد الهواء من الرادياتورات', fr: '3. Purgez l’air des radiateurs' },
        p: {
          ar: 'الرادياتور الساخن من الأعلى والبارد من الأسفل ما هو إلا هواء محتجز. افتح محبس الطرد (Purge) على كل رادياتور واتركه حتى يخرج الهواء ويبدأ خروج الماء بانسياب، ثم أغلقه. أعِد فحص الضغط بعد العملية، لأن طرد الهواء يخفض الضغط في الدارة.',
          fr: "Un radiateur chaud en haut et froid en bas n'est qu'air emprisonné. Ouvrez le purgeur de chaque radiateur et laissez sortir l'air jusqu'à l'arrivée d'eau continue, puis refermez. Recontrôlez la pression après l'opération : la purge fait baisser la pression du circuit.",
        },
      },
      {
        h: { ar: '4. تحقق من الاحتراق والتهوية', fr: '4. Vérifiez la combustion et l’aération' },
        p: {
          ar: 'شعلة زرقاء ثابتة تعني احتراقًا جيدًا؛ أما الشعلة الصفراء أو المترددة فتعني تغذية هواء ناقصة أو شعلة متسخة، وهي التي تنتج أول أكسيد الكربون الخطير. تأكد من أن فتحات تهوية الغرفة مشمولة بالهواء الطلق وغير مسدودة، وأن ماسورة طرد الغازات سليمة ومربوطة جيدًا.',
          fr: "Une flamme bleue stable signale une bonne combustion ; une flamme jaune ou vacillante traduit un manque d'air ou un brûleur encrassé, et c'est elle qui produit du monoxyde de carbone dangereux. Assurez-vous que les grilles d'aération de la pièce restent dégagées et que le conduit d'évacuation est étanche et correctement raccordé.",
        },
      },
      {
        h: { ar: '5. نظّف الشعلة والمبادل الحراري', fr: '5. Nettoyez le brûleur et l’échangeur' },
        p: {
          ar: 'طبقة رقيقة من السخام أو الغبار على المبادل تقلّل نقل الحرارة وترفع الغاز المستهلك بين 5% و10%. نظّف الشعلة بفرشاة ناعمة، وافحص فوهات التوزيع، ونظّف ألياف المبادل من الخارج. هذه العملية تحتاج تقنيًا في الغلايات الحديثة بسبب اللوحات الإلكترونية.',
          fr: "Une fine couche de suie ou de poussière sur l'échangeur dégrade les transferts thermiques et augmente la consommation de gaz de 5 à 10 %. Brossez le brûleur à la brosse douce, contrôlez les gicleurs et nettoyez les ailettes de l'échangeur côté extérieur. Sur les chaudières modernes, l'opération requiert un technicien à cause des cartes électroniques.",
        },
      },
      {
        h: { ar: '6. افحص المضخة ومنظم الحرارة', fr: '6. Contrôlez le circulateur et le thermostat' },
        p: {
          ar: 'المضخة (Circulateur) إذا بقيت ساكنة الصيف كله قد تلتصق، ولها في الغالب برغي دوّار يستعمل لتحريرها بلطف. تأكد من عمل السرعات، ومن عدم وجود أزيز أو سخونة زائدة. وبرمج منظم الحرارة على توقيت واقعي: 19–20° أثناء الحضور، و16–17° ليلًا أو عند الغياب، مع فصل تسخين الغرف غير المستعملة.',
          fr: "Un circulateur resté à l'arrêt tout l'été peut se gripper ; il possède généralement une vis de déblocage à tourner doucement. Vérifiez les vitesses, l'absence de sifflement et la température du corps de pompe. Programmez le thermostat de façon réaliste : 19-20 °C en présence, 16-17 °C la nuit ou en absence, et coupez le chauffage des pièces inutilisées.",
        },
      },
      {
        h: { ar: '7. برمج صيانة سنوية وارفع النتيجة', fr: '7. Planifiez un entretien annuel et gagnez en performance' },
        p: {
          ar: 'اختتم الصيانة بتسجيل موعدها للعام القادم في سبتمبر أو أكتوبر، قبل الازدحام. الصيانة السنوية تحفظ الضمان، ترفع مردود الاحتراق، وتؤجل استبدال الغلاية سنوات. وإذا كانت غلايتك تتجاوز 15 سنة وتتكرر أعطالها، فقارن بين تكلفة الإصلاح المتكررة وثمن غلاية جديدة أكفأ: الفارق في الاستهلاك وحده قد يغطي جزءًا معتبرًا من الاستثمار.',
          fr: "Terminez par la prise de rendez-vous pour l'année suivante, en septembre ou octobre, avant la cohue. L'entretien annuel préserve la garantie, améliore le rendement de combustion et retarde le remplacement de plusieurs années. Si votre chaudière dépasse 15 ans et multiplie les pannes, comparez le coût cumulé des réparations au prix d'un appareil neuf plus performant : la seule différence de consommation peut couvrir une part notable de l'investissement.",
        },
      },
    ],

    'pression-eau-etages-superieurs': [
      {
        p: {
          ar: 'شكوى «الماء لا يصل جيدًا في الطابق الثاني أو الثالث» ليست دائمًا مشكلة في الشبكة العمومية. في أغلب الحالات يكون السبب في تصميم الشبكة الداخلية للمبنى: قطر أنابيب غير كافٍ، خزان مرتفع بمستوى منخفض، ترسبات كلسية، أو مضخة غير مضبوطة. والخبر الجيد أن معظم هذه الأسباب قابلة للإصلاح دون تكسير كبير.',
          fr: "La plainte « l'eau n'arrive pas bien au deuxième ou troisième étage » n'est pas toujours un problème du réseau public. Le plus souvent, la cause est dans la conception du réseau interne du bâtiment : diamètre de tuyauterie insuffisant, réservoir en hauteur au niveau trop faible, dépôts de calcaire ou pompe mal réglée. La bonne nouvelle : la plupart de ces causes se corrigent sans gros travaux.",
        },
      },
      {
        h: { ar: '1. الأسباب الخمسة الأكثر شيوعًا', fr: '1. Les cinq causes les plus fréquentes' },
        p: {
          ar: 'قبل شراء أي مضخة، يجب تحديد السبب الحقيقي، لأن المضخة في المكان الخطأ تزيد الضجيج دون حل المشكلة:',
          fr: "Avant d'acheter la moindre pompe, identifiez la cause réelle : une pompe mal placée ajoutera du bruit sans résoudre le problème.",
        },
        list: [
          { ar: 'الضغط ينخفض طبيعيًا مع الارتفاع: كل طابق يكلّف نحو 0,3 إلى 0,4 بار. إذا كان ضغط الشارع 2 بار فلن يصل إلى الطابق الثالث ضغط كافٍ.', fr: "La pression chute naturellement avec la hauteur : comptez 0,3 à 0,4 bar par étage. Une pression de 2 bar en rue n'atteint donc pas le troisième étage." },
          { ar: 'قطر أنابيب صغير: ماسورة 1/2 بوصة تنقل نصف تدفق 3/4 بوصة تقريبًا عند نفس الضغط، ويظهر الفرق فورًا في الحمام الثاني.', fr: "Un diamètre trop faible : un tube de 1/2 pouce débite environ la moitié d'un 3/4 à pression égale, et l'écart se voit immédiatement au second point d'eau." },
          { ar: 'الترسبات الكلسية والصدأ في الأنابيب الحديدية القديمة ترفع مقاومة الجريان وتضيّق المقطع تدريجيًا.', fr: "Les dépôts calcaires et la rouille des anciennes conduites en acier augmentent les pertes de charge et réduisent progressivement la section." },
          { ar: 'خزان علوي على مستوى منخفض أو غير مرفوع بالقدر الكافي: كل متر ارتفاع إضافي يمنح 0,1 بار فقط، وهي قاعدة صارمة.', fr: "Un réservoir trop bas ou pas assez surélevé : chaque mètre de hauteur ne procure que 0,1 bar, une règle stricte." },
          { ar: 'منظّم ضغط (Réducteur) مضبوط على قيمة منخفضة أو تالف، أو مصفاة مسدودة أو مهوّي (Aérateur) صنبور مليء بالكلس.', fr: "Un réducteur de pression réglé trop bas ou défaillant, une crépine bouchée ou un aérateur de robinet entartré." },
        ],
      },
      {
        h: { ar: '2. قِس قبل أن تقرّر', fr: '2. Mesurez avant de décider' },
        p: {
          ar: 'القياس يميّز بين مشكلة ضغط ومشكلة تدفق، والعلاج يختلف تمامًا. ركّب عدّاد ضغط (Manomètre) عند أبعد صنبور: إن قرأ الضغط الساكن جيدًا (2 بار أو أكثر) ثم انهار بمجرد فتح الصنبور، فالمشكلة في التدفق أي في الأقطار والمقاومات، وليست في ضغط الشبكة. وإن كان الضغط منخفضًا حتى عند الإغلاق، فالمشكلة في مصدر التزويد. قِس أيضًا التدفق باللتر في الدقيقة عند أعلى نقطة، وسجّل الرقمين قبل وبعد أي تعديل.',
          fr: "La mesure distingue un problème de pression d'un problème de débit, et le traitement diffère totalement. Installez un manomètre sur le robinet le plus éloigné : si la pression statique est correcte (2 bar ou plus) puis s'effondre à l'ouverture, le problème est le débit, donc les diamètres et les pertes de charge, pas la pression du réseau. Si elle reste basse à l'arrêt, la cause est en amont. Mesurez aussi le débit en litres par minute au point le plus haut, et notez les deux valeurs avant et après toute modification.",
        },
      },
      {
        h: { ar: '3. الحل الأول: أعد تأهيل الأقطار والمقاومات', fr: '3. Première solution : reprendre les diamètres et les pertes de charge' },
        p: {
          ar: 'قبل التفكير في مضخة، قلّل المقاومة: استبدل المقاطع الضيقة بقطر 3/4 أو 1 بوصة في الخط الرئيسي، وقلّل عدد الأكواع والوصلات الزائدة، واستبدل الأنابيب الحديدية المتكلسة ببوليثيلين أو PPR. مغناطيسية العمل بسيطة هنا: كل ما توفّره من مقاومة يجعل المياه تصل أسرع ويؤجل الحاجة إلى آلة رفع الضغط. كثير من المشاكل تُحلّ في هذه المرحلة وحدها.',
          fr: "Avant d'envisager une pompe, réduisez les pertes de charge : passez la conduite principale en 3/4 ou 1 pouce, supprimez les coudes et raccords superflus et remplacez les tubes acier entartrés par du polyéthylène ou du PPR. La logique est simple : chaque perte de charge supprimée fait arriver l'eau plus vite et repousse la nécessité d'un surpresseur. Beaucoup de problèmes se règlent à cette seule étape.",
        },
      },
      {
        h: { ar: '4. الحل الثاني: مضخة رفع ضغط بمقاس صحيح', fr: '4. Deuxième solution : un surpresseur bien dimensionné' },
        p: {
          ar: 'المضخة تُقاس بمعاملين لا بواحد: التدفق (لتر/دقيقة) والارتفاع (بالمتر). مضخة قوية بتدفق كبير وارتفاع ضعيف لن تخدم الطابق الثالث، ومضخة بارتفاع كبير وتدفق ضعيف ستشغّل الحمام ولا تخدم صنبورين في الوقت نفسه. اختر مضخة بمقبض التردّد (Variateur) تشتغل بالسرعة المطلوبة فقط: استهلاك كهربائي أقل، ضجيج أقل، وعمر أطول، وضغط ثابت بلا تقلبات. وركّبها بعد الخزان وعلى مدخل مستقل، مع قاعدة عازلة للاهتزاز ونقطة صرف قريبة.',
          fr: "Une pompe se dimensionne sur deux paramètres et non un seul : le débit (l/min) et la hauteur manométrique (m). Un appareil très débitant mais à faible hauteur ne desservira pas le troisième étage, et l'inverse ne fera pas fonctionner deux robinets en même temps. Choisissez un modèle à vitesse variable : consommation réduite, bruit plus faible, durée de vie allongée et pression stable sans à-coups. Installez-le en aval du réservoir, sur un départ dédié, avec une assise antivibratile et une évacuation à proximité.",
        },
      },
      {
        h: { ar: '5. مالِك الضغط لحماية التجهيزات', fr: '5. Le réducteur, pour protéger les équipements' },
        p: {
          ar: 'الضغط المرتفع ليس نعمة: فوق 4 بار تتلف سخانات الماء ومزائج الحمام ووصلات الأجهزة. اضبط منظّم ضغط عند نقطة الدخول على 3 بار تقريبًا: سيكون ضغطًا مريحًا لكل الأجهزة ويحمي الشبكة من الضربات المفاجئة. وتحقّق من المنظّم الموجود أصلًا؛ فكثيرًا ما يكون السبب في شكوى ضعف الضغط هو ضبطه المنخفض من طرف ساكن سابق.',
          fr: "Une pression élevée n'est pas un cadeau : au-delà de 4 bar, elle abîme les chauffe-eau, les mitigeurs et les raccords des appareils. Réglez un réducteur en tête d'installation aux alentours de 3 bar : c'est confortable pour tous les équipements et cela protège le réseau des coups de bélier. Contrôlez aussi le réducteur existant : bien des plaintes de « faible pression » viennent d'un réglage trop bas laissé par un ancien occupant.",
        },
      },
      {
        h: { ar: '6. الصيانة: قاتل صامت اسمه الكلس', fr: '6. L’entretien : un tueur silencieux nommé calcaire' },
        p: {
          ar: 'الماء في عدة مناطق مغربية كثير الكلس، وهو يترسّب داخل الأنابيب والمبادلات ومصافي الصنبور. الحل المنهجي: تركيب منظّم عسر الماء (Adoucisseur) يحمي كل الشبكة والأجهزة، وفكّ المهوّيات وشفط الكلس مرة كل ستة أشهر، وتفريغ سخان الماء سنويًا من الرواسب. هذه العادات البسيطة تمنع انسداد المقاطع وتطيل عمر السخان سنوات، وتوفّر الطاقة المستهلكة في تسخين ترسبات بدل الماء.',
          fr: "L'eau est très calcaire dans plusieurs régions marocaines et se dépose dans les canalisations, les échangeurs et les crépines. La méthode : installer un adoucisseur pour protéger l'ensemble du réseau et les appareils, démonter et détartrer les aérateurs tous les six mois, et vidanger annuellement les sédiments du chauffe-eau. Ces gestes simples évitent le colmatage des sections, prolongent le chauffe-eau de plusieurs années et évitent de chauffer du calcaire au lieu de l'eau.",
        },
      },
    ],

    'faux-plafond-errors': [
      {
        p: {
          ar: 'السقف المستعار يعطي أثرًا بصريًا وأنيقًا ويفتح المجال للتشطيب والإضاءة الداخلية، لكنه أيضًا من أكثر العناصر التي تظهر فيها الأخطاء بعد الإنجاز وتصبح مكلفة. خمسة أخطاء نراها في المواقع باستمرار، وكل واحد منها كان يمكن تفاديها قبل إغلاق السقف.',
          fr: "Le faux plafond offre un rendu visuel élégant et ouvre la voie aux finitions et à l'éclairage intégré, mais c'est aussi l'un des ouvrages où les erreurs se révèlent après réception et coûtent cher. Voici cinq erreurs que nous voyons constamment sur chantier, toutes évitables avant la fermeture du plafond.",
        },
      },
      {
        h: { ar: 'الخطأ 1: ارتفاع غير محسوب', fr: 'Erreur 1 : une hauteur mal calculée' },
        p: {
          ar: 'قبل تحديد الارتفاع، احسب من الأسفل إلى الأعلى: سماكة الهيكل المعدني (5 إلى 8 سم)، سماكة الألواح والتشطيب، ثم مساحة العمل الضرورية للقنوات. ممر تكييف أو تهوية قد يحتاج 20 إلى 35 سم، وإن أهملت ذلك ستصطدم لاحقًا بالواقع. اضبط الارتفاع الصافي في غرف الاستقبال على 2,55 متر على الأقل، وفي الممرات والحمامات 2,30 متر كحدّ أدنى، مع احتساب مواقع الإضاءة الغائرة في العمق المتاح.',
          fr: "Avant de fixer la hauteur, comptez du bas vers le haut : l'ossature métallique (5 à 8 cm), l'épaisseur des plaques et de la finition, puis le volume nécessaire aux gaines. Une gaine de climatisation ou de ventilation peut demander 20 à 35 cm, et l'oublier vous rattrapera plus tard. Visez 2,55 m de hauteur libre au minimum dans les pièces de vie, et 2,30 m dans les couloirs et salles d'eau, en tenant compte de la profondeur des luminaires encastrés.",
        },
      },
      {
        h: { ar: 'الخطأ 2: نسيان تجهيزات تُنجَز قبل الإغلاق', fr: 'Erreur 2 : oublier les équipements à prévoir avant fermeture' },
        p: {
          ar: 'بعد تركيب الألواح وطلائها، تصبح أي إضافة عملية مكلفة وملوّثة. قبل الإغلاق يجب حسم كل شيء: مواقع الإضاءة المنزلية (Spots)، مصابيح الطوارئ، كاشف الدخان، شفط الهواء، كوابل الشبكة والكاميرات، ومكبّرات الصوت، ومسارات الأسلاك: تمر كلها داخل السقف. ورسم مخطط الإضاءة مع الستائر والعفش لا مع الجدران فقط، لأن الإضاءة الصحيحة تُوزَّع على أساس الاستعمال لا الشكل الهندسي للغرفة.',
          fr: "Une fois les plaques posées et peintes, tout ajout devient coûteux et salissant. Avant fermeture, tout doit être décidé : emplacements des spots, éclairage de sécurité, détecteur de fumée, extraction d'air, câblage réseau et caméras, enceintes, et chemins de câbles — tout passe dans le plafond. Dessinez le plan d'éclairage en fonction des meubles et des rideaux, pas seulement des murs : un bon éclairage se répartit selon l'usage, non selon la géométrie de la pièce.",
        },
      },
      {
        h: { ar: 'الخطأ 3: إهمال مقاومة الرطوبة', fr: 'Erreur 3 : négliger la résistance à l’humidité' },
        p: {
          ar: 'لوح عادي في حمام أو مطبخ يعني انتفاخًا وتمددًا وتقشّرًا خلال أشهر، ثم عزلًا وفطريات. استعمل في الحمامات والمطابخ ألواحًا مقاومة للرطوبة (النوع الأخضر أو H2)، واطلِ أطراف القطع المكشوفة بمادة سادة للماء، وأضف حاجز بخار في الأماكن الأكثر رطوبة. وفوق ذلك، لا فائدة من لوح ممتاز بلا تهوية: شفاطة هواء كافية هي التي تمنع تكوّن الرطوبة من الأصل. في طنجة ذات الرطوبة الساحلية العالية، هذه النقطة ليست تفصيلًا بل شرط.',
          fr: "Une plaque ordinaire dans une salle de bain ou une cuisine signifie gonflement, dilatation et écaillage en quelques mois, puis moisissures. Utilisez en pièces humides des plaques hydrofuges (type vert ou H2), enduisez les chants coupés d'un produit d'étanchéité et ajoutez un pare-vapeur dans les zones les plus exposées. Et surtout, une excellente plaque ne sert à rien sans ventilation : une extraction suffisante empêche l'humidité de se former. À Tanger, où l'humidité côtière est forte, ce point n'est pas un détail mais une condition.",
        },
      },
      {
        h: { ar: 'الخطأ 4: هيكل ضعيف وحمولات غير محسوبة', fr: 'Erreur 4 : une ossature faible et des charges non calculées' },
        p: {
          ar: 'السقف المستعار يُعلَّق، ولا يحمل شيئًا لم يُحسب له. احترم تباعد القوائم (40 إلى 60 سم حسب السماكة والحمولة)، وثبّت الثريات الثقيلة ومكيفات السقف والشاشات في البلاطة نفسها بعناصر تعليق مستقلة، لا في اللوح ولا في الهيكل الفرعي. فاللوح يتحمل وزنه ووزن التشطيب فقط، وأي حمل إضافي غير محسوب يظهر بعد أشهر في صورة ترهّل أو تشقّق على شكل حرف U.',
          fr: "Un faux plafond se suspend et ne porte rien qui n'ait été calculé. Respectez l'entraxe des fourrures (40 à 60 cm selon l'épaisseur et la charge) et fixez les lustres lourds, climatiseurs de plafond et écrans directement dans le plancher, avec des suspentes indépendantes — jamais dans la plaque ni dans l'ossature secondaire. La plaque ne porte que son poids et celui de la finition : toute charge non calculée se traduit, quelques mois plus tard, par un affaissement ou une fissure en U.",
        },
      },
      {
        h: { ar: 'الخطأ 5: إغلاق دائم بلا منافذ صيانة', fr: 'Erreur 5 : une fermeture définitive sans trappes de visite' },
        p: {
          ar: 'كل ما يُخفى في السقف يحتاج يومًا إلى تدخل: محابس الماء، مضخة الصرف، محرّك الشفط، صرف مكيف، وحدة VRV داخلية. اترك منافذ زيارة (Trappes de visite) بمقاسات كافية عند هذه النقاط، ويفضل أن تكون مخفية في تصميم السقف لا ملصقة بشكل عشوائي. وثبّت منفذًا قرب صرف المكيف دائمًا، لأن انسداد الصرف مسألة وقت لا احتمال، وترى أثره في صورة بقع ماء على السقف.',
          fr: "Tout ce qui se cache dans le plafond aura un jour besoin d'intervention : vannes d'eau, pompe de relevage, moteur d'extraction, évacuation de climatisation, unité intérieure VRV. Prévoyez des trappes de visite de dimensions suffisantes à ces endroits, de préférence intégrées au dessin du plafond plutôt qu'ajoutées au hasard. Placez toujours un accès près de l'évacuation de condensats : un bouchon n'est pas une hypothèse mais une question de temps, et son symptôme est une tache d'eau au plafond.",
        },
      },
      {
        h: { ar: 'قائمة تحقق قبل بدء التنفيذ', fr: 'Check-list avant de commencer' },
        p: {
          ar: 'راجع هذه النقاط مع المنفّذ قبل تركيب أول قائمة، وستوفّر على نفسك إعادة العمل:',
          fr: "Passez ces points en revue avec l'entreprise avant de poser la première fourrure : vous vous épargnerez une reprise.",
        },
        list: [
          { ar: 'الارتفاع الصافي محسوب مع القنوات والإضاءة الغائرة.', fr: "Hauteur libre calculée en tenant compte des gaines et des luminaires encastrés." },
          { ar: 'مخطط الإضاءة والتجهيزات جاهز وموقّع قبل الإغلاق.', fr: "Plan d'éclairage et d'équipements prêt et validé avant fermeture." },
          { ar: 'ألواح مقاومة للرطوبة في الحمامات والمطابخ.', fr: "Plaques hydrofuges dans les pièces humides." },
          { ar: 'تباعد الهيكل محترم والتعليق الثقيل مثبّت في البلاطة.', fr: "Entraxe de l'ossature respecté et charges lourdes fixées au plancher." },
          { ar: 'منافذ صيانة عند المحابس والصرف والمحركات.', fr: "Trappes de visite près des vannes, évacuations et moteurs." },
        ],
      },
    ],
};
