import Link from "next/link";
import { formatShortDate } from "@/lib/dates";

type PreviewPost = {
  id: number;
  title: string;
  createdAt: Date;
};

export default function BoardPreviewColumn({
  title,
  href,
  posts,
}: {
  title: string;
  href: string;
  posts: PreviewPost[];
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between border-b border-surface pb-3">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <Link href={href} className="text-xs font-semibold text-primary hover:underline">
          더보기
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="py-4 text-sm text-ink/50">등록된 게시물이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`${href}/${post.id}`}
                className="flex items-baseline justify-between gap-3 text-sm text-ink hover:text-primary"
              >
                <span className="truncate">{post.title}</span>
                <span className="shrink-0 text-xs text-ink/40">
                  {formatShortDate(post.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
