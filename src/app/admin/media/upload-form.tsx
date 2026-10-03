"use client";

import { useState } from "react";

export function UploadForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setUrl("");
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    try {
      const res = await fetch("/admin/media/upload", { method: "POST", body: data });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) setError(json.error || "Échec de l'envoi");
      else setUrl(json.url ?? "");
    } catch {
      setError("Échec de l'envoi");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-brand-950">Téléverser (Vercel Blob)</h2>
      <p className="mt-1 text-xs text-slate-500">
        Nécessite BLOB_READ_WRITE_TOKEN. Sans token, collez simplement une URL dans les fiches.
      </p>
      <input type="file" name="file" accept="image/*" className="mt-3 text-sm" required />
      <button className="btn btn-primary mt-3" disabled={pending} type="submit">
        {pending ? "Envoi…" : "Envoyer"}
      </button>
      {error ? <p className="mt-2 text-xs font-bold text-red-600">{error}</p> : null}
      {url ? (
        <p className="mt-2 break-all text-xs">
          URL : <code>{url}</code>
        </p>
      ) : null}
    </form>
  );
}
