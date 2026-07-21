import SiteImageForm from "@/components/admin/SiteImageForm";
import SiteTextForm from "@/components/admin/SiteTextForm";
import { getSiteImage } from "@/lib/site-images";
import { getSiteText } from "@/lib/site-texts";
import {
  VOLUNTEER_BANNER_KEY,
  VOLUNTEER_EYEBROW_KEY,
  VOLUNTEER_EYEBROW_DEFAULT,
  VOLUNTEER_TITLE_KEY,
  VOLUNTEER_TITLE_DEFAULT,
  VOLUNTEER_SUBTITLE_KEY,
  VOLUNTEER_SUBTITLE_DEFAULT,
  DONATE_BANNER_KEY,
  DONATE_INTRO_KEY,
  DONATE_INTRO_DEFAULT,
  FUND_BANNER_KEY,
  FUND_INTRO_KEY,
  FUND_INTRO_DEFAULT,
  VOLUNTEER_TRAITS_IMAGE_KEY,
  VOLUNTEER_STEP1_IMAGE_KEY,
  VOLUNTEER_STEP2_IMAGE_KEY,
  VOLUNTEER_STEP3_IMAGE_KEY,
} from "@/lib/giving-content";

export default async function AdminGivingPagesPage() {
  const [
    volunteerBanner,
    volunteerEyebrow,
    volunteerTitle,
    volunteerSubtitle,
    donateBanner,
    donateIntro,
    fundBanner,
    fundIntro,
    traitsImage,
    step1Image,
    step2Image,
    step3Image,
  ] = await Promise.all([
    getSiteImage(VOLUNTEER_BANNER_KEY),
    getSiteText(VOLUNTEER_EYEBROW_KEY),
    getSiteText(VOLUNTEER_TITLE_KEY),
    getSiteText(VOLUNTEER_SUBTITLE_KEY),
    getSiteImage(DONATE_BANNER_KEY),
    getSiteText(DONATE_INTRO_KEY),
    getSiteImage(FUND_BANNER_KEY),
    getSiteText(FUND_INTRO_KEY),
    getSiteImage(VOLUNTEER_TRAITS_IMAGE_KEY),
    getSiteImage(VOLUNTEER_STEP1_IMAGE_KEY),
    getSiteImage(VOLUNTEER_STEP2_IMAGE_KEY),
    getSiteImage(VOLUNTEER_STEP3_IMAGE_KEY),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-ink">나눔안내 페이지 관리</h1>
      <p className="mb-6 text-sm text-ink/50">
        나눔안내 하위 페이지(자원봉사참여방법 / 후원신청 / 기금후원)의 배너
        사진과 문구를 수정할 수 있습니다. 자원봉사자 운영규정 · 특성 ·
        참여방법 문구는{" "}
        <a href="/admin/business-welfare" className="text-primary underline">
          복지서비스 페이지 관리
        </a>
        에서 함께 수정합니다.
      </p>

      <h2 className="mb-3 text-sm font-bold text-ink/70">자원봉사참여방법</h2>
      <div className="mb-10 flex flex-col gap-4">
        <SiteImageForm
          imageKey={VOLUNTEER_BANNER_KEY}
          label="배너 사진 (선택 — 없으면 색상 배경으로 표시)"
          currentImageUrl={volunteerBanner?.imageUrl ?? null}
        />
        <SiteTextForm
          textKey={VOLUNTEER_EYEBROW_KEY}
          label="상단 영문 라벨 (예: VOLUNTEER)"
          currentValue={volunteerEyebrow?.value ?? VOLUNTEER_EYEBROW_DEFAULT}
        />
        <SiteTextForm
          textKey={VOLUNTEER_TITLE_KEY}
          label="배너 제목"
          currentValue={volunteerTitle?.value ?? VOLUNTEER_TITLE_DEFAULT}
        />
        <SiteTextForm
          textKey={VOLUNTEER_SUBTITLE_KEY}
          label="배너 부제 문구"
          currentValue={volunteerSubtitle?.value ?? VOLUNTEER_SUBTITLE_DEFAULT}
          multiline
        />
        <SiteImageForm
          imageKey={VOLUNTEER_TRAITS_IMAGE_KEY}
          label="자원봉사의 특성 옆 일러스트 (선택)"
          currentImageUrl={traitsImage?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={VOLUNTEER_STEP1_IMAGE_KEY}
          label="자원봉사 참여방법 STEP 01 사진 (선택)"
          currentImageUrl={step1Image?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={VOLUNTEER_STEP2_IMAGE_KEY}
          label="자원봉사 참여방법 STEP 02 사진 (선택)"
          currentImageUrl={step2Image?.imageUrl ?? null}
        />
        <SiteImageForm
          imageKey={VOLUNTEER_STEP3_IMAGE_KEY}
          label="자원봉사 참여방법 STEP 03 사진 (선택)"
          currentImageUrl={step3Image?.imageUrl ?? null}
        />
      </div>

      <h2 className="mb-3 text-sm font-bold text-ink/70">후원신청</h2>
      <div className="mb-10 flex flex-col gap-4">
        <SiteImageForm
          imageKey={DONATE_BANNER_KEY}
          label="배너 사진 (선택 — 없으면 배너 없이 표시)"
          currentImageUrl={donateBanner?.imageUrl ?? null}
        />
        <SiteTextForm
          textKey={DONATE_INTRO_KEY}
          label="소개 문구"
          currentValue={donateIntro?.value ?? DONATE_INTRO_DEFAULT}
          multiline
        />
      </div>

      <h2 className="mb-3 text-sm font-bold text-ink/70">기금후원</h2>
      <div className="flex flex-col gap-4">
        <SiteImageForm
          imageKey={FUND_BANNER_KEY}
          label="배너 사진 (선택 — 없으면 배너 없이 표시)"
          currentImageUrl={fundBanner?.imageUrl ?? null}
        />
        <SiteTextForm
          textKey={FUND_INTRO_KEY}
          label="소개 문구"
          currentValue={fundIntro?.value ?? FUND_INTRO_DEFAULT}
          multiline
        />
      </div>
    </div>
  );
}
