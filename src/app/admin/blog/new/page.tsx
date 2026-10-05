import { AdminHeader } from "../../_ui";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="مقال جديد" />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <PostForm />
      </div>
    </div>
  );
}
