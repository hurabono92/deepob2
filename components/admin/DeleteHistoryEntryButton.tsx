"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteHistoryEntryButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("이 연혁 항목을 삭제하시겠습니까?")) return;
    setLoading(true);
    await fetch(`/api/history-entries/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      삭제
    </button>
  );
}
