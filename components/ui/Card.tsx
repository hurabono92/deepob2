import Link from "next/link";

export default function Card({
  href,
  title,
  description,
  icon,
  wide = false,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  wide?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      {icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
      {description && (
        <p className="text-sm leading-6 text-ink/70">{description}</p>
      )}
    </Link>
  );
}
