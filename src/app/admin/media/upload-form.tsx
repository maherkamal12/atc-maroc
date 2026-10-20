"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm({ hint, enabled }: { hint: string; enabled: boolean }) {
  const router = useRouter();
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setUrls([]);
    setProgress("");
    const form = event.currentTarget;
    const input = form.elements.namedItem("file") as HTMLInputElement | null;
    const files = input?.files ? Array.from(input.files) : [];
    if (!files.length) return;

    setPending(true);
    const uploaded: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`جاري الرفع (${i + 1} / ${files.length}): ${file.name}`);
        const data = new FormData();
        data.set("file", file);
        const res = await fetch("/admin/media/upload", { method: "POST", body: data });
        const json = (await res.json()) as { url?: string; error?: string };
        if (!res.ok) {
          setError(json.error || `فشل رفع ${file.name}`);
          break;
        }
        if (json.url) uploaded.push(json.url);
      }
      if (uploaded.length) {
        setUrls(uploaded);
        form.reset();
        router.refresh();
      }
    } catch {
      setError("فشل الرفع");
    } finally {
      setPending(false);
      setProgress("");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-brand-950">رفع ملفات الصور (فردي أو جماعي)</h2>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
      <input
        type="file"
        name="file"
        accept="image/*,.webp,.svg,.pdf"
        multiple
        className="mt-3 text-sm"
        required
        disabled={!enabled}
      />
      <button className="btn btn-primary mt-3" disabled={pending || !enabled} type="submit">
        {pending ? progress || "جاري الرفع…" : "إرسال إلى المكتبة"}
      </button>
      {error ? <p className="mt-2 text-xs font-bold text-red-600">{error}</p> : null}
      {urls.length > 0 ? (
        <div className="mt-2 space-y-1 text-xs">
          <p className="font-bold text-emerald-700">تم رفع {urls.length} ملف بنجاح ✓</p>
          {urls.slice(0, 5).map((u) => (
            <p key={u} className="break-all font-mono text-[11px] text-slate-600">
              {u}
            </p>
          ))}
        </div>
      ) : null}
    </form>
  );
}
