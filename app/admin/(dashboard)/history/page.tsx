import Link from "next/link";
import Image from "next/image";
import { getHistoryEntries } from "@/lib/history";
import DeleteHistoryEntryButton from "@/components/admin/DeleteHistoryEntryButton";

export default async function AdminHistoryPage() {
  const entries = await getHistoryEntries();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">법인연혁 페이지 관리</h1>
        <Link
          href="/admin/history/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
        >
          + 연혁 추가
        </Link>
      </div>
      <p className="mb-6 text-sm text-ink/50">
        법인소개 &gt; 법인연혁 페이지에 표시되는 연도별 내용과 사진을 관리합니다.
        내용은 줄바꿈으로 구분되어 목록으로 표시됩니다.
      </p>

      <div className="flex flex-col gap-4">
        {entries.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">
            등록된 연혁이 없습니다.
          </p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex gap-4 rounded-xl bg-white p-5 shadow-card"
            >
              {entry.imageUrl && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface">
                  <Image
                    src={entry.imageUrl}
                    alt={entry.year}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-bold text-ink">{entry.year}</span>
                  <span className="text-xs text-ink/40">순서 {entry.order}</span>
                </div>
                <p className="whitespace-pre-line text-sm text-ink/60">
                  {entry.content}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Link
                  href={`/admin/history/${entry.id}/edit`}
                  className="text-sm text-primary hover:underline"
                >
                  수정
                </Link>
                <DeleteHistoryEntryButton id={entry.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
