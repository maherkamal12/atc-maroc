import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { canQueryDatabase, db, markDatabaseUnavailable } from "@/db";
import { adminUsers, type AdminUser } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export type AdminRole = "manager" | "user";

export type AdminSession = {
  id: number | null;
  username: string;
  displayName: string;
  role: AdminRole;
};

const ITERATIONS = 120_000;
const KEYLEN = 32;
const DEFAULT_ADMIN_PASSWORD = "atc2026";

export function envAdminPassword() {
  const raw = process.env.ADMIN_PASSWORD;
  if (!raw || !raw.trim()) return DEFAULT_ADMIN_PASSWORD;
  return raw;
}

export function usingDefaultEnvPassword() {
  return envAdminPassword() === DEFAULT_ADMIN_PASSWORD;
}

export function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || envAdminPassword();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, "sha256");
  return `pbkdf2:${ITERATIONS}:${salt.toString("base64")}:${hash.toString("base64")}`;
}

export function verifyPassword(password: string, stored: string) {
  const parts = stored.split(":");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;
  const salt = Buffer.from(parts[2], "base64");
  const expected = Buffer.from(parts[3], "base64");
  if (!expected.length) return false;
  const actual = pbkdf2Sync(password, salt, iterations, expected.length, "sha256");
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function signSession(username: string) {
  const hmac = createHmac("sha256", sessionSecret()).update(username).digest("base64url");
  return `${username}.${hmac}`;
}

export function parseSessionCookie(value: string | undefined): string | null {
  if (!value) return null;
  if (value === "granted") return "admin";
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const username = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = createHmac("sha256", sessionSecret()).update(username).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return username;
}

async function withUsers<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  await ensureSeeded();
  if (!canQueryDatabase()) return fallback;
  try {
    return await run();
  } catch (error) {
    markDatabaseUnavailable("adminUsers", error);
    return fallback;
  }
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  return withUsers([], async () => db.select().from(adminUsers).orderBy(adminUsers.id));
}

export async function findAdminUser(username: string): Promise<AdminUser | null> {
  const key = username.trim().toLowerCase();
  if (!key) return null;
  return withUsers(null, async () => {
    const rows = await db.select().from(adminUsers).where(eq(adminUsers.username, key)).limit(1);
    return rows[0] ?? null;
  });
}

export async function countManagers(): Promise<number> {
  const users = await listAdminUsers();
  return users.filter((u) => u.role === "manager").length;
}

export async function authenticateAdmin(
  username: string,
  password: string,
): Promise<AdminSession | null> {
  const user = username.trim().toLowerCase() || "admin";
  const row = await findAdminUser(user);
  if (row) {
    if (!verifyPassword(password, row.passwordHash)) return null;
    return {
      id: row.id,
      username: row.username,
      displayName: row.displayName || row.username,
      role: row.role === "manager" ? "manager" : "user",
    };
  }

  const users = await listAdminUsers();
  if (users.length === 0 && (user === "admin" || !username.trim())) {
    if (password !== envAdminPassword()) return null;
    const created = await createAdminUser({
      username: "admin",
      displayName: "مدير",
      role: "manager",
      password,
    });
    return {
      id: created.ok ? created.id : null,
      username: "admin",
      displayName: "مدير",
      role: "manager",
    };
  }

  if (user === "admin" && password === envAdminPassword() && users.length === 0) {
    return { id: null, username: "admin", displayName: "مدير", role: "manager" };
  }

  return null;
}

export async function sessionFromUsername(username: string): Promise<AdminSession | null> {
  const row = await findAdminUser(username);
  if (row) {
    return {
      id: row.id,
      username: row.username,
      displayName: row.displayName || row.username,
      role: row.role === "manager" ? "manager" : "user",
    };
  }
  if (username === "admin") {
    const users = await listAdminUsers();
    if (users.length === 0) {
      return { id: null, username: "admin", displayName: "مدير", role: "manager" };
    }
  }
  return null;
}

export type UserWrite =
  | { ok: true; id: number }
  | { ok: false; error: string };

export async function createAdminUser(input: {
  username: string;
  displayName: string;
  role: AdminRole;
  password: string;
}): Promise<UserWrite> {
  const username = input.username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  if (username.length < 2) return { ok: false, error: "اسم المستخدم قصير جداً." };
  if (input.password.trim().length < 4) return { ok: false, error: "كلمة المرور قصيرة جداً (٤ أحرف على الأقل)." };
  const role: AdminRole = input.role === "manager" ? "manager" : "user";
  await ensureSeeded();
  if (!canQueryDatabase()) return { ok: false, error: "قاعدة البيانات غير متاحة." };
  try {
    const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
    if (existing.length) return { ok: false, error: "اسم المستخدم موجود مسبقاً." };
    const rows = await db
      .insert(adminUsers)
      .values({
        username,
        displayName: input.displayName.trim() || username,
        role,
        passwordHash: hashPassword(input.password.trim()),
      })
      .returning({ id: adminUsers.id });
    return { ok: true, id: rows[0]?.id ?? 0 };
  } catch (error) {
    markDatabaseUnavailable("createAdminUser", error);
    return { ok: false, error: "تعذّر إنشاء المستخدم." };
  }
}

export async function updateAdminPassword(id: number, password: string): Promise<UserWrite> {
  if (password.trim().length < 4) return { ok: false, error: "كلمة المرور قصيرة جداً." };
  await ensureSeeded();
  if (!canQueryDatabase()) return { ok: false, error: "قاعدة البيانات غير متاحة." };
  try {
    await db.update(adminUsers).set({ passwordHash: hashPassword(password.trim()) }).where(eq(adminUsers.id, id));
    return { ok: true, id };
  } catch (error) {
    markDatabaseUnavailable("updateAdminPassword", error);
    return { ok: false, error: "تعذّر تحديث كلمة المرور." };
  }
}

export async function updateAdminRole(id: number, role: AdminRole): Promise<UserWrite> {
  await ensureSeeded();
  if (!canQueryDatabase()) return { ok: false, error: "قاعدة البيانات غير متاحة." };
  try {
    if (role !== "manager") {
      const users = await listAdminUsers();
      const managers = users.filter((u) => u.role === "manager" && u.id !== id);
      if (!managers.length) return { ok: false, error: "يجب الإبقاء على مدير واحد على الأقل." };
    }
    await db.update(adminUsers).set({ role }).where(eq(adminUsers.id, id));
    return { ok: true, id };
  } catch (error) {
    markDatabaseUnavailable("updateAdminRole", error);
    return { ok: false, error: "تعذّر تحديث الدور." };
  }
}

export async function deleteAdminUser(id: number, actorId: number | null): Promise<UserWrite> {
  if (actorId && actorId === id) return { ok: false, error: "لا يمكن حذف حسابكم الحالي." };
  await ensureSeeded();
  if (!canQueryDatabase()) return { ok: false, error: "قاعدة البيانات غير متاحة." };
  try {
    const users = await listAdminUsers();
    const target = users.find((u) => u.id === id);
    if (!target) return { ok: false, error: "المستخدم غير موجود." };
    if (target.role === "manager") {
      const others = users.filter((u) => u.role === "manager" && u.id !== id);
      if (!others.length) return { ok: false, error: "لا يمكن حذف آخر مدير." };
    }
    await db.delete(adminUsers).where(eq(adminUsers.id, id));
    return { ok: true, id };
  } catch (error) {
    markDatabaseUnavailable("deleteAdminUser", error);
    return { ok: false, error: "تعذّر الحذف." };
  }
}
