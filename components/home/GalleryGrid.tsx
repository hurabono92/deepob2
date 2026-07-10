import Image from "next/image";
import Link from "next/link";
import { formatShortDate } from "@/lib/dates";

type AlbumPost = {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  createdAt: Date;
};

export default function GalleryGrid({ posts }: { posts: AlbumPost[] }) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            사단법인 깊은순종 앨범보기
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/60">
            사단법인 깊은순종 행사앨범과 일상모습 그리고 여러가지 다양한
            우리의 행복한 모습들을 보실 수 있습니다
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-sm text-ink/50">
            등록된 사진이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/album/${post.id}`}
                className="group relative aspect-square overflow-hidden rounded-md bg-surface"
              >
                {post.thumbnailUrl && (
                  <Image
                    src={post.thumbnailUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="truncate text-xs font-medium text-white">
                    {post.title}
                  </p>
                  <p className="text-[10px] text-white/70">
                    {formatShortDate(post.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/news/album"
            className="inline-block rounded-full bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-primary/90"
          >
            앨범 전체보기
          </Link>
        </div>
      </div>
    </section>
  );
}
