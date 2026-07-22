"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { boardMeta, BoardType } from "@/lib/board-meta";

type InitialPost = {
  id: number;
  board: BoardType;
  title: string;
  content: string;
  contentColor: string | null;
  thumbnailUrl: string | null;
};

const DEFAULT_CONTENT_COLOR = "#3a3f4b";

export default function PostForm({
  initial,
  initialBoard,
  returnTo = "/admin/posts",
}: {
  initial?: InitialPost;
  initialBoard?: BoardType;
  returnTo?: string;
}) {
  const router = useRouter();
  const isEdit = !!initial;

  const [board, setBoard] = useState<BoardType>(
    initial?.board ?? initialBoard ?? BoardType.NOTICE
  );
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [contentColor, setContentColor] = useState(
    initial?.contentColor ?? DEFAULT_CONTENT_COLOR
  );
  const [thumbnailUrl] = useState<string | null>(
    initial?.thumbnailUrl ?? null
  );
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let finalThumbnailUrl = thumbnailUrl;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const data = await uploadRes.json().catch(() => ({}));
          throw new Error(data.error || "이미지 업로드에 실패했습니다.");
        }
        const uploadData = await uploadRes.json();
        finalThumbnailUrl = uploadData.url;
      }

      const payload = {
        board,
        title,
        content,
        contentColor:
          contentColor === DEFAULT_CONTENT_COLOR ? null : contentColor,
        thumbnailUrl: finalThumbnailUrl,
      };

      const res = await fetch(
        isEdit ? `/api/posts/${initial!.id}` : "/api/posts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "저장에 실패했습니다.");
      }

      router.push(returnTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-xl bg-white p-8 shadow-card"
    >
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">게시판</span>
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value as BoardType)}
          className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        >
          {(Object.keys(boardMeta) as BoardType[]).map((b) => (
            <option key={b} value={b}>
              {boardMeta[b].label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">제목</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">내용</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          style={{ color: contentColor }}
          className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">내용 글자색</span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={contentColor}
            onChange={(e) => setContentColor(e.target.value)}
            className="h-9 w-14 cursor-pointer rounded-md border border-surface"
          />
          <span className="text-ink/50">{contentColor}</span>
          {contentColor !== DEFAULT_CONTENT_COLOR && (
            <button
              type="button"
              onClick={() => setContentColor(DEFAULT_CONTENT_COLOR)}
              className="rounded-md border border-surface px-2 py-1 text-xs text-ink/60 hover:bg-surface"
            >
              기본값으로
            </button>
          )}
        </div>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">썸네일 이미지</span>
        {thumbnailUrl && !file && (
          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-md bg-surface">
            <Image
              src={thumbnailUrl}
              alt="현재 썸네일"
              fill
              className="object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
      >
        {submitting ? "저장 중..." : isEdit ? "수정하기" : "등록하기"}
      </button>
    </form>
  );
}
