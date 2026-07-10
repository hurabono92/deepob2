"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SiteTextForm({
  textKey,
  label,
  currentValue,
  multiline,
}: {
  textKey: string;
  label: string;
  currentValue: string;
  multiline?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(currentValue);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/site-texts/${textKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "문구 저장에 실패했습니다.");
      }
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            rows={3}
            className="rounded-md border border-surface p-3 text-sm text-ink"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="rounded-md border border-surface p-3 text-sm text-ink"
          />
        )}
        <button
          type="submit"
          disabled={submitting || !value.trim()}
          className="self-start rounded-md bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "저장 중..." : "문구 저장"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
