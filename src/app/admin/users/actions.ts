"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "../actions";
import {
  createAdminUser,
  deleteAdminUser,
  updateAdminPassword,
  updateAdminRole,
  type AdminRole,
} from "@/lib/admin-users";

async function requireManager() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");
  if (session.role !== "manager") redirect("/admin");
  return session;
}

function bounce(error?: string) {
  redirect(error ? `/admin/users?error=${encodeURIComponent(error)}` : "/admin/users");
}

export async function createUserAction(formData: FormData) {
  await requireManager();
  const result = await createAdminUser({
    username: String(formData.get("username") ?? ""),
    displayName: String(formData.get("displayName") ?? ""),
    role: String(formData.get("role") ?? "user") === "manager" ? "manager" : "user",
    password: String(formData.get("password") ?? ""),
  });
  revalidatePath("/admin/users");
  bounce(result.ok ? undefined : result.error);
}

export async function setPasswordAction(formData: FormData) {
  await requireManager();
  const id = Number(formData.get("id"));
  const result = await updateAdminPassword(id, String(formData.get("password") ?? ""));
  revalidatePath("/admin/users");
  bounce(result.ok ? undefined : result.error);
}

export async function setRoleAction(formData: FormData) {
  await requireManager();
  const id = Number(formData.get("id"));
  const role = (String(formData.get("role") ?? "user") === "manager" ? "manager" : "user") as AdminRole;
  const result = await updateAdminRole(id, role);
  revalidatePath("/admin/users");
  bounce(result.ok ? undefined : result.error);
}

export async function deleteUserAction(formData: FormData) {
  const session = await requireManager();
  const id = Number(formData.get("id"));
  const result = await deleteAdminUser(id, session.id);
  revalidatePath("/admin/users");
  bounce(result.ok ? undefined : result.error);
}
