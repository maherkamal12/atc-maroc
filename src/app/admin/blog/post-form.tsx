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
        <Field label="رابط الصورة" name="image" defaultValue={post?.image} />
        <Field label="الوسم بالفرنسية" name="tagFr" defaultValue={post?.tagFr} />
        <Field label="الوسم بالعربية" name="tagAr" defaultValue={post?.tagAr} dir="rtl" />
        <Field label="دقائق القراءة" name="readMinutes" type="number" defaultValue={post?.readMinutes ?? 4} />
        <Field label="تاريخ النشر" name="publishedAt" type="datetime-local" defaultValue={date} />
        <Field label="المقتطف بالفرنسية" name="excerptFr" defaultValue={post?.excerptFr} textarea />
        <Field label="المقتطف بالعربية" name="excerptAr" defaultValue={post?.excerptAr} textarea dir="rtl" />
        <Field label="المحتوى بالفرنسية" name="bodyFr" defaultValue={post?.bodyFr} textarea />
        <Field label="المحتوى بالعربية" name="bodyAr" defaultValue={post?.bodyAr} textarea dir="rtl" />
      </div>
      <Check name="published" label="منشور" defaultChecked={post?.published ?? true} />
    </ActionForm>
  );
}
