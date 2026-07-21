import Card from "@/components/ui/Card";
import Link from "next/link";
import { getSiteImage } from "@/lib/site-images";
import {
  EXPLORE_WELFARE_IMAGE_KEY,
  EXPLORE_VOLUNTEER_IMAGE_KEY,
  EXPLORE_FUND_IMAGE_KEY,
  EXPLORE_DONATE_IMAGE_KEY,
  EXPLORE_ORGCHART_IMAGE_KEY,
} from "@/lib/explore-content";

export default async function ExploreCards() {
  const [welfare, volunteer, fund, donate, orgChart] = await Promise.all([
    getSiteImage(EXPLORE_WELFARE_IMAGE_KEY),
    getSiteImage(EXPLORE_VOLUNTEER_IMAGE_KEY),
    getSiteImage(EXPLORE_FUND_IMAGE_KEY),
    getSiteImage(EXPLORE_DONATE_IMAGE_KEY),
    getSiteImage(EXPLORE_ORGCHART_IMAGE_KEY),
  ]);

  return (
    <section className="bg-surface px-4 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-2xl font-black text-primary-dark sm:text-3xl">
          둘러보기
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card
            href="/business/welfare"
            title="복지서비스"
            description="저소득 취약계층을 위한 다양한 복지서비스를 소개합니다."
            image={welfare?.imageUrl}
          />
          <Card
            href="/giving/volunteer"
            title="자원봉사참여"
            description="따뜻한 손길을 기다려요 — 자원봉사 참여 방법을 안내합니다."
            image={volunteer?.imageUrl}
          />
          <Card
            href="/giving/fund"
            title="기금후원"
            description="사업 기금 후원으로 지속가능한 지원을 도와주세요."
            image={fund?.imageUrl}
          />
          <Card
            href="/giving/donate"
            title="후원신청"
            description="정기·일시 후원으로 나눔에 함께 참여하실 수 있습니다."
            image={donate?.imageUrl}
          />
          <Link
            href="/giving/volunteer"
            className="flex flex-col items-center justify-center rounded-xl bg-primary p-6 text-center text-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="mb-2 text-xl font-black">따뜻한 손길을 기다려요</h3>
            <p className="text-sm text-white/90">
              사단법인 깊은순종 자원봉사참여에 알려드립니다
            </p>
          </Link>
          <Card
            href="/about/org-chart"
            title="조직도"
            description="사단법인 깊은순종의 조직 구성을 확인하실 수 있습니다."
            image={orgChart?.imageUrl}
          />
        </div>
      </div>
    </section>
  );
}
