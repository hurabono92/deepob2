import HeroSlideUploadForm from "@/components/admin/HeroSlideUploadForm";
import HeroSlideList from "@/components/admin/HeroSlideList";
import SiteImageForm from "@/components/admin/SiteImageForm";
import SiteTextForm from "@/components/admin/SiteTextForm";
import { getHeroSlides } from "@/lib/hero-slides";
import { getSiteImage, ORG_CHART_BANNER_KEY } from "@/lib/site-images";
import {
  getSiteText,
  HERO_TITLE_KEY,
  HERO_TITLE_DEFAULT,
  HERO_SUBTITLE_KEY,
  HERO_SUBTITLE_DEFAULT,
} from "@/lib/site-texts";
import {
  EXPLORE_WELFARE_IMAGE_KEY,
  EXPLORE_VOLUNTEER_IMAGE_KEY,
  EXPLORE_FUND_IMAGE_KEY,
  EXPLORE_DONATE_IMAGE_KEY,
  EXPLORE_ORGCHART_IMAGE_KEY,
} from "@/lib/explore-content";

export default async function AdminHeroSlidesPage() {
  const [
    slides,
    orgChartImage,
    heroTitle,
    heroSubtitle,
    exploreWelfare,
    exploreVolunteer,
    exploreFund,
    exploreDonate,
    exploreOrgChart,
  ] = await Promise.all([
    getHeroSlides(),
    getSiteImage(ORG_CHART_BANNER_KEY),
    getSiteText(HERO_TITLE_KEY),
    getSiteText(HERO_SUBTITLE_KEY),
    getSiteImage(EXPLORE_WELFARE_IMAGE_KEY),
    getSiteImage(EXPLORE_VOLUNTEER_IMAGE_KEY),
    getSiteImage(EXPLORE_FUND_IMAGE_KEY),
    getSiteImage(EXPLORE_DONATE_IMAGE_KEY),
    getSiteImage(EXPLORE_ORGCHART_IMAGE_KEY),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-ink">사진 · 문구 관리</h1>
      <p className="mb-6 text-sm text-ink/50">
        메인 화면 상단에서 자동으로 넘어가는 사진과 문구, 조직도 소개 배너
        사진을 관리할 수 있습니다.
      </p>

      <h2 className="mb-3 text-sm font-bold text-ink/70">메인 화면 슬라이드</h2>
      <HeroSlideUploadForm />
      <HeroSlideList slides={slides} />

      <h2 className="mt-10 mb-3 text-sm font-bold text-ink/70">메인 화면 문구</h2>
      <div className="flex flex-col gap-4">
        <SiteTextForm
          textKey={HERO_TITLE_KEY}
          label="메인 제목"
          currentValue={heroTitle?.value ?? HERO_TITLE_DEFAULT}
        />
        <SiteTextForm
          textKey={HERO_SUBTITLE_KEY}
          label="메인 부제목"
          currentValue={heroSubtitle?.value ?? HERO_SUBTITLE_DEFAULT}
          multiline
        />
      </div>

      <h2 className="mt-10 mb-3 text-sm font-bold text-ink/70">
        조직도 소개 배너 사진
      </h2>
      <SiteImageForm
        imageKey={ORG_CHART_BANNER_KEY}
        label="조직도 소개 배너 사진"
        currentImageUrl={orgChartImage?.imageUrl ?? null}
      />

      <h2 className="mt-10 mb-3 text-sm font-bold text-ink/70">
        메인 화면 둘러보기 카드 사진
      </h2>
      <div className="flex flex-col gap-4">
        <SiteImageForm
          imageKey={EXPLORE_WELFARE_IMAGE_KEY}
          label="복지서비스 카드 사진"
          currentImageUrl={exploreWelfare?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={EXPLORE_VOLUNTEER_IMAGE_KEY}
          label="자원봉사참여 카드 사진"
          currentImageUrl={exploreVolunteer?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={EXPLORE_FUND_IMAGE_KEY}
          label="기금후원 카드 사진"
          currentImageUrl={exploreFund?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={EXPLORE_DONATE_IMAGE_KEY}
          label="후원신청 카드 사진"
          currentImageUrl={exploreDonate?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={EXPLORE_ORGCHART_IMAGE_KEY}
          label="조직도 카드 사진"
          currentImageUrl={exploreOrgChart?.imageUrl ?? null}
        />
      </div>
    </div>
  );
}
