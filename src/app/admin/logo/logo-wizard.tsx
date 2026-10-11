"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveLogoAction, type LogoActionState } from "../catalog-actions";

const initialActionState: LogoActionState = { error: null };
const maxLogoBytes = 5 * 1024 * 1024;
const imageExtension = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

const steps = [
  { number: 1, title: "اختيار الشعار" },
  { number: 2, title: "المعاينة" },
  { number: 3, title: "التأكيد والنشر" },
] as const;

type Props = {
  currentLogoUrl: string;
  logoText: string;
  nameAr: string;
  nameFr: string;
  taglineAr: string;
  taglineFr: string;
  uploadHint: string;
  uploadsEnabled: boolean;
};

function isSafeImageSource(value: string) {
  const source = value.trim();
  if (!source) return true;
  if (source.startsWith("/") && !source.startsWith("//") && !source.includes("\\")) return true;
  try {
    const url = new URL(source);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function LogoMark({
  logoUrl,
  logoText,
  alt,
  failed,
  onError,
}: {
  logoUrl: string;
  logoText: string;
  alt: string;
  failed: boolean;
  onError: () => void;
}) {
  if (logoUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={alt}
        onError={onError}
        className="h-11 w-auto max-w-[9rem] object-contain"
      />
    );
  }

  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-800 to-brand-600 px-1 text-sm font-black text-white shadow">
      {logoText || "ATC"}
    </span>
  );
}

function PreviewPanel({
  locale,
  name,
  tagline,
  logoUrl,
  logoText,
  failed,
  onImageError,
}: {
  locale: "ar" | "fr";
  name: string;
  tagline: string;
  logoUrl: string;
  logoText: string;
  failed: boolean;
  onImageError: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 bg-brand-950 px-4 py-2 text-[11px] text-white/75">
        <span>{locale === "ar" ? "معاينة الموقع بالعربية" : "Aperçu du site en français"}</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">/{locale}</span>
      </div>
      <div dir={locale === "ar" ? "rtl" : "ltr"} className="flex min-h-[5.25rem] items-center gap-3 px-4 py-3 sm:px-5">
        <LogoMark
          logoUrl={logoUrl}
          logoText={logoText}
          alt={name}
          failed={failed}
          onError={onImageError}
        />
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-extrabold text-brand-950">{name}</span>
          <span className="mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-wide text-accent-600">
            {tagline}
          </span>
        </span>
        <div className="ms-auto hidden items-center gap-3 text-[10px] font-semibold text-slate-500 sm:flex">
          <span>{locale === "ar" ? "الرئيسية" : "Accueil"}</span>
          <span>{locale === "ar" ? "الخدمات" : "Services"}</span>
          <span>{locale === "ar" ? "اتصل بنا" : "Contact"}</span>
        </div>
      </div>
    </section>
  );
}

function PublishButton({ published }: { published: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending || published}>
      {pending ? "جاري النشر…" : published ? "تم نشر الشعار ✓" : "تأكيد ونشر الشعار"}
    </button>
  );
}

export function LogoWizard({
  currentLogoUrl,
  logoText: initialLogoText,
  nameAr,
  nameFr,
  taglineAr,
  taglineFr,
  uploadHint,
  uploadsEnabled,
}: Props) {
  const [logoUrl, setLogoUrl] = useState(currentLogoUrl);
  const [logoText, setLogoText] = useState(initialLogoText || "ATC");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [inputError, setInputError] = useState("");
  const [unavailableImageUrl, setUnavailableImageUrl] = useState("");
  const [state, formAction] = useActionState(saveLogoAction, initialActionState);
  const normalizedLogoUrl = logoUrl.trim();
  const normalizedLogoText = logoText.trim() || "ATC";
  const imageUnavailable = Boolean(normalizedLogoUrl && unavailableImageUrl === normalizedLogoUrl);
  const published =
    state.ok === true &&
    state.savedLogoUrl === normalizedLogoUrl &&
    state.savedLogoText === normalizedLogoText;


  function handleNext() {
    setInputError("");
    if (step === 1) {
      if (!isSafeImageSource(logoUrl)) {
        setInputError("أدخل رابط صورة يبدأ بـ https:// أو مساراً محلياً مثل /media/logo.png.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (normalizedLogoUrl && imageUnavailable) {
        setInputError("تعذر تحميل الصورة لمعاينتها. تحقق من الرابط أو اختر صورة أخرى.");
        return;
      }
      setStep(3);
    }
  }

  async function uploadSelectedLogo() {
    setUploadError("");
    setUploadMessage("");
    if (!selectedFile) {
      setUploadError("اختر ملف صورة أولاً.");
      return;
    }
    if (!selectedFile.type.startsWith("image/") && !imageExtension.test(selectedFile.name)) {
      setUploadError("الملف المحدد ليس صورة. اختر PNG أو JPG أو SVG أو WebP.");
      return;
    }
    if (selectedFile.size > maxLogoBytes) {
      setUploadError("حجم الصورة يجب أن يكون 5 ميغابايت أو أقل.");
      return;
    }

    const data = new FormData();
    data.set("file", selectedFile);
    data.set("purpose", "logo");
    setUploading(true);
    try {
      const response = await fetch("/admin/media/upload", { method: "POST", body: data });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        setUploadError(result.error || "تعذر رفع الصورة. حاول مرة أخرى.");
        return;
      }
      setLogoUrl(result.url);
      setUnavailableImageUrl("");
      setUploadMessage("تم رفع الصورة واختيارها. لن تظهر على الموقع حتى تؤكد النشر في الخطوة الأخيرة.");
      setSelectedFile(null);
      const input = document.getElementById("logo-file") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch {
      setUploadError("تعذر الاتصال بخدمة الرفع. حاول مرة أخرى.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-5">
      <ol aria-label="خطوات تغيير الشعار" className="grid gap-2 sm:grid-cols-3">
        {steps.map((item) => {
          const active = step === item.number;
          const complete = step > item.number;
          return (
            <li
              key={item.number}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                active
                  ? "border-brand-800 bg-brand-950 text-white"
                  : complete
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/10 text-sm font-black">
                {complete ? "✓" : item.number}
              </span>
              <span className="text-sm font-extrabold">{item.title}</span>
            </li>
          );
        })}
      </ol>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-extrabold text-accent-700">الخطوة {step} من 3</p>
        <h2 className="mt-1 text-xl font-extrabold text-brand-950">{steps[step - 1].title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {step === 1
            ? "ارفع ملف الشعار أو الصق رابط صورة موجودة. يمكنك أيضاً الرجوع إلى الأحرف المختصرة بدون صورة."
            : step === 2
              ? "تحقق من توازن الشعار مع اسم الموقع في رأسي الموقع العربي والفرنسي."
              : "راجع الاختيار ثم انشره. سيحل الشعار الجديد محل الحالي على واجهة الموقع."}
        </p>

        {step === 1 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label htmlFor="logo-file" className="block text-sm font-extrabold text-brand-950">
                  1. رفع صورة جديدة
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-500">{uploadHint} الحد الأقصى لصورة الشعار 5 ميغابايت.</p>
                <input
                  id="logo-file"
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml,image/avif,.png,.jpg,.jpeg,.gif,.webp,.svg,.avif"
                  disabled={!uploadsEnabled || uploading}
                  onChange={(event) => {
                    setSelectedFile(event.target.files?.[0] ?? null);
                    setUploadError("");
                    setUploadMessage("");
                  }}
                  className="mt-3 block w-full text-sm file:me-3 file:rounded-lg file:border-0 file:bg-brand-100 file:px-3 file:py-2 file:text-xs file:font-bold file:text-brand-900"
                />
                {selectedFile ? (
                  <p className="mt-2 truncate text-xs text-slate-500" title={selectedFile.name}>
                    الملف المحدد: {selectedFile.name}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={uploadSelectedLogo}
                  disabled={!uploadsEnabled || uploading || !selectedFile}
                  className="btn btn-dark mt-3 !px-4 !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? "جاري رفع الصورة…" : "رفع الصورة واستخدامها"}
                </button>
                {uploadError ? <p role="alert" className="mt-2 text-xs font-bold text-red-700">{uploadError}</p> : null}
                {uploadMessage ? <p className="mt-2 text-xs font-semibold text-emerald-700">{uploadMessage}</p> : null}
              </div>

              <div>
                <label htmlFor="logo-url" className="block text-sm font-extrabold text-brand-950">
                  2. رابط صورة من المكتبة أو من الإنترنت
                </label>
                <input
                  id="logo-url"
                  type="text"
                  dir="ltr"
                  autoComplete="url"
                  value={logoUrl}
                  onChange={(event) => {
                    setLogoUrl(event.target.value);
                    setUnavailableImageUrl("");
                    setInputError("");
                  }}
                  placeholder="https://… أو /media/logo.png"
                  className="field mt-2 text-left"
                />
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  يمكنك نسخ رابط صورة من{" "}
                  <Link href="/admin/media" className="font-bold text-brand-800 underline">
                    المكتبة الإعلامية
                  </Link>
                  {" "}ولصقه هنا.
                </p>
              </div>

              <label className="block">
                <span className="text-sm font-extrabold text-brand-950">الأحرف البديلة عند عدم وجود صورة</span>
                <input
                  type="text"
                  dir="ltr"
                  value={logoText}
                  maxLength={24}
                  onChange={(event) => setLogoText(event.target.value)}
                  placeholder="ATC"
                  className="field mt-2 max-w-xs"
                />
              </label>
              {inputError ? <p role="alert" className="text-sm font-bold text-red-700">{inputError}</p> : null}
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-dashed border-slate-300 bg-white p-5">
              <div>
                <p className="text-sm font-extrabold text-brand-950">الشعار المختار الآن</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">المعاينة النهائية ستظهر في الخطوة التالية.</p>
              </div>
              <div className="flex min-h-28 items-center justify-center rounded-xl bg-slate-50 p-4">
                <LogoMark
                  logoUrl={normalizedLogoUrl}
                  logoText={normalizedLogoText}
                  alt={nameFr}
                  failed={imageUnavailable}
                  onError={() => setUnavailableImageUrl(normalizedLogoUrl)}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setLogoUrl("");
                  setUnavailableImageUrl("");
                  setInputError("");
                }}
                className="text-start text-xs font-bold text-red-700 underline underline-offset-2"
              >
                استخدام الأحرف المختصرة بدلاً من الصورة
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6 space-y-4">
            <PreviewPanel
              locale="ar"
              name={nameAr}
              tagline={taglineAr}
              logoUrl={normalizedLogoUrl}
              logoText={normalizedLogoText}
              failed={imageUnavailable}
              onImageError={() => setUnavailableImageUrl(normalizedLogoUrl)}
            />
            <PreviewPanel
              locale="fr"
              name={nameFr}
              tagline={taglineFr}
              logoUrl={normalizedLogoUrl}
              logoText={normalizedLogoText}
              failed={imageUnavailable}
              onImageError={() => setUnavailableImageUrl(normalizedLogoUrl)}
            />
            <p className="text-xs leading-5 text-slate-500">
              الصورة ستُعرض داخل مساحة مناسبة في رأس الموقع؛ احتفظ بالاسم التجاري والشعار النصي بجانبها كما هما.
            </p>
            {normalizedLogoUrl && imageUnavailable ? (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                لم نتمكن من تحميل الصورة. ارجع إلى الخطوة الأولى وتحقق من الرابط أو ارفع صورة أخرى.
              </p>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <form action={formAction} className="mt-6 space-y-5">
            <input type="hidden" name="logoUrl" value={normalizedLogoUrl} />
            <input type="hidden" name="logoText" value={normalizedLogoText} />
            {state.error ? (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {state.error}
              </p>
            ) : null}
            {published ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">
                تم حفظ الشعار ونشره. يمكنك معاينة الموقع مباشرة:
                <div className="mt-2 flex gap-3">
                  <Link href="/ar" target="_blank" rel="noreferrer" className="underline underline-offset-2">الموقع بالعربية</Link>
                  <Link href="/fr" target="_blank" rel="noreferrer" className="underline underline-offset-2">الموقع بالفرنسية</Link>
                </div>
              </div>
            ) : null}
            <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="grid h-20 w-32 place-items-center rounded-lg bg-white p-3">
                <LogoMark
                  logoUrl={normalizedLogoUrl}
                  logoText={normalizedLogoText}
                  alt={nameFr}
                  failed={imageUnavailable}
                  onError={() => setUnavailableImageUrl(normalizedLogoUrl)}
                />
              </div>
              <div className="min-w-0 text-sm">
                <p className="font-extrabold text-brand-950">{normalizedLogoUrl ? "صورة الشعار المحددة" : "استخدام الأحرف المختصرة"}</p>
                <p className="mt-1 break-all text-xs text-slate-500">{normalizedLogoUrl || normalizedLogoText}</p>
                <p className="mt-2 text-xs text-slate-500">سيظهر التغيير على الموقع بالعربية والفرنسية، في الرأس والتذييل.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <PublishButton published={published} />
              <button type="button" onClick={() => setStep(1)} className="btn btn-outline !border-slate-300 !py-2 !text-sm !text-brand-900">
                تعديل الاختيار
              </button>
            </div>
          </form>
        ) : null}

        {step < 3 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            {step === 2 ? (
              <button type="button" onClick={() => setStep(1)} className="btn btn-outline !border-slate-300 !py-2 !text-sm !text-brand-900">
                رجوع
              </button>
            ) : (
              <span className="text-xs text-slate-400">لا يتغير الموقع قبل خطوة النشر.</span>
            )}
            <button type="button" onClick={handleNext} className="btn btn-primary !py-2.5">
              {step === 1 ? "التالي: معاينة الشعار" : "التالي: مراجعة ونشر"}
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
