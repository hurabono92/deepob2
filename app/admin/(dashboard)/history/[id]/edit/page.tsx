import { notFound } from "next/navigation";
import HistoryEntryForm from "@/components/admin/HistoryEntryForm";
import { getHistoryEntryById } from "@/lib/history";

export default async function EditHistoryEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await getHistoryEntryById(Number(id));
  if (!entry) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-ink">연혁 수정</h1>
      <HistoryEntryForm
        initial={{
          id: entry.id,
          year: entry.year,
          content: entry.content,
          imageUrl: entry.imageUrl,
          order: entry.order,
        }}
      />
    </div>
  );
}
