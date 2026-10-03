import { getCategories } from "@/lib/data";
import { AdminHeader } from "../../_ui";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-6">
      <AdminHeader title="منتج جديد" subtitle="Aucun prix — catalogue devis uniquement." />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
