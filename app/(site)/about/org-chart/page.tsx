import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import { navGroups } from "@/lib/nav-config";

const aboutGroup = navGroups.find((g) => g.label === "법인소개")!;

function OrgBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 w-[160px] rounded-md bg-emerald-600 py-3 text-center text-sm font-bold text-white shadow-md">
      {children}
    </div>
  );
}

export default function OrgChartPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={aboutGroup} activeHref="/about/org-chart" />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">조직도</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "법인소개", href: aboutGroup.href },
                { label: "조직도" },
              ]}
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50 p-8 sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 bottom-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
            />

            <div className="relative rounded-xl bg-white/90 p-10 shadow-card backdrop-blur-sm">
              <div className="relative mx-auto flex w-[420px] max-w-full flex-col items-center gap-6">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black" />

                <OrgBox>총회</OrgBox>
                <OrgBox>이사장</OrgBox>

                <div className="relative flex w-full items-center justify-between">
                  <div className="absolute left-[80px] right-[80px] top-1/2 h-px -translate-y-1/2 bg-black" />
                  <OrgBox>감사</OrgBox>
                  <OrgBox>법인이사회</OrgBox>
                </div>

                <div className="relative z-10 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-emerald-600 text-center text-sm font-bold text-white shadow-md">
                  법인사무국
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
