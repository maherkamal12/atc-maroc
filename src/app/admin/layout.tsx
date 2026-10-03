import type { ReactNode } from "react";
import Link from "next/link";
import { isAdmin, logout, usingDefaultAdminPassword } from "./actions";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/products", label: "Produits", icon: "📦" },
  { href: "/admin/categories", label: "Catégories", icon: "🗂️" },
  { href: "/admin/services", label: "Services", icon: "🛠️" },
  { href: "/admin/blog", label: "Blog", icon: "✍️" },
  { href: "/admin/media", label: "Images", icon: "🖼️" },
  { href: "/admin/content", label: "Textes des pages", icon: "📝" },
  { href: "/admin/menu", label: "Menu & logo", icon: "🧭" },
  { href: "/admin/settings", label: "Réglages du site", icon: "⚙️" },
  { href: "/admin/messages", label: "Messages", icon: "✉️" },
  { href: "/admin/orders", label: "Commandes", icon: "🧾" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdmin();
  const usingDefault = await usingDefaultAdminPassword();

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-950 px-4">
        <LoginForm
          showDefaultHint={process.env.NODE_ENV !== "production" && usingDefault}
          productionWarning={process.env.NODE_ENV === "production" && usingDefault}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-brand-950 p-6 text-white lg:min-h-screen">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xs font-black">
            ATC
          </span>
          <span className="text-sm font-extrabold">ATC Admin</span>
        </Link>
        <nav className="mt-8 grid grid-cols-2 gap-1 lg:grid-cols-1">
          {links.map((link) => (
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
          <Link href="/ar" className="block hover:text-accent-400">
            ← Site arabe
          </Link>
          <Link href="/fr" className="block hover:text-accent-400">
            ← Site français
          </Link>
          <form action={logout}>
            <button type="submit" className="mt-2 rounded-lg bg-white/10 px-3 py-2 font-bold text-white">
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}
