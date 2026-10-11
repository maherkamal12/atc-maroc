import Link from "next/link";

export function DbBanner({ failed, message }: { failed?: boolean; message?: string | null }) {
  if (!failed && !message) return null;
  return (
    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      {message ||
        "قاعدة البيانات لم تستجب: لم يُحفظ التعديل."}
    </p>
  );
}

export function OkBanner({ show }: { show?: boolean }) {
  if (!show) return null;
  return (
    <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
      تم الحفظ.
    </p>
  );
}

export function AdminHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold tracking-wide text-slate-400">الإدارة</p>
        <h1 className="text-2xl font-extrabold text-brand-950">{title}</h1>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="btn btn-primary">
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  textarea,
  hint,
  dir,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
  dir?: string;
}) {
  const cls = "field";
  return (
    <label className="block space-y-1">
      <span className="text-xs font-bold text-brand-950">{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue ?? ""} className={`${cls} min-h-28`} dir={dir} />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
          className={cls}
          dir={dir}
        />
      )}
      {hint ? <span className="block text-[11px] text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-brand-900">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
