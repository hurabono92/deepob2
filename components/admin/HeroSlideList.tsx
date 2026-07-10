"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Slide = { id: number; imageUrl: string };

export default function HeroSlideList({ slides }: { slides: Slide[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<number | null>(null);

  async function move(id: number, direction: "up" | "down") {
    setPendingId(id);
    await fetch(`/api/hero-slides/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    setPendingId(null);
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm("이 사진을 삭제하시겠습니까?")) return;
    setPendingId(id);
    await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
    setPendingId(null);
    router.refresh();
  }

  if (slides.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">
        등록된 사진이 없습니다. 위에서 사진을 추가해 주세요.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slides.map((slide, i) => (
        <li key={slide.id} className="overflow-hidden rounded-xl bg-white shadow-card">
          <div className="relative aspect-video bg-surface">
            <Image
              src={slide.imageUrl}
              alt={`슬라이드 ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-ink/50">{i + 1}번째</span>
            <div className="flex gap-2 text-sm">
              <button
                type="button"
                disabled={i === 0 || pendingId === slide.id}
                onClick={() => move(slide.id, "up")}
                className="text-ink/60 hover:text-primary disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={i === slides.length - 1 || pendingId === slide.id}
                onClick={() => move(slide.id, "down")}
                className="text-ink/60 hover:text-primary disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                disabled={pendingId === slide.id}
                onClick={() => remove(slide.id)}
                className="text-red-600 hover:underline disabled:opacity-30"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
