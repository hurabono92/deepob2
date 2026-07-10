import Image from "next/image";
import Link from "next/link";
import { formatShortDate } from "@/lib/dates";
import Pagination from "./Pagination";

type BoardPost = {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  createdAt: Date;
};

export default function BoardList({
  title,
  href,
  posts,
  page,
  totalPages,
  variant = "list",
}: {
  title: string;
  href: string;
  posts: BoardPost[];
  page: number;
  totalPages: number;
  variant?: "list" | "grid";
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-10 text-center text-2xl font-black text-ink sm:text-3xl">
        {title}
      </h1>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink/50">
          등록된 게시물이 없습니다.
        </p>
      ) : variant === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`${href}/${post.id}`}
              className="group overflow-hidden rounded-xl bg-white shadow-card"
            >
              <div className="relative aspect-square bg-surface">
                {post.thumbnailUrl && (
                  <Image
                    src={post.thumbnailUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-ink">
                  {post.title}
                </p>
                <p className="text-xs text-ink/40">
                  {formatShortDate(post.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-surface rounded-xl bg-white shadow-card">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`${href}/${post.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-surface"
              >
                <span className="truncate text-sm text-ink">
                  {post.title}
                </span>
                <span className="shrink-0 text-xs text-ink/40">
                  {formatShortDate(post.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination href={href} page={page} totalPages={totalPages} />
    </div>
  );
}
