import Link from "next/link";
import { AdminHeader, DbBanner } from "../_ui";
import { deletePageAction } from "../catalog-actions";
import { listCustomPages } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function AdminPagesIndex({
  searchParams,
}: {
  searchParams: Promise<{ db?: string }>;
}) {
  const [{ db }, pages] = await Promise.all([searchParams, listCustomPages()]);
  return (
    <div className="space-y-6">
      <AdminHeader
        title="الصفحات"
        subtitle="نصوص وصور الصفحات الحالية + إنشاء صفحات بنفس التصميم."
        action={{ href: "/admin/pages/new", label: "صفحة جديدة" }}
      />
      <DbBanner failed={db === "error"} />

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { href: "/admin/content#الرئيسية", title: "الرئيسية", hint: "الشاشة والنصوص والصور" },
          { href: "/admin/content#من نحن", title: "من نحن", hint: "المهمة والرؤية والصورة" },
          { href: "/admin/content#التصميم", title: "التصميم", hint: "أقسام وصور" },
          { href: "/admin/content#اتصل بنا", title: "اتصل بنا", hint: "المقدمة والصورة" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="font-extrabold text-brand-950">{item.title}</p>
            <p className="text-xs text-slate-500">{item.hint} — تعديل النصوص والصور</p>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-extrabold text-brand-950">الصفحات المنشأة</h2>
      {pages.length ? (
        <div className="space-y-3">
          {pages.map((page) => (
            <article
              key={page.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-extrabold">{page.titleFr}</p>
                <p className="text-xs text-slate-500">
                  /p/{page.slug} · {page.published ? "منشورة" : "مسودة"}
                </p>
              </div>
              <div className="flex gap-3 text-xs font-bold">
                <Link href={`/fr/p/${page.slug}`} className="text-brand-700">
                  عرض
                </Link>
                <Link href={`/admin/pages/${page.id}`}>تعديل</Link>
                <form action={deletePageAction}>
                  <input type="hidden" name="id" value={page.id} />
                  <button className="text-red-600">حذف</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          لا صفحات مخصصة. أنشئوا واحدة: رأس + أقسام صورة/نص مثل صفحة التصميم.
        </p>
      )}
    </div>
  );
}
