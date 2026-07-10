import SiteImageForm from "@/components/admin/SiteImageForm";
import SiteTextForm from "@/components/admin/SiteTextForm";
import { getSiteImage } from "@/lib/site-images";
import { getSiteText } from "@/lib/site-texts";
import {
  WELFARE_BANNER_KEY,
  WELFARE_INTRO_KEY,
  WELFARE_INTRO_DEFAULT,
  WELFARE_SERVICES_KEY,
  WELFARE_SERVICES_DEFAULT,
  WELFARE_QUOTE_KEY,
  WELFARE_QUOTE_DEFAULT,
  WELFARE_QUOTE_SUB_KEY,
  WELFARE_QUOTE_SUB_DEFAULT,
  WELFARE_RULES_KEY,
  WELFARE_RULES_DEFAULT,
  WELFARE_TRAITS_KEY,
  WELFARE_TRAITS_DEFAULT,
  WELFARE_STEPS_KEY,
  WELFARE_STEPS_DEFAULT,
} from "@/lib/welfare-content";

export default async function AdminBusinessWelfarePage() {
  const [banner, intro, services, quote, quoteSub, rules, traits, steps] =
    await Promise.all([
      getSiteImage(WELFARE_BANNER_KEY),
      getSiteText(WELFARE_INTRO_KEY),
      getSiteText(WELFARE_SERVICES_KEY),
      getSiteText(WELFARE_QUOTE_KEY),
      getSiteText(WELFARE_QUOTE_SUB_KEY),
      getSiteText(WELFARE_RULES_KEY),
      getSiteText(WELFARE_TRAITS_KEY),
      getSiteText(WELFARE_STEPS_KEY),
    ]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-ink">복지서비스 페이지 관리</h1>
      <p className="mb-6 text-sm text-ink/50">
        사업안내 &gt; 복지서비스 페이지의 배너 사진과 문구를 수정할 수 있습니다.
        목록형 문구는 한 줄에 하나씩 입력하세요. 특성/참여방법은{" "}
        <code>제목|설명</code> 형식으로 한 줄에 하나씩 입력하세요.
        <br />
        운영규정 · 특성 · 참여방법 문구는 나눔안내 &gt; 자원봉사참여방법
        페이지에서도 함께 사용됩니다.
      </p>

      <div className="flex flex-col gap-4">
        <SiteImageForm
          imageKey={WELFARE_BANNER_KEY}
          label="배너 사진"
          currentImageUrl={banner?.imageUrl ?? "/business/welfare-banner.jpg"}
        />
        <SiteTextForm
          textKey={WELFARE_INTRO_KEY}
          label="복지서비스는? 소개 문구"
          currentValue={intro?.value ?? WELFARE_INTRO_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={WELFARE_SERVICES_KEY}
          label="복지서비스는? 목록 (한 줄에 하나씩)"
          currentValue={services?.value ?? WELFARE_SERVICES_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={WELFARE_QUOTE_KEY}
          label="슬로건 문구"
          currentValue={quote?.value ?? WELFARE_QUOTE_DEFAULT}
        />
        <SiteTextForm
          textKey={WELFARE_QUOTE_SUB_KEY}
          label="슬로건 부제 문구"
          currentValue={quoteSub?.value ?? WELFARE_QUOTE_SUB_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={WELFARE_RULES_KEY}
          label="자원봉사자 운영규정 (한 줄에 하나씩)"
          currentValue={rules?.value ?? WELFARE_RULES_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={WELFARE_TRAITS_KEY}
          label="자원봉사의 특성 (제목|설명, 한 줄에 하나씩)"
          currentValue={traits?.value ?? WELFARE_TRAITS_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={WELFARE_STEPS_KEY}
          label="자원봉사 참여방법 (STEP|내용, 한 줄에 하나씩)"
          currentValue={steps?.value ?? WELFARE_STEPS_DEFAULT}
          multiline
        />
      </div>
    </div>
  );
}
