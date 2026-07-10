import Image from "next/image";
import Link from "next/link";

export default function OrgChartBanner({
  imageUrl,
}: {
  imageUrl: string | null;
}) {
  return (
    <section className="bg-primary-dark">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-4 py-16 sm:flex-row">
        <div className="relative aspect-[4/3] w-full max-w-md shrink-0 overflow-hidden rounded-xl bg-white/10 sm:w-1/2">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="사단법인 깊은순종 조직도"
              fill
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-cover"
            />
          )}
        </div>

        <div className="text-center text-white sm:w-1/2 sm:text-left">
          <h2 className="text-2xl font-black sm:text-3xl">
            사단법인 깊은순종 조직도
          </h2>
          <p className="mt-5 text-base leading-7 text-white/85">
            사단법인 깊은순종은 아동/청소년, 장애인, 노인 어르신, 다문화
            가정, 저소득 계층 등 사회의 모든 구성원이 행복해지도록 노력하고
            있습니다.
          </p>
          <Link
            href="/about/org-chart"
            className="mt-6 inline-block rounded-full bg-white px-6 py-2 text-sm font-bold text-primary-dark hover:bg-white/90"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
