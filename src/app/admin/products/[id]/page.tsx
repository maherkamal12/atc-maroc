import { notFound } from "next/navigation";
import { getProductById } from "@/lib/admin-data";
import { getCategories } from "@/lib/data";
import { AdminHeader } from "../../_ui";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(Number(id)), getCategories()]);
  if (!product) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={`تعديل · ${product.nameFr}`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
