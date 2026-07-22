import Link from "next/link";
import { formatShortDate } from "@/lib/dates";
import { isImageFile } from "@/lib/files";
import Pagination from "./Pagination";

type BoardPost = {
  id: number;
  title: string;
  authorName: string;
  createdAt: Date;
  viewCount: number;
  thumbnailUrl?: string | null;
};

export default function BoardTable({
  href,
  posts,
  page,
  totalPages,
  total,
  q,
}: {
  href: string;
  posts: BoardPost[];
  page: number;
  totalPages: number;
  total: number;
  q?: string;
}) {
  const limit = 10;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-ink/50">전체 {total}건</p>
        <form action={href} method="get" className="flex items-center gap-2">
          <select
            disabled
            className="rounded-md border border-surface bg-white px-3 py-2 text-xs text-ink/70"
          >
            <option>제목</option>
          </select>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="검색어를 입력하세요"
            className="rounded-md border border-surface px-3 py-2 text-xs text-ink"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90"
          >
            검색
          </button>
        </form>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl bg-white py-16 text-center text-sm text-ink/50 shadow-card">
          등록된 게시물이 없습니다.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-surface text-xs text-ink/50">
                <th className="w-16 px-3 py-3 font-medium">번호</th>
                <th className="px-3 py-3 text-left font-medium">제목</th>
                <th className="w-28 px-3 py-3 font-medium">작성자</th>
                <th className="w-28 px-3 py-3 font-medium">등록일</th>
                <th className="w-20 px-3 py-3 font-medium">조회수</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={post.id} className="border-b border-surface last:border-b-0 hover:bg-surface">
                  <td className="px-3 py-3 text-center text-ink/50">
                    {total - ((page - 1) * limit + i)}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`${href}/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-ink hover:text-primary"
                    >
                      {post.title}
                      {post.thumbnailUrl && (
                        <svg
                          aria-label="첨부파일"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 fill-none stroke-ink/50 stroke-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.5 8.5 9.34 16.66a3 3 0 1 1-4.24-4.24l7.78-7.78a2 2 0 1 1 2.83 2.83L8 15.17a1 1 0 1 1-1.41-1.41l6.36-6.36"
                          />
                        </svg>
                      )}
                      {post.thumbnailUrl && isImageFile(post.thumbnailUrl) && (
                        <svg
                          aria-label="사진 파일"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 fill-primary/70"
                        >
                          <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                      )}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center text-ink/60">{post.authorName}</td>
                  <td className="px-3 py-3 text-center text-ink/60">
                    {formatShortDate(post.createdAt)}
                  </td>
                  <td className="px-3 py-3 text-center text-ink/60">{post.viewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination href={href} page={page} totalPages={totalPages} extraParams={{ q }} />
    </div>
  );
}
