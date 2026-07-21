import Image from "next/image";
import Link from "next/link";

export default function Card({
  href,
  title,
  description,
  icon,
  image,
  wide = false,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  wide?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      {image && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {icon && !image && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
            {icon}
          </div>
        )}
        <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
        {description && (
          <p className="text-sm leading-6 text-ink/70">{description}</p>
        )}
      </div>
    </Link>
  );
}
