import Link from "next/link";
import { prisma } from "@/lib/db";
import { boardMeta, BoardType } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const counts = await Promise.all(
    (Object.keys(boardMeta) as BoardType[]).map(async (board) => ({
      board,
      count: await prisma.post.count({ where: { board } }),
    }))
  );

  return (
    <div>
      <h1 className="mb-8 text-xl font-bold text-ink">대시보드</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {counts.map(({ board, count }) => (
          <Link
            key={board}
            href={`/admin/posts?board=${board}`}
            className="rounded-xl bg-white p-6 shadow-card hover:-translate-y-0.5"
          >
            <p className="text-sm text-ink/50">{boardMeta[board].label}</p>
            <p className="mt-2 text-3xl font-black text-primary">{count}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/posts/new"
          className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90"
        >
          + 새 게시물 작성
        </Link>
        <Link
          href="/admin/hero-slides"
          className="inline-block rounded-md bg-white px-5 py-2 text-sm font-bold text-ink shadow-card hover:-translate-y-0.5"
        >
          사진 관리
        </Link>
      </div>
    </div>
  );
}
