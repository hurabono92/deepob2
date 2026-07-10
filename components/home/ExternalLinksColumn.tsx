import Image from "next/image";

const links = [
  {
    href: "https://www.acrc.go.kr",
    src: "/logos/acrc.svg",
    alt: "국민권익위원회",
    label: "국민권익위원회",
    sub: "Anti-Corruption & Civil Rights Commission",
  },
  {
    href: "https://www.nts.go.kr",
    src: "/logos/nts.svg",
    alt: "국세청",
    label: "국세청",
    sub: "National Tax Service",
  },
];

export default function ExternalLinksColumn() {
  return (
    <div className="flex flex-col gap-3 self-start">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-40 items-center gap-2 rounded-xl bg-white px-2.5 py-3 shadow-card transition hover:shadow-lg"
        >
          <Image src={link.src} alt={link.alt} width={28} height={28} className="h-7 w-7 shrink-0" />
          <span className="flex min-w-0 flex-col text-left">
            <span className="truncate text-xs font-bold text-ink">{link.label}</span>
            <span className="truncate text-[10px] text-ink/50">{link.sub}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
