import { NextResponse } from "next/server";
import { isAdmin } from "../../actions";
import { listAllProductsForExport } from "@/lib/admin-data";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }
  const rows = await listAllProductsForExport();
  const header = [
    "slug",
    "category_slug",
    "name_ar",
    "name_fr",
    "desc_ar",
    "desc_fr",
    "brand",
    "image",
    "specs_ar",
    "specs_fr",
    "featured",
    "in_stock",
    "sort",
  ];
  const csv = [
    header.join(","),
    ...rows.map((p) =>
      [
        p.slug,
        p.categorySlug,
        p.nameAr,
        p.nameFr,
        p.descAr,
        p.descFr,
        p.brand,
        p.image,
        p.specsAr,
        p.specsFr,
        p.featured,
        p.inStock,
        p.sort,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=atc-products.csv",
    },
  });
}
