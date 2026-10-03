import { NextResponse } from "next/server";
import { isAdmin } from "../../actions";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN n'est pas configuré. Utilisez une URL d'image." },
      { status: 400 },
    );
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  try {
    const { put } = await import("@vercel/blob");
    const blob = await put(`atc/${Date.now()}-${file.name}`, file, {
      access: "public",
      token,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Échec Blob" },
      { status: 500 },
    );
  }
}
