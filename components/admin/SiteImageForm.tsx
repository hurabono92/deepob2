"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SiteImageForm({
  imageKey,
  label,
  currentImageUrl,
}: {
  imageKey: string;
  label: string;
  currentImageUrl: string | null;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setError(null);

    try {
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
      const { url } = await uploadRes.json();

      const putRes = await fetch(`/api/site-images/${imageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      });
      if (!putRes.ok) {
        const data = await putRes.json().catch(() => ({}));
        throw new Error(data.error || "사진 교체에 실패했습니다.");
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

  return (
    <div className="rounded-xl bg-white p-5 shadow-card">
      <p className="mb-3 text-sm font-bold text-ink">{label}</p>

      {currentImageUrl && (
        <div className="relative mb-4 aspect-video w-full max-w-sm overflow-hidden rounded-md bg-surface">
          <Image src={currentImageUrl} alt={label} fill className="object-cover" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          className="text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !file}
          className="rounded-md bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "업로드 중..." : "사진 교체"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
