import { notFound } from "next/navigation";
import { getCustomPageById, parseSections } from "@/lib/pages";
import { AdminHeader } from "../../_ui";
import { PageEditor } from "../page-editor";

export const dynamic = "force-dynamic";

export default async function EditCustomPage({ params }: { params: Promise<{ id: string }> }) {
  const page = await getCustomPageById(Number((await params).id));
  if (!page) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title={`صفحة · ${page.titleFr}`} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <PageEditor
          id={page.id}
          slug={page.slug}
          titleAr={page.titleAr}
          titleFr={page.titleFr}
          subtitleAr={page.subtitleAr}
          subtitleFr={page.subtitleFr}
          heroImage={page.heroImage}
          sections={parseSections(page.sections)}
          published={page.published}
          sort={page.sort}
        />
      </div>
    </div>
  );
}
