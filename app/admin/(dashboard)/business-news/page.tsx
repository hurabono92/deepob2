import Link from "next/link";
import { prisma } from "@/lib/db";
import { BoardType } from "@/lib/posts";
import { formatShortDate } from "@/lib/dates";
import DeletePostButton from "@/components/admin/DeletePostButton";

export default async function AdminBusinessNewsPage() {
  const posts = await prisma.post.findMany({
    where: { board: BoardType.BUSINESS_NEWS },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">사업소식 페이지 관리</h1>
        <Link
          href={`/admin/posts/new?board=${BoardType.BUSINESS_NEWS}&from=/admin/business-news`}
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
        >
          + 새 게시물
        </Link>
      </div>
      <p className="mb-6 text-sm text-ink/50">
        사업안내 &gt; 사업소식 페이지에 표시되는 게시물을 관리합니다.
      </p>

      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink/50">
            등록된 게시물이 없습니다.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-surface text-left text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">작성일</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="max-w-md truncate px-4 py-3 text-ink">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-ink/50">
                    {formatShortDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/posts/${post.id}/edit?from=/admin/business-news`}
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
