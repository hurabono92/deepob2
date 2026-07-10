"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_INTERVAL_MS = 4500;

type Slide = { id: number; imageUrl: string };

export default function Hero({
  slides,
  title,
  subtitle,
}: {
  slides: Slide[];
  title: string;
  subtitle: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  function goToPrev() {
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setActive((i) => (i + 1) % slides.length);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary px-4 py-24 text-center text-white sm:py-32">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.imageUrl}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="이전 사진"
            onClick={goToPrev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-2xl text-white transition hover:bg-black/45 sm:left-6"
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="다음 사진"
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-2xl text-white transition hover:bg-black/45 sm:right-6"
          >
            &#8250;
          </button>
        </>
      )}

      <div className="relative z-10">
        <h1
          className="mx-auto whitespace-nowrap font-black leading-snug"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            fontSize: "clamp(20px, 5vw, 48px)",
          }}
        >
          {title}
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/95 sm:text-lg"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}
        >
          {subtitle}
        </p>

        {slides.length > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`${i + 1}번째 사진`}
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === active ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
