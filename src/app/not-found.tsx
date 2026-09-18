import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-950 px-6 text-center text-white">
      <div>
        <p className="text-6xl font-black text-accent-500">404</p>
        <h1 className="mt-4 text-2xl font-extrabold md:text-3xl">
          الصفحة غير موجودة · Page introuvable
        </h1>
        <p className="mt-3 text-sm text-white/70">
          عذراً، لم نتمكن من العثور على الصفحة المطلوبة. · Désolé, cette page n&apos;existe pas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/ar" className="btn btn-primary">
            الرئيسية
          </Link>
          <Link href="/fr" className="btn btn-outline">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
