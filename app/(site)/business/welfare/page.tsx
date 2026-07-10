import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import SubPageBanner from "@/components/ui/SubPageBanner";
import { navGroups } from "@/lib/nav-config";
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
  parseLines,
  parsePairs,
  parseSteps,
} from "@/lib/welfare-content";

const businessGroup = navGroups.find((g) => g.label === "사업안내")!;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-block rounded-md bg-primary px-5 py-2 text-lg font-bold text-white">
      {children}
    </div>
  );
}

export default async function WelfarePage() {
  const [banner, intro, servicesText, quote, quoteSub, rulesText, traitsText, stepsText] =
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

  const services = parseLines(servicesText?.value ?? WELFARE_SERVICES_DEFAULT);
  const volunteerRules = parseLines(rulesText?.value ?? WELFARE_RULES_DEFAULT);
  const volunteerTraits = parsePairs(traitsText?.value ?? WELFARE_TRAITS_DEFAULT);
  const volunteerSteps = parseSteps(stepsText?.value ?? WELFARE_STEPS_DEFAULT);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={businessGroup} activeHref="/business/welfare" />

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">복지서비스</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "사업안내", href: businessGroup.href },
                { label: "복지서비스" },
              ]}
            />
          </div>

          <SubPageBanner
            src={banner?.imageUrl ?? "/business/welfare-banner.jpg"}
            title="복지서비스"
          />

          <section>
            <SectionLabel>복지서비스는?</SectionLabel>
            <p className="mb-4 text-base font-bold leading-7 text-ink/80">
              {intro?.value ?? WELFARE_INTRO_DEFAULT}
            </p>
            <ol className="space-y-1 text-sm leading-7 text-ink/70">
              {services.map((service, i) => (
                <li key={service}>
                  {i + 1}. {service}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <p className="text-xl font-black text-primary sm:text-2xl">
              {quote?.value ?? WELFARE_QUOTE_DEFAULT}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              {quoteSub?.value ?? WELFARE_QUOTE_SUB_DEFAULT}
            </p>
          </section>

          <section className="mt-12">
            <SectionLabel>자원봉사자 운영규정</SectionLabel>
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
