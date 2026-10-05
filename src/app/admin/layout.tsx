import type { ReactNode } from "react";
import Link from "next/link";
import { getAdminSession, isAdmin, logout, usingDefaultAdminPassword } from "./actions";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "لوحة التحكم", icon: "📊" },
  { href: "/admin/products", label: "المنتجات", icon: "📦" },
  { href: "/admin/categories", label: "التصنيفات", icon: "🗂️" },
  { href: "/admin/services", label: "الخدمات", icon: "🛠️" },
  { href: "/admin/blog", label: "المدونة", icon: "✍️" },
  { href: "/admin/media", label: "المكتبة الإعلامية", icon: "🖼️" },
  { href: "/admin/pages", label: "الصفحات", icon: "📄" },
  { href: "/admin/content", label: "النصوص والصور", icon: "📝" },
  { href: "/admin/menu", label: "القائمة والشعار", icon: "🧭" },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: "⚙️" },
  { href: "/admin/messages", label: "الرسائل", icon: "✉️" },
  { href: "/admin/orders", label: "الطلبات", icon: "🧾" },
  { href: "/admin/users", label: "المدير والمستخدمون", icon: "👤", managerOnly: true },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdmin();
  const usingDefault = await usingDefaultAdminPassword();
  const session = authed ? await getAdminSession() : null;

  if (!authed) {
    return (
      <LoginForm
        showDefaultHint={process.env.NODE_ENV !== "production" && usingDefault}
        productionWarning={process.env.NODE_ENV === "production" && usingDefault}
      />
    );
  }

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-brand-950 p-6 text-white lg:min-h-screen">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xs font-black">
            ATC
          </span>
          <span className="text-sm font-extrabold">إدارة أطلس تك</span>
        </Link>
        <nav className="mt-8 grid grid-cols-2 gap-1 lg:grid-cols-1">
          {links
            .filter((link) => !("managerOnly" in link && link.managerOnly) || session?.role === "manager")
            .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 space-y-2 border-t border-white/10 pt-6 text-xs text-white/60">
          {session ? (
            <p className="text-white/80">
              {session.displayName}{" "}
              <span className="text-white/50">({session.role === "manager" ? "مدير" : "مستخدم"})</span>
            </p>
          ) : null}
          <Link href="/ar" className="block hover:text-accent-400">
            ← الموقع بالعربية
          </Link>
          <Link href="/fr" className="block hover:text-accent-400">
            ← الموقع بالفرنسية
          </Link>
          <form action={logout}>
            <button type="submit" className="mt-2 rounded-lg bg-white/10 px-3 py-2 font-bold text-white">
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}
