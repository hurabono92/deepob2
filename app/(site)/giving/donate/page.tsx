import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import SubPageBanner from "@/components/ui/SubPageBanner";
import { navGroups } from "@/lib/nav-config";
import { getSiteText } from "@/lib/site-texts";
import { getSiteImage } from "@/lib/site-images";
import { DONATE_BANNER_KEY, DONATE_INTRO_KEY, DONATE_INTRO_DEFAULT } from "@/lib/giving-content";

const givingGroup = navGroups.find((g) => g.label === "나눔안내")!;

export default async function DonatePage() {
  const [banner, intro] = await Promise.all([
    getSiteImage(DONATE_BANNER_KEY),
    getSiteText(DONATE_INTRO_KEY),
  ]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={givingGroup} activeHref="/giving/donate" />

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">후원신청</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "나눔안내", href: givingGroup.href },
                { label: "후원신청" },
              ]}
            />
          </div>

          {banner?.imageUrl && (
            <SubPageBanner src={banner.imageUrl} title="후원신청" />
          )}

          <div className="mx-auto max-w-2xl py-6 text-center">
            <p className="mb-10 text-base leading-7 text-ink/70">
              {intro?.value ?? DONATE_INTRO_DEFAULT}
            </p>
            <div className="rounded-xl bg-white p-8 shadow-card">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-surface pb-3">
                  <dt className="text-ink/50">전화</dt>
                  <dd className="font-semibold text-ink">070-4163-5243</dd>
                </div>
                <div className="flex justify-between border-b border-surface pb-3">
                  <dt className="text-ink/50">팩스</dt>
                  <dd className="font-semibold text-ink">02-888-1285</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/50">이메일</dt>
                  <dd className="font-semibold text-ink">deepob@naver.com</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
