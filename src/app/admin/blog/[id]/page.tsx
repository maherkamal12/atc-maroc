import { notFound } from "next/navigation";
import { getPostById } from "@/lib/admin-data";
import { AdminHeader } from "../../_ui";
import { PostForm } from "../post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPostById(Number((await params).id));
  if (!post) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={`مقال · ${post.titleFr}`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <PostForm post={post} />
      </div>
    </div>
  );
}
