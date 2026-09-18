import type { ReactNode } from "react";
import Link from "next/link";
import { isAdmin, login, logout } from "./actions";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/messages", label: "Messages", icon: "✉️" },
  { href: "/admin/orders", label: "Commandes", icon: "🧾" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdmin();

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-950 px-4">
        <form
          action={login}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
        >
          <div className="mb-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-950 text-sm font-black text-white">
              ATC
            </span>
            <h1 className="mt-4 text-lg font-extrabold text-brand-950">Espace administrateur</h1>
            <p className="mt-1 text-xs text-slate-500">ATLAS TECH CONCEPT — back office</p>
          </div>
          <label className="mb-1.5 block text-sm font-bold text-brand-950" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="field"
            placeholder="••••••••"
            required
          />
          <button type="submit" className="btn btn-primary mt-5 w-full">
            Se connecter
          </button>
          <p className="mt-4 text-center text-[11px] text-slate-400">
            Mot de passe par défaut : atc2026 (variable ADMIN_PASSWORD)
          </p>
        </form>
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
        <nav className="mt-8 space-y-1">
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
