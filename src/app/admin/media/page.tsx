import { AdminHeader } from "../_ui";
import { ActionForm } from "../_form";
import { Field } from "../_ui";
import { registerMediaUrlAction, replaceMediaAction } from "../catalog-actions";
import { listLibrary, mediaUploadHint, mediaUploadsEnabled } from "@/lib/media";
import { MediaLibrary } from "./library-client";

export const dynamic = "force-dynamic";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const items = await listLibrary();
  const uploads = items.filter((item) => item.storage === "blob" || item.storage === "local").length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Médiathèque"
        subtitle={`${items.length} fichier(s) · ${uploads} en stockage. Recherche, aperçu, copie d'URL, nettoyage des inutilisés.`}
      />

      <MediaLibrary
        items={items}
        error={sp.error}
        uploadHint={mediaUploadHint()}
        uploadsEnabled={mediaUploadsEnabled()}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-extrabold">Enregistrer une URL existante</h2>
          <ActionForm action={registerMediaUrlAction} submitLabel="Ajouter à la bibliothèque">
            <Field label="URL" name="url" hint="Image déjà hébergée ailleurs" />
          </ActionForm>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-extrabold">Remplacer une image partout</h2>
          <ActionForm action={replaceMediaAction} submitLabel="Remplacer partout">
            <div className="grid gap-3">
              <Field label="URL actuelle" name="from" />
              <Field label="Nouvelle URL" name="to" />
            </div>
          </ActionForm>
        </div>
      </div>
    </div>
  );
}
