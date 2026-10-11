import { NextResponse } from "next/server";
import { isAdmin } from "../../actions";
import { storeUpload } from "@/lib/media";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (form.get("purpose") === "logo") {
    const imageByName = /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(file.name);
    if (!file.type.startsWith("image/") && !imageByName) {
      return NextResponse.json({ error: "اختر ملف صورة للشعار (PNG أو JPG أو SVG أو WebP)." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "حجم الشعار يجب أن يكون 5 ميغابايت أو أقل." }, { status: 413 });
    }
  }
  const result = await storeUpload(file);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ url: result.url });
}
