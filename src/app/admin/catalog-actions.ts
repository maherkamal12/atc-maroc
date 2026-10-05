"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "./actions";
import {
  archiveMessage,
  archiveOrder,
  bulkDeleteProducts,
  bulkUpdateProducts,
  createCategory,
  createPost,
  createProduct,
  createService,
  deleteCategory,
  deleteMessage,
  deleteOrder,
  deletePost,
  deleteProduct,
  deleteService,
  duplicateProduct,
  updateCategory,
  updatePost,
  updateProduct,
  updateService,
  type CategoryInput,
  type PostInput,
  type ProductInput,
  type ServiceInput,
} from "@/lib/admin-data";
import {
  replaceImageEverywhere,
  saveContentBlocks,
  saveNavRows,
  saveSettings,
  type SettingKey,
} from "@/lib/cms";
import { CONTENT_KEYS, SETTING_KEYS } from "@/lib/cms";
import { deleteCustomPage, parseSections, saveCustomPage } from "@/lib/pages";

export type ActionState = { error: string | null; ok?: boolean };

async function guard() {
  if (!(await isAdmin())) redirect("/admin");
}

function bool(formData: FormData, name: string) {
  return formData.get(name) === "on" || formData.get(name) === "true" || formData.get(name) === "1";
}

function str(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function num(formData: FormData, name: string, fallback = 0) {
  const n = Number(formData.get(name));
  return Number.isFinite(n) ? n : fallback;
}

function ids(formData: FormData) {
  return formData
    .getAll("ids")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));
}

function productInput(formData: FormData): ProductInput {
  return {
    slug: str(formData, "slug"),
    categorySlug: str(formData, "categorySlug"),
    nameAr: str(formData, "nameAr"),
    nameFr: str(formData, "nameFr"),
    descAr: str(formData, "descAr"),
    descFr: str(formData, "descFr"),
    brand: str(formData, "brand") || "ATC",
    image: str(formData, "image"),
    specsAr: str(formData, "specsAr"),
    specsFr: str(formData, "specsFr"),
    featured: bool(formData, "featured"),
    inStock: bool(formData, "inStock"),
    sort: num(formData, "sort"),
  };
}

function revalidatePublic() {
  revalidatePath("/admin");
  revalidatePath("/ar");
  revalidatePath("/fr");
  revalidatePath("/ar/products");
  revalidatePath("/fr/products");
  revalidatePath("/ar/services");
  revalidatePath("/fr/services");
  revalidatePath("/ar/blog");
  revalidatePath("/fr/blog");
  revalidatePath("/ar/about");
  revalidatePath("/fr/about");
  revalidatePath("/ar/contact");
  revalidatePath("/fr/contact");
  revalidatePath("/ar/design");
  revalidatePath("/fr/design");
}

export async function saveProductAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const id = num(formData, "id");
  const input = productInput(formData);
  const result = id ? await updateProduct(id, input) : await createProduct(input);
  revalidatePublic();
  revalidatePath("/admin/products");
  if (!result.ok) return { error: result.error };
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const result = await deleteProduct(id);
  revalidatePublic();
  revalidatePath("/admin/products");
  if (!result.ok) redirect("/admin/products?db=error");
}

export async function duplicateProductAction(formData: FormData) {
  await guard();
  const result = await duplicateProduct(num(formData, "id"));
  revalidatePublic();
  revalidatePath("/admin/products");
  if (!result.ok) redirect("/admin/products?db=error");
}

export async function toggleProductFlagAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  const field = str(formData, "field");
  const value = str(formData, "value") !== "true";
  const patch = field === "featured" ? { featured: value } : { inStock: value };
  const result = await bulkUpdateProducts([id], patch);
  revalidatePublic();
  revalidatePath("/admin/products");
  if (!result.ok) redirect("/admin/products?db=error");
}

export async function bulkProductsAction(formData: FormData) {
  await guard();
  const selected = ids(formData);
  const op = str(formData, "op");
  let result;
  if (op === "delete") result = await bulkDeleteProducts(selected);
  else if (op === "feature") result = await bulkUpdateProducts(selected, { featured: true });
  else if (op === "unfeature") result = await bulkUpdateProducts(selected, { featured: false });
  else if (op === "stock") result = await bulkUpdateProducts(selected, { inStock: true });
  else if (op === "unstock") result = await bulkUpdateProducts(selected, { inStock: false });
  else if (op === "category") result = await bulkUpdateProducts(selected, { categorySlug: str(formData, "categorySlug") });
  else result = { ok: false as const, error: "Action inconnue." };
  revalidatePublic();
  revalidatePath("/admin/products");
  if (!result.ok) redirect("/admin/products?db=error");
}

export async function saveCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const input: CategoryInput = {
    slug: str(formData, "slug"),
    nameAr: str(formData, "nameAr"),
    nameFr: str(formData, "nameFr"),
    descAr: str(formData, "descAr"),
    descFr: str(formData, "descFr"),
    image: str(formData, "image"),
    icon: str(formData, "icon") || "📦",
    sort: num(formData, "sort"),
  };
  const id = num(formData, "id");
  const result = id ? await updateCategory(id, input) : await createCategory(input);
  revalidatePublic();
  revalidatePath("/admin/categories");
  if (!result.ok) return { error: result.error };
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await guard();
  const result = await deleteCategory(num(formData, "id"));
  revalidatePublic();
  revalidatePath("/admin/categories");
  if (!result.ok) redirect(`/admin/categories?error=${encodeURIComponent(result.error)}`);
}

export async function saveServiceAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const input: ServiceInput = {
    slug: str(formData, "slug"),
    titleAr: str(formData, "titleAr"),
    titleFr: str(formData, "titleFr"),
    shortAr: str(formData, "shortAr"),
    shortFr: str(formData, "shortFr"),
    bodyAr: str(formData, "bodyAr"),
    bodyFr: str(formData, "bodyFr"),
    bulletsAr: str(formData, "bulletsAr"),
    bulletsFr: str(formData, "bulletsFr"),
    image: str(formData, "image"),
    icon: str(formData, "icon") || "⚡",
    sort: num(formData, "sort"),
  };
  const id = num(formData, "id");
  const result = id ? await updateService(id, input) : await createService(input);
  revalidatePublic();
  revalidatePath("/admin/services");
  if (!result.ok) return { error: result.error };
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await guard();
  const result = await deleteService(num(formData, "id"));
  revalidatePublic();
  revalidatePath("/admin/services");
  if (!result.ok) redirect("/admin/services?db=error");
}

export async function savePostAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const input: PostInput = {
    slug: str(formData, "slug"),
    titleAr: str(formData, "titleAr"),
    titleFr: str(formData, "titleFr"),
    excerptAr: str(formData, "excerptAr"),
    excerptFr: str(formData, "excerptFr"),
    bodyAr: str(formData, "bodyAr"),
    bodyFr: str(formData, "bodyFr"),
    image: str(formData, "image"),
    tagAr: str(formData, "tagAr"),
    tagFr: str(formData, "tagFr"),
    readMinutes: num(formData, "readMinutes", 4),
    publishedAt: new Date(str(formData, "publishedAt") || Date.now()),
    published: bool(formData, "published"),
  };
  const id = num(formData, "id");
  const result = id ? await updatePost(id, input) : await createPost(input);
  revalidatePublic();
  revalidatePath("/admin/blog");
  if (!result.ok) return { error: result.error };
  redirect("/admin/blog");
}

export async function deletePostAction(formData: FormData) {
  await guard();
  const result = await deletePost(num(formData, "id"));
  revalidatePublic();
  revalidatePath("/admin/blog");
  if (!result.ok) redirect("/admin/blog?db=error");
}

export async function saveSettingsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const values: Partial<Record<SettingKey, string>> = {};
  for (const key of SETTING_KEYS) values[key] = str(formData, key);
  const ok = await saveSettings(values);
  revalidatePublic();
  revalidatePath("/admin/settings");
  if (!ok) return { error: "Impossible d'enregistrer les réglages (base indisponible)." };
  return { error: null, ok: true };
}

export async function saveNavAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const hrefs = formData.getAll("href").map(String);
  const rows = hrefs.map((_, index) => ({
    href: String(formData.getAll("href")[index] ?? ""),
    labelAr: String(formData.getAll("labelAr")[index] ?? ""),
    labelFr: String(formData.getAll("labelFr")[index] ?? ""),
    parentHref: String(formData.getAll("parentHref")[index] ?? ""),
    sort: Number(formData.getAll("sort")[index] ?? index) || index,
    visible: String(formData.getAll("visible")[index] ?? "1") !== "0",
  }));
  const logoOk = await saveSettings({
    logoUrl: str(formData, "logoUrl"),
    logoText: str(formData, "logoText"),
  });
  const ok = await saveNavRows(rows);
  revalidatePublic();
  revalidatePath("/admin/menu");
  if (!logoOk || !ok) return { error: "Impossible d'enregistrer le menu (base indisponible)." };
  return { error: null, ok: true };
}

export async function saveContentAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const keys = formData.getAll("key").map(String);
  const entries = keys.map((key, index) => {
    let valueAr = String(formData.getAll("valueAr")[index] ?? "");
    let valueFr = String(formData.getAll("valueFr")[index] ?? "");
    const meta = CONTENT_KEYS.find((item) => item.key === key);
    if (meta?.kind === "image") {
      const url = valueFr.trim() || valueAr.trim();
      valueAr = url;
      valueFr = url;
    }
    return { key, valueAr, valueFr };
  });
  const ok = await saveContentBlocks(entries);
  revalidatePublic();
  revalidatePath("/admin/content");
  if (!ok) return { error: "Impossible d'enregistrer les textes (base indisponible)." };
  return { error: null, ok: true };
}

export async function savePageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const id = num(formData, "id");
  const sections = parseSections(str(formData, "sections"));
  const result = await saveCustomPage(id || null, {
    slug: str(formData, "slug"),
    titleAr: str(formData, "titleAr"),
    titleFr: str(formData, "titleFr"),
    subtitleAr: str(formData, "subtitleAr"),
    subtitleFr: str(formData, "subtitleFr"),
    heroImage: str(formData, "heroImage"),
    sections,
    published: bool(formData, "published"),
    sort: num(formData, "sort"),
  });
  revalidatePublic();
  revalidatePath("/admin/pages");
  if (!result.ok) return { error: result.error };
  revalidatePath(`/ar/p/${result.slug}`);
  revalidatePath(`/fr/p/${result.slug}`);
  if (!id) redirect(`/admin/pages`);
  return { error: null, ok: true };
}

export async function deletePageAction(formData: FormData) {
  await guard();
  const ok = await deleteCustomPage(num(formData, "id"));
  revalidatePublic();
  revalidatePath("/admin/pages");
  if (!ok) redirect("/admin/pages?db=error");
}

export async function replaceMediaAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const from = str(formData, "from");
  const to = str(formData, "to");
  const ok = await replaceImageEverywhere(from, to);
  revalidatePublic();
  revalidatePath("/admin/media");
  if (!ok) return { error: "Remplacement impossible (base indisponible)." };
  return { error: null, ok: true };
}

export async function registerMediaUrlAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const { registerAsset } = await import("@/lib/media");
  const url = str(formData, "url").trim();
  if (!url) return { error: "URL obligatoire." };
  const row = await registerAsset({ url, filename: url.split("/").pop() ?? url, storage: "url" });
  revalidatePath("/admin/media");
  if (!row) return { error: "Impossible d'enregistrer l'URL (base indisponible)." };
  return { error: null, ok: true };
}

export async function deleteMediaAction(formData: FormData) {
  await guard();
  const { deleteAsset } = await import("@/lib/media");
  const result = await deleteAsset(num(formData, "id"), str(formData, "url"));
  revalidatePath("/admin/media");
  if (!result.ok) redirect(`/admin/media?error=${encodeURIComponent(result.error)}`);
}

export async function archiveMessageAction(formData: FormData) {
  await guard();
  const result = await archiveMessage(num(formData, "id"), str(formData, "archived") !== "true");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  if (!result.ok) redirect("/admin/messages?db=error");
}

export async function deleteMessageAction(formData: FormData) {
  await guard();
  const result = await deleteMessage(num(formData, "id"));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  if (!result.ok) redirect("/admin/messages?db=error");
}

export async function archiveOrderAction(formData: FormData) {
  await guard();
  const result = await archiveOrder(num(formData, "id"), str(formData, "archived") !== "true");
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  if (!result.ok) redirect("/admin/orders?db=error");
}

export async function deleteOrderAction(formData: FormData) {
  await guard();
  const result = await deleteOrder(num(formData, "id"));
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  redirect(result.ok ? "/admin/orders" : "/admin/orders?db=error");
}
