"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isImageFile } from "@/lib/files";

type PostImage = { id: number; imageUrl: string; originalName?: string | null };

export default function PostImageGallery({
  postId,
  images,
}: {
  postId: number;
  images: PostImage[];
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("kind", "attachment");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => ({}));
        throw new Error(data.error || "파일 업로드에 실패했습니다.");
      }
      const { url, originalName } = await uploadRes.json();

      const createRes = await fetch(`/api/posts/${postId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url, originalName }),
      });
      if (!createRes.ok) {
        const data = await createRes.json().catch(() => ({}));
        throw new Error(data.error || "첨부파일 추가에 실패했습니다.");
      }

      setFile(null);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  async function move(imageId: number, direction: "up" | "down") {
    setPendingId(imageId);
    await fetch(`/api/posts/${postId}/images/${imageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    setPendingId(null);
    router.refresh();
  }

  async function remove(imageId: number) {
    if (!confirm("이 첨부파일을 삭제하시겠습니까?")) return;
    setPendingId(imageId);
    await fetch(`/api/posts/${postId}/images/${imageId}`, { method: "DELETE" });
    setPendingId(null);
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-bold text-ink">첨부파일 (여러 개 — 사진/PDF/한글/오피스 문서)</p>

      <form
        onSubmit={handleUpload}
        className="mb-5 flex flex-wrap items-center gap-3 rounded-xl bg-white p-5 shadow-card"
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.svg,.pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          className="text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !file}
          className="rounded-md bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "업로드 중..." : "+ 첨부파일 추가"}
        </button>
        {error && <p className="w-full text-sm text-red-600">{error}</p>}
      </form>

      {images.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">
          등록된 첨부파일이 없습니다. 위에서 파일을 추가해 주세요.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, i) => (
            <li key={image.id} className="overflow-hidden rounded-xl bg-white shadow-card">
              <div className="relative flex aspect-square items-center justify-center bg-surface">
                {isImageFile(image.imageUrl) ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.originalName ?? `첨부 사진 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 px-3 text-center">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-10 w-10 fill-none stroke-current stroke-1.5 text-ink/40"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
                    </svg>
                    <span className="line-clamp-2 break-all text-xs text-ink/60">
                      {image.originalName ?? image.imageUrl.split("/").pop()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-ink/50">{i + 1}번째</span>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    disabled={i === 0 || pendingId === image.id}
                    onClick={() => move(image.id, "up")}
                    className="text-ink/60 hover:text-primary disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === images.length - 1 || pendingId === image.id}
                    onClick={() => move(image.id, "down")}
                    className="text-ink/60 hover:text-primary disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    disabled={pendingId === image.id}
                    onClick={() => remove(image.id)}
                    className="text-red-600 hover:underline disabled:opacity-30"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
