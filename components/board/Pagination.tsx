import Link from "next/link";

export default function Pagination({
  href,
  page,
  totalPages,
  extraParams,
}: {
  href: string;
  page: number;
  totalPages: number;
  extraParams?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function buildHref(p: number) {
    const params = new URLSearchParams();
    if (extraParams) {
      for (const [key, value] of Object.entries(extraParams)) {
        if (value) params.set(key, value);
      }
    }
    if (p !== 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${href}?${qs}` : href;
  }

  return (
    <nav className="mt-10 flex justify-center gap-2 text-sm">
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            p === page
              ? "bg-primary text-white font-bold"
              : "text-ink/60 hover:bg-surface"
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
