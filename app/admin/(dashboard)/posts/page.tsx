import Link from "next/link";
import { prisma } from "@/lib/db";
import { boardMeta, BoardType } from "@/lib/posts";
import { formatShortDate } from "@/lib/dates";
import DeletePostButton from "@/components/admin/DeletePostButton";

function isBoardType(value: string | undefined): value is BoardType {
  return !!value && (Object.values(BoardType) as string[]).includes(value);
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board: boardParam } = await searchParams;
  const board = isBoardType(boardParam) ? boardParam : undefined;

  const posts = await prisma.post.findMany({
    where: board ? { board } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">게시물 관리</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
        >
          + 새 게시물
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <Link
          href="/admin/posts"
          className={`rounded-full px-3 py-1 ${
            !board ? "bg-primary text-white" : "bg-white text-ink/60"
          }`}
        >
          전체
        </Link>
        {(Object.keys(boardMeta) as BoardType[]).map((b) => (
          <Link
            key={b}
            href={`/admin/posts?board=${b}`}
            className={`rounded-full px-3 py-1 ${
              board === b ? "bg-primary text-white" : "bg-white text-ink/60"
            }`}
          >
            {boardMeta[b].label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink/50">
            등록된 게시물이 없습니다.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-surface text-left text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">게시판</th>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">작성일</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3 text-ink/60">
                    {boardMeta[post.board].label}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-ink/50">
                    {formatShortDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-primary hover:underline"
                      >
                        수정
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
