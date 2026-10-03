"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { deleteMediaAction } from "../catalog-actions";
import type { LibraryItem } from "@/lib/media";
import { UploadForm } from "./upload-form";

function formatSize(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function MediaLibrary({
  items,
  error,
}: {
  items: LibraryItem[];
  error?: string;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "unused" | "used" | "uploads">("all");
  const [preview, setPreview] = useState<LibraryItem | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((item) => {
      if (filter === "unused" && item.usedBy.length) return false;
      if (filter === "used" && !item.usedBy.length) return false;
      if (filter === "uploads" && item.storage === "linked") return false;
      if (!term) return true;
      return [item.url, item.filename, item.pathname, ...item.usedBy.map((u) => u.label)]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [items, q, filter]);

  async function copyUrl(url: string) {
    const absolute = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(url);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  const unusedCount = items.filter((item) => !item.usedBy.length).length;

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <UploadForm />

      <div className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <label className="block min-w-[14rem] flex-1 text-xs font-bold">
          Recherche
          <input
            className="field mt-1"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nom, URL, fiche…"
          />
        </label>
        <label className="block text-xs font-bold">
          Filtre
          <select className="field mt-1" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">Tous ({items.length})</option>
            <option value="uploads">Fichiers stockés</option>
            <option value="used">Utilisés</option>
            <option value="unused">Inutilisés ({unusedCount})</option>
          </select>
        </label>
      </div>

      <p className="text-xs text-slate-500">
        {filtered.length} fichier(s). Copiez l&apos;URL pour coller dans un produit, une page ou un bloc.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.url} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <button type="button" className="block w-full" onClick={() => setPreview(item)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.filename} className="h-40 w-full bg-slate-100 object-cover" />
            </button>
            <div className="space-y-2 p-3">
              <p className="truncate text-sm font-bold text-brand-950" title={item.filename}>
                {item.filename || "sans nom"}
              </p>
              <p className="truncate font-mono text-[10px] text-slate-400" title={item.url}>
                {item.url}
              </p>
              <p className="text-[11px] text-slate-500">
                {item.storage} · {formatSize(item.size)}
                {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString("fr-FR")}` : ""}
              </p>
              {item.usedBy.length ? (
                <ul className="space-y-0.5 text-[11px]">
                  {item.usedBy.slice(0, 4).map((use) => (
                    <li key={use.href + use.label}>
                      <Link href={use.href} className="font-semibold text-brand-800">
                        {use.kind} · {use.label}
                      </Link>
                    </li>
                  ))}
                  {item.usedBy.length > 4 ? (
                    <li className="text-slate-400">+{item.usedBy.length - 4} autre(s)</li>
                  ) : null}
                </ul>
              ) : (
                <p className="text-[11px] font-bold text-amber-700">Inutilisé — peut être nettoyé</p>
              )}
              <div className="flex flex-wrap gap-1 pt-1">
                <button
                  type="button"
                  className="rounded-lg bg-brand-950 px-2 py-1 text-[11px] font-bold text-white"
                  onClick={() => copyUrl(item.url)}
                >
                  {copied === item.url ? "Copié ✓" : "Copier l'URL"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-bold"
                  onClick={() => setPreview(item)}
                >
                  Aperçu
                </button>
                {!item.usedBy.length ? (
                  <form action={deleteMediaAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="url" value={item.url} />
                    <button className="rounded-lg bg-red-50 px-2 py-1 text-[11px] font-bold text-red-700">
                      Supprimer
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-brand-950/80 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.url} alt={preview.filename} className="max-h-[70vh] w-full object-contain" />
            <p className="mt-3 break-all font-mono text-xs text-slate-500">{preview.url}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="btn btn-primary !py-2 !text-xs" onClick={() => copyUrl(preview.url)}>
                {copied === preview.url ? "Copié ✓" : "Copier l'URL"}
              </button>
              <button type="button" className="btn btn-outline !py-2 !text-xs" onClick={() => setPreview(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
