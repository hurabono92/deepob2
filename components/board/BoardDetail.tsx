import Image from "next/image";
import Link from "next/link";
import { formatShortDate } from "@/lib/dates";

type PostImage = { id: number; imageUrl: string };

export default function BoardDetail({
  listHref,
  listLabel,
  title,
  authorName,
  createdAt,
  thumbnailUrl,
  content,
  images = [],
}: {
  listHref: string;
  listLabel: string;
  title: string;
  authorName: string;
  createdAt: Date;
  thumbnailUrl: string | null;
  content: string;
  images?: PostImage[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="border-b border-surface pb-6">
        <h1 className="text-xl font-bold text-ink sm:text-2xl">{title}</h1>
        <p className="mt-3 text-xs text-ink/50">
          {authorName} &nbsp;·&nbsp; {formatShortDate(createdAt)}
        </p>
      </div>

      {images.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface"
            >
              <Image
                src={image.imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        thumbnailUrl && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-surface">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )
      )}

      <div className="mt-8 whitespace-pre-wrap text-sm leading-7 text-ink/80">
        {content}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={listHref}
          className="inline-block rounded-full bg-surface px-6 py-2 text-sm font-semibold text-ink hover:bg-primary hover:text-white"
        >
          {listLabel} 목록으로
        </Link>
      </div>
    </div>
  );
}
