import Image from "next/image";

export default function HighlightBanner({
  eyebrow,
  title,
  subtitle,
  imageUrl,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageUrl?: string | null;
}) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-xl px-6 py-14 text-center">
      {imageUrl ? (
        <>
          <Image src={imageUrl} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/50 via-rose-800/30 to-rose-900/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200" />
      )}

      <div
        className={`relative mx-auto max-w-md rounded-xl border px-8 py-8 ${
          imageUrl ? "border-white/60" : "border-rose-300/50"
        }`}
      >
        <p
          className={`text-xs font-bold tracking-[0.3em] ${
            imageUrl ? "text-white" : "text-rose-500"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 text-3xl font-black ${imageUrl ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        <p
          className={`mt-3 whitespace-pre-line text-sm leading-6 ${
            imageUrl ? "text-white/90" : "text-ink/60"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
