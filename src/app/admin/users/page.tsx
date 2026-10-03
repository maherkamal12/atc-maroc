import { redirect } from "next/navigation";
import { getAdminSession } from "../actions";
import { AdminHeader, DbBanner } from "../_ui";
import { listAdminUsers } from "@/lib/admin-users";
import { createUserAction, deleteUserAction, setPasswordAction, setRoleAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();
  if (!session || session.role !== "manager") redirect("/admin");

  const sp = await searchParams;
  const users = await listAdminUsers();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="المدير والمستخدمون"
        subtitle="إضافة حسابات لوحة الإدارة، تغيير كلمات المرور، والحذف. المدير يدير المستخدمين؛ المستخدم يدخل اللوحة دون هذا القسم."
      />
      <DbBanner failed={Boolean(sp.error)} message={sp.error} />

      <form action={createUserAction} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-extrabold text-brand-950">إضافة مستخدم</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="block text-xs font-bold">
            اسم المستخدم
            <input name="username" className="field mt-1" required placeholder="karim" autoComplete="off" />
          </label>
          <label className="block text-xs font-bold">
            الاسم الظاهر
            <input name="displayName" className="field mt-1" placeholder="كريم" />
          </label>
          <label className="block text-xs font-bold">
            الدور
            <select name="role" className="field mt-1" defaultValue="user">
              <option value="user">مستخدم</option>
              <option value="manager">مدير</option>
            </select>
          </label>
          <label className="block text-xs font-bold">
            كلمة المرور
            <input name="password" type="password" className="field mt-1" required minLength={4} autoComplete="new-password" />
          </label>
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          إنشاء الحساب
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">المستخدم</th>
              <th className="px-4 py-3 text-start">الدور</th>
              <th className="px-4 py-3 text-start">كلمة مرور جديدة</th>
              <th className="px-4 py-3 text-start">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <span className="block font-extrabold text-brand-950">{user.displayName || user.username}</span>
                    <span className="font-mono text-xs text-slate-500">{user.username}</span>
                  </td>
                  <td className="px-4 py-3">
                    <form action={setRoleAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={user.id} />
                      <select name="role" defaultValue={user.role} className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                        <option value="manager">مدير</option>
                        <option value="user">مستخدم</option>
                      </select>
                      <button className="rounded-lg bg-brand-950 px-2 py-1.5 text-xs font-bold text-white">حفظ</button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form action={setPasswordAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={user.id} />
                      <input
                        name="password"
                        type="password"
                        className="field !py-1.5 text-xs"
                        placeholder="••••••••"
                        minLength={4}
                        required
                        autoComplete="new-password"
                      />
                      <button className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-bold">تعيين</button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={deleteUserAction}
                    >
                      <input type="hidden" name="id" value={user.id} />
                      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">حذف</button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  لا حسابات بعد. أول دخول بـ admin ينشئ المدير تلقائياً، أو أضيفوا حساباً أعلاه.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
