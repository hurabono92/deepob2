import Image from "next/image";
import Link from "next/link";
import { formatShortDate } from "@/lib/dates";
import { isImageFile } from "@/lib/files";

type PostImage = { id: number; imageUrl: string; originalName?: string | null };

export default function BoardDetail({
  listHref,
  listLabel,
  postId,
  title,
  authorName,
  createdAt,
  viewCount,
  thumbnailUrl,
  content,
  contentColor,
  images = [],
  photosInline = true,
}: {
  listHref: string;
  listLabel: string;
  postId: number;
  title: string;
  authorName: string;
  createdAt: Date;
  viewCount: number;
  thumbnailUrl: string | null;
  content: string;
  contentColor?: string | null;
  images?: PostImage[];
  photosInline?: boolean;
}) {
  const attachments: PostImage[] =
    images.length > 0 ? images : thumbnailUrl ? [{ id: 0, imageUrl: thumbnailUrl }] : [];
  const photoAttachments = photosInline ? attachments.filter((a) => isImageFile(a.imageUrl)) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="border-b border-surface pb-6">
        <h1 className="text-xl font-bold text-ink sm:text-2xl">{title}</h1>
        <p className="mt-3 text-xs text-ink/50">
          {authorName} &nbsp;·&nbsp; 등록일 : {formatShortDate(createdAt)}
          &nbsp;·&nbsp; 조회수 : {viewCount}
        </p>
      </div>

      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2 text-xs">
          <a
            href={`/api/posts/${postId}/download`}
            className="rounded-md border border-surface px-3 py-1.5 text-ink/70 hover:bg-surface"
          >
            첨부파일 일괄 다운로드
          </a>
          <details className="group relative">
            <summary className="list-none rounded-md border border-surface px-3 py-1.5 text-ink/50 hover:bg-surface [&::-webkit-details-marker]:hidden">
              첨부파일 {attachments.length}개
              <span className="ml-1 inline-block transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <ul className="absolute right-0 z-10 mt-2 w-72 space-y-1.5 rounded-md border border-surface bg-white p-3 text-left shadow-card">
              {attachments.map((file, i) => (
                <li key={file.id}>
                  <a
                    href={file.imageUrl}
                    download
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.5 8.5 9.34 16.66a3 3 0 1 1-4.24-4.24l7.78-7.78a2 2 0 1 1 2.83 2.83L8 15.17a1 1 0 1 1-1.41-1.41l6.36-6.36"
                      />
                    </svg>
                    {file.originalName ?? file.imageUrl.split("/").pop() ?? `첨부파일 ${i + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}

      {photoAttachments.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {photoAttachments.map((image) => (
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
      )}

      <div
        className="mt-8 whitespace-pre-wrap text-sm leading-7 text-ink/80"
        style={contentColor ? { color: contentColor } : undefined}
      >
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
