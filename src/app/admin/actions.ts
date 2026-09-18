"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { markMessageRead, updateOrderStatus } from "@/lib/data";

const COOKIE = "atc_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "atc2026";
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(COOKIE)?.value === "granted";
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== adminPassword()) {
    redirect("/admin?error=1");
  }
  const store = await cookies();
  store.set(COOKIE, "granted", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}

export async function setOrderStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "new");
  if (Number.isFinite(id)) {
    await updateOrderStatus(id, status);
  }
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function toggleMessage(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const isRead = String(formData.get("isRead")) === "true";
  if (Number.isFinite(id)) {
    await markMessageRead(id, !isRead);
  }
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
