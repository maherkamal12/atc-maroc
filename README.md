# أطلس تك كونسيبت | Atlas Tech Concept

موقع ثنائي اللغة (العربية — الفرنسية) لشركة **أطلس تك كونسيبت** المتخصصة في الحلول التقنية المتكاملة للمباني: الكهرباء، السباكة، التدفئة المركزية، التكييف والتهوية، الطاقة الشمسية، والتجهيز الداخلي والتشطيب.

> Site bilingue (arabe / français) d'**Atlas Tech Concept** : solutions techniques intégrées pour le bâtiment — électricité, plomberie, chauffage central, climatisation & ventilation, énergie solaire, aménagement intérieur et finition.

---

## تشغيل المشروع | Démarrage

```bash
npm install
npm run dev      # http://localhost:3000  →  يُعاد توجيهه إلى /ar
npm run build && npm start
```

العربية هي اللغة الافتراضية (`dir="rtl"`)، والفرنسية متاحة على `/fr` (`dir="ltr"`).

---

## بنية الموقع | Arborescence

| الصفحة (AR) | الصفحة (FR) | المحتوى |
|---|---|---|
| `/ar` | `/fr` | الرئيسية: هيرو، شريط متحرك، لماذا نحن، أرقام، الخدمات، المنتجات، التصميم، المنهجية، شهادات، المدونة، دعوة للتواصل |
| `/ar/a-propos` | `/fr/a-propos` | المهمة، الرؤية، الهدف، أربع قيم، الفريق، القطاعات، مناطق التدخل |
| `/ar/services` | `/fr/services` | فهرس الخدمات الستّ |
| `/ar/services/[slug]` | `/fr/services/[slug]` | الكهرباء · السباكة · التدفئة المركزية · التكييف والتهوية · الطاقة الشمسية · التجهيز الداخلي — كل صفحة بمجالات التدخل، المراحل، المخرجات، المزايا، والأسئلة الشائعة |
| `/ar/produits` | `/fr/produits` | متجر بفلاتر (الفئة، الترتيب، السعر، التوفّر) |
| `/ar/produits/[category]` | … | خمس فئات: تجهيزات كهربائية · سباكة · تكييف · طاقة شمسية · أجهزة منزلية |
| `/ar/produits/[category]/[product]` | … | 30 صفحة منتج مع جدول المواصفات، الضمان، والمنتجات ذات الصلة |
| `/ar/design` | `/fr/design` | التصميم والتزيين: التصميم الداخلي، تنسيق الديكور، التصميم الخارجي + معرض الأعمال |
| `/ar/contact` | `/fr/contact` | معلومات الاتصال، ساعات العمل، الخريطة، ونموذج تواصل فعّال |
| `/ar/blog` | `/fr/blog` | ستّ مقالات تقنية كاملة المحتوى |
| `/ar/blog/[slug]` | `/fr/blog/[slug]` | مقال كامل: مقدمة، أقسام مرقّمة، قوائم، دعوة للتواصل، مقالات ذات صلة |
| `/ar/plan-du-site` | `/fr/plan-du-site` | خريطة الموقع |
| `/ar/mentions-legales` · `/confidentialite` · `/conditions` | … | الصفحات القانونية (المعلومات القانونية، الخصوصية وفق القانون 09-08 و CNDP، شروط الاستخدام) |
| خطأ 404 | | صفحة مخصّصة |

---

## التقنيات | Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 3**
- **الخطوط:** `@fontsource-variable/cairo` للعربية و `@fontsource-variable/inter` للاتينية — مستضافة محليًا دون أي CDN خارجي
- **الأيقونات:** `lucide-react`

### توجيه اللغات | Routage des langues

`src/middleware.ts`:

- `/` → `/ar`، وكل مسار غير مُسبَّق باللغة يُعاد توجيهه حسب ترويسة `Accept-Language`
- **إعادة توجيه دائمة (301) للروابط التاريخية** بالفرنسية والعربية معًا:
  `/fr/accueil` → `/fr`، `/fr/contactez-nous` → `/fr/contact`،
  `/plomberie-reseaux-eau` → `/services/plomberie`، `/الكهرباء` → `/ar/services/electricite` …

### لوحة التحكم بالمحتوى | Couche de contenu

كل النصوص ثنائية اللغة وتوجد في `src/content/`:

```
ui.ts            نصوص الواجهة والتنقل والأزرار والنماذج
services.ts      الخدمات الستّ بمحتوى تفصيلي
products.ts      خمس فئات و30 منتجًا بالأسعار والمواصفات
site.ts          معلومات الشركة، الشهادات، المقالات، مناطق التدخل
blog-bodies.ts   المحتوى الكامل للمقالات الستّ
```

### SEO

- `canonical` و `hreflang` (ar / fr / x-default) على كل صفحة
- `sitemap.xml` (116 رابطًا) و `robots.txt`
- بيانات منظّمة JSON-LD: `GeneralContractor` · `Service` + FAQ · `Product` · `BlogPosting`

### واجهات برمجية | API

| المسار | الوصف |
|---|---|
| `POST /api/contact` | التحقق من الحقول (الاسم، البريد، الهاتف، الموضوع، الرسالة، الموافقة) — يعيد `422` مع قائمة الحقول الناقصة، ويحفظ الطلب في `.data/leads.ndjson` |
| `POST /api/newsletter` | التحقق من البريد — يعيد `422` عند الخطأ، ويحفظ الاشتراك في `.data/newsletter.ndjson` |

مجلد `.data/` مُستثنى من Git.

---

## الصور | Ressources visuelles

```bash
node scripts/make-product-tiles.mjs   # 35 صورة منتج (JPEG 1200×900)
node scripts/make-icons.mjs           # أيقونات الموقع (favicon + apple-icon)
node scripts/make-art-tiles.mjs       # لوحات معرض التصميم (SVG)
```

صور المنتجات ومعرض التصميم رسوم تقنية مسطّحة بلوحة ألوان الهوية (كحلي/ذهبي)، وليست صورًا مأخوذة من أي موقع آخر.

---

## ملاحظات | Notes

- الشركة: **ATLAS TECH CONCEPT** — طنجة، المغرب · الهاتف/واتساب `+212 780 891 026`
- المحتوى الحالي أُعدّ لأغراض العرض، ويُستحسن مراجعته من طرف الشركة قبل النشر النهائي.
