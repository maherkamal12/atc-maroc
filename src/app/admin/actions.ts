"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { markMessageRead, updateOrderStatus } from "@/lib/data";
import {
  authenticateAdmin,
  parseSessionCookie,
  sessionFromUsername,
  signSession,
  usingDefaultEnvPassword,
  type AdminSession,
} from "@/lib/admin-users";

const COOKIE = "atc_admin";

/** True while the env password is still the documented default (dev hint only). */
export async function usingDefaultAdminPassword() {
  return usingDefaultEnvPassword();
}

/* ---------------------------- brute force guard --------------------------- */

const MAX_ATTEMPTS = 8;
const ATTEMPT_WINDOW_MS = 5 * 60_000;
const attempts = new Map<string, { count: number; firstAt: number }>();

async function clientKey() {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || store.get("x-real-ip") || "local";
}

function tooManyAttempts(key: string) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAt > ATTEMPT_WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAt > ATTEMPT_WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: Date.now() });
    return;
  }
  entry.count += 1;
}

/* --------------------------------- auth ---------------------------------- */

export async function isAdmin() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const username = parseSessionCookie(store.get(COOKIE)?.value);
  if (!username) return null;
  return sessionFromUsername(username);
}

export type LoginState = { error: string | null };

/**
 * Server action bound to the login form through `useActionState`, so a wrong
 * password renders a message instead of silently redirecting back to the very
 * same empty form (which looked like "the button does nothing").
 */
export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const key = await clientKey();

  if (tooManyAttempts(key)) {
    return { error: "محاولات كثيرة. انتظروا بضع دقائق ثم أعيدوا المحاولة." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const session = await authenticateAdmin(username, password);
  if (!session) {
    recordFailure(key);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { error: "اسم المستخدم أو كلمة المرور غير صحيحة." };
  }

  attempts.delete(key);
  const store = await cookies();
  store.set(COOKIE, signSession(session.username), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}

/* ------------------------------- back office ------------------------------ */

export async function setOrderStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "new");
  const saved = Number.isFinite(id) ? await updateOrderStatus(id, status) : false;
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  if (!saved) redirect("/admin/orders?db=error");
}

export async function toggleMessage(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const isRead = String(formData.get("isRead")) === "true";
  const saved = Number.isFinite(id) ? await markMessageRead(id, !isRead) : false;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  if (!saved) redirect("/admin/messages?db=error");
}
