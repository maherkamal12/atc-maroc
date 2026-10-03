"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm({ hint, enabled }: { hint: string; enabled: boolean }) {
  const router = useRouter();
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
      if (!res.ok) setError(json.error || "فشل الرفع");
      else {
        setUrl(json.url ?? "");
        form.reset();
        router.refresh();
      }
    } catch {
      setError("فشل الرفع");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-brand-950">رفع ملف</h2>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
      <input type="file" name="file" accept="image/*,.webp,.svg,.pdf" className="mt-3 text-sm" required disabled={!enabled} />
      <button className="btn btn-primary mt-3" disabled={pending || !enabled} type="submit">
        {pending ? "جاري الرفع…" : "إرسال إلى المكتبة"}
      </button>
      {error ? <p className="mt-2 text-xs font-bold text-red-600">{error}</p> : null}
      {url ? (
        <p className="mt-2 break-all text-xs">
          أُضيف: <code>{url}</code>
        </p>
      ) : null}
    </form>
  );
}
