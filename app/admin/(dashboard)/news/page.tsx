import Link from "next/link";
import { prisma } from "@/lib/db";
import { boardMeta, BoardType } from "@/lib/posts";
import { formatShortDate } from "@/lib/dates";
import DeletePostButton from "@/components/admin/DeletePostButton";

const NEWS_BOARDS = [
  BoardType.ACTIVITY_NEWS,
  BoardType.NOTICE,
  BoardType.ALBUM,
] as const;

function isNewsBoard(value: string | undefined): value is BoardType {
  return !!value && (NEWS_BOARDS as readonly string[]).includes(value);
}

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board: boardParam } = await searchParams;
  const board = isNewsBoard(boardParam) ? boardParam : undefined;

  const posts = await prisma.post.findMany({
    where: board ? { board } : { board: { in: [...NEWS_BOARDS] } },
    orderBy: { createdAt: "desc" },
  });

  const newPostHref = `/admin/posts/new?board=${board ?? BoardType.ACTIVITY_NEWS}&from=/admin/news`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">법인소식 페이지 관리</h1>
        <Link
          href={newPostHref}
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
        >
          + 새 게시물
        </Link>
      </div>
      <p className="mb-6 text-sm text-ink/50">
        법인소식 하위 페이지(활동소식 / 공지사항 / 앨범게시판)의 게시물을
        모아서 관리할 수 있습니다.
      </p>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <Link
          href="/admin/news"
          className={`rounded-full px-3 py-1 ${
            !board ? "bg-primary text-white" : "bg-white text-ink/60"
          }`}
        >
          전체
        </Link>
        {NEWS_BOARDS.map((b) => (
          <Link
            key={b}
            href={`/admin/news?board=${b}`}
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
                        href={`/admin/posts/${post.id}/edit?from=/admin/news`}
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
