import { AdminHeader } from "../../_ui";
import { CategoryForm } from "../category-form";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="تصنيف جديد" />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <CategoryForm />
      </div>
    </div>
  );
}
