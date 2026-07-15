"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type InitialEntry = {
  id: number;
  year: string;
  content: string;
  imageUrl: string | null;
  order: number;
};

export default function HistoryEntryForm({
  initial,
}: {
  initial?: InitialEntry;
}) {
  const router = useRouter();
  const isEdit = !!initial;

  const [year, setYear] = useState(initial?.year ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initial?.imageUrl ?? null
  );
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let finalImageUrl = imageUrl;

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
        finalImageUrl = uploadData.url;
      }

      const payload = { year, content, imageUrl: finalImageUrl, order };

      const res = await fetch(
        isEdit ? `/api/history-entries/${initial!.id}` : "/api/history-entries",
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

      router.push("/admin/history");
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
        <span className="mb-1 block text-ink/60">연도 (예: 2025년)</span>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">
          내용 (한 줄에 하나씩 입력하면 목록으로 표시됩니다)
        </span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="w-full rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">정렬 순서 (숫자가 작을수록 위에 표시)</span>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="w-32 rounded-md border border-surface px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/60">사진 (선택)</span>
        {imageUrl && !file && (
          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-md bg-surface">
            <Image src={imageUrl} alt="현재 사진" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        {imageUrl && !file && (
          <button
            type="button"
            onClick={() => setImageUrl(null)}
            className="mt-2 block text-xs text-red-600 hover:underline"
          >
            사진 제거
          </button>
        )}
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
