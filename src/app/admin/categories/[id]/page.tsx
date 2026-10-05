import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/admin-data";
import { AdminHeader } from "../../_ui";
import { CategoryForm } from "../category-form";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const category = await getCategoryById(Number((await params).id));
  if (!category) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={`تصنيف · ${category.nameFr}`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
