import Image from "next/image";

export default function SubPageBanner({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="relative mb-10 h-[180px] w-full overflow-hidden rounded-xl sm:h-[220px]">
      <Image src={src} alt={title} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <p className="absolute bottom-5 right-6 text-2xl font-black text-white sm:text-3xl">
        {title}
      </p>
    </div>
  );
}
