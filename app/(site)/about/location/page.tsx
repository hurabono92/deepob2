import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import { navGroups } from "@/lib/nav-config";

const aboutGroup = navGroups.find((g) => g.label === "법인소개")!;

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={aboutGroup} activeHref="/about/location" />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">오시는길</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "법인소개", href: aboutGroup.href },
                { label: "오시는길" },
              ]}
            />
          </div>

          <div className="rounded-xl bg-white p-8 shadow-card">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-surface pb-3">
                <dt className="text-ink/50">주소</dt>
                <dd className="text-right font-semibold text-ink">
                  (08792) 서울특별시 관악구 낙성대로3길 15 (봉천동)
                  <br />
                  사단법인 깊은순종
                </dd>
              </div>
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
  );
}
