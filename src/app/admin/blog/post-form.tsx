import { ActionForm } from "../_form";
import { Check, Field } from "../_ui";
import { savePostAction } from "../catalog-actions";
import type { Post } from "@/db/schema";

export function PostForm({ post }: { post?: Post }) {
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);
  return (
    <ActionForm action={savePostAction}>
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="العنوان بالفرنسية" name="titleFr" defaultValue={post?.titleFr} required />
        <Field label="العنوان بالعربية" name="titleAr" defaultValue={post?.titleAr} required dir="rtl" />
        <Field label="المعرّف" name="slug" defaultValue={post?.slug} />
        <Field label="Image (URL)" name="image" defaultValue={post?.image} />
        <Field label="Tag FR" name="tagFr" defaultValue={post?.tagFr} />
        <Field label="Tag AR" name="tagAr" defaultValue={post?.tagAr} dir="rtl" />
        <Field label="Minutes de lecture" name="readMinutes" type="number" defaultValue={post?.readMinutes ?? 4} />
        <Field label="Date de publication" name="publishedAt" type="datetime-local" defaultValue={date} />
        <Field label="Extrait FR" name="excerptFr" defaultValue={post?.excerptFr} textarea />
        <Field label="Extrait AR" name="excerptAr" defaultValue={post?.excerptAr} textarea dir="rtl" />
        <Field label="Corps FR" name="bodyFr" defaultValue={post?.bodyFr} textarea />
        <Field label="Corps AR" name="bodyAr" defaultValue={post?.bodyAr} textarea dir="rtl" />
      </div>
      <Check name="published" label="منشور" defaultChecked={post?.published ?? true} />
    </ActionForm>
  );
}
