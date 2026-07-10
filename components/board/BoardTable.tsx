import Link from "next/link";
import { formatShortDate } from "@/lib/dates";
import Pagination from "./Pagination";

type BoardPost = {
  id: number;
  title: string;
  authorName: string;
  createdAt: Date;
  viewCount: number;
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
                    <Link href={`${href}/${post.id}`} className="text-ink hover:text-primary">
                      {post.title}
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
