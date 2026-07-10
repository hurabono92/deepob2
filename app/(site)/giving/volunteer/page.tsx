import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import HighlightBanner from "@/components/ui/HighlightBanner";
import { navGroups } from "@/lib/nav-config";
import { getSiteText } from "@/lib/site-texts";
import { getSiteImage } from "@/lib/site-images";
import {
  WELFARE_RULES_KEY,
  WELFARE_RULES_DEFAULT,
  WELFARE_TRAITS_KEY,
  WELFARE_TRAITS_DEFAULT,
  WELFARE_STEPS_KEY,
  WELFARE_STEPS_DEFAULT,
  parseLines,
  parsePairs,
  parseSteps,
} from "@/lib/welfare-content";
import {
  VOLUNTEER_BANNER_KEY,
  VOLUNTEER_EYEBROW_KEY,
  VOLUNTEER_EYEBROW_DEFAULT,
  VOLUNTEER_TITLE_KEY,
  VOLUNTEER_TITLE_DEFAULT,
  VOLUNTEER_SUBTITLE_KEY,
  VOLUNTEER_SUBTITLE_DEFAULT,
} from "@/lib/giving-content";

const givingGroup = navGroups.find((g) => g.label === "나눔안내")!;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-block rounded-md bg-primary px-5 py-2 text-lg font-bold text-white">
      {children}
    </div>
  );
}

export default async function VolunteerPage() {
  const [rulesText, traitsText, stepsText, banner, eyebrow, title, subtitle] =
    await Promise.all([
      getSiteText(WELFARE_RULES_KEY),
      getSiteText(WELFARE_TRAITS_KEY),
      getSiteText(WELFARE_STEPS_KEY),
      getSiteImage(VOLUNTEER_BANNER_KEY),
      getSiteText(VOLUNTEER_EYEBROW_KEY),
      getSiteText(VOLUNTEER_TITLE_KEY),
      getSiteText(VOLUNTEER_SUBTITLE_KEY),
    ]);

  const volunteerRules = parseLines(rulesText?.value ?? WELFARE_RULES_DEFAULT);
  const volunteerTraits = parsePairs(traitsText?.value ?? WELFARE_TRAITS_DEFAULT);
  const volunteerSteps = parseSteps(stepsText?.value ?? WELFARE_STEPS_DEFAULT);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={givingGroup} activeHref="/giving/volunteer" />

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">자원봉사참여방법</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "나눔안내", href: givingGroup.href },
                { label: "자원봉사참여방법" },
              ]}
            />
          </div>

          <HighlightBanner
            eyebrow={eyebrow?.value ?? VOLUNTEER_EYEBROW_DEFAULT}
            title={title?.value ?? VOLUNTEER_TITLE_DEFAULT}
            subtitle={subtitle?.value ?? VOLUNTEER_SUBTITLE_DEFAULT}
            imageUrl={banner?.imageUrl}
          />

          <section>
            <SectionLabel>자원봉사참여</SectionLabel>
            <h3 className="mb-3 font-bold text-ink">자원봉사자 운영규정</h3>
            <ol className="space-y-1 text-sm leading-7 text-ink/70">
              {volunteerRules.map((rule, i) => (
                <li key={rule}>
                  {String(i + 1).padStart(2, "0")} {rule}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <SectionLabel>자원봉사의 특성</SectionLabel>
            <div className="space-y-5">
              {volunteerTraits.map((trait) => (
                <div key={trait.title}>
                  <h3 className="font-bold text-ink">{trait.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink/70">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 mt-12">
            <SectionLabel>자원봉사 참여방법</SectionLabel>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {volunteerSteps.map((s) => (
                <div key={s.step} className="rounded-xl bg-white p-4 shadow-card">
                  <p className="text-xs font-bold text-primary">{s.step}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
