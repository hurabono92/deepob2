import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import { navGroups } from "@/lib/nav-config";

const aboutGroup = navGroups.find((g) => g.label === "법인소개")!;

const history = [
  {
    year: "2020년",
    events: ["설립추진단 결성 (1월)", "설립추진단 모임 및 목적사업에 대한 회의 (12월)"],
  },
  {
    year: "2021년",
    events: [
      "설립배경과 구체화된 목적사업에 대한 협의 (1월)",
      "설립동역자 모집 및 준비 모임 진행 (2~4월)",
      "창립총회 진행 (2021. 10. 31)",
    ],
  },
  {
    year: "2022년",
    events: [
      "사단법인 깊은순종 설립허가 (2022. 3. 3)",
      "사단법인 깊은순종 법인등기 (2022. 3. 31)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬) (2022. 4~)",
      "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2022. 4~)",
      "저소득 취약계층 의료비 지원 (2022. 4~)",
      "저소득 취약계층 의료비 지원(아동 심리 치료) (2022. 5~)",
      "지역의 사회복지시설을 통한 저소득 취약계층 자립 지원(컴퓨터 코딩교육) (2022. 7~) - 상록보육원",
      "사단법인 깊은순종 지정기부금단체 지정 (2022. 9. 30)",
      "지역의 사회복지시설을 통한 저소득 취약계층 자립 지원(컴퓨터 코딩교육) (2022. 12~) - 쪽방촌 소망을 찾는 이 지역아동센터",
    ],
  },
  {
    year: "2023년",
    events: [
      "저소득 취약계층 의료비 지원(다문화가족 긴급 의료비 추가) (2023. 1~)",
      "저소득 취약계층 의료비 지원(아동 심리 치료) (2023. 1~)",
      "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2023. 1~)",
      "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2023. 1~)",
      "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2023. 1~)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬, 다문화가족 긴급 생활비 추가) (2023. 1~)",
      "사단법인 깊은순종 2023-1차 이사회 (2023. 1. 29)",
      "사단법인 깊은순종 2023년 정기총회 (2023. 2. 26)",
      "저소득 취약계층 의료비 지원(아동 심리 치료 4명 추가) (2023. 6~)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬 17명 추가) (2023. 6~)",
      "관악구 남현동 상록보육원 컴퓨터 코딩교육 (2023. 7, 8)",
    ],
  },
  {
    year: "2024년",
    events: [
      "저소득 취약계층 의료비 지원 (2024. 1~)",
      "저소득 취약계층 아동 심리 치료 지원 (2024. 1~)",
      "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2024. 1~)",
      "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2024. 1~)",
      "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2024. 1~)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬, 다문화가족 긴급 생활비) (2024. 1~)",
      "사단법인 깊은순종 2024-1차 이사회 (2024. 1. 28)",
      "사단법인 깊은순종 2024년 정기총회 (2024. 2. 25)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬 2명 추가) (2024. 8~)",
      "관악구 신림동 한우리지역아동센터 컴퓨터 코딩교육 (2024. 7, 8)",
    ],
  },
  {
    year: "2025년",
    events: [
      "사단법인 깊은순종 공익법인 재지정 (2025. 1)",
      "저소득 취약계층 의료비 지원 (2025. 1~)",
      "저소득 취약계층 아동 심리 치료 지원 (2025. 1~)",
      "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2025. 1~)",
      "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2025. 1~)",
      "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2025. 1~)",
      "저소득 취약계층 무상급식 및 생활 지원(밑반찬 보라매동 추가) (2025. 1~)",
      "관악구 신림동 하늘지역아동센터 컴퓨터 코딩교육 (2025. 1)",
      "사단법인 깊은순종 2025-1차 이사회 (2025. 1. 26)",
      "사단법인 깊은순종 2025년 정기총회 (2025. 2. 16)",
      "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 1명 추가 지원 (2025. 5~)",
      "보건복지부장관 감사패 수상 (2025. 11. 20)",
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={aboutGroup} activeHref="/about/history" />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">법인연혁</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "법인소개", href: aboutGroup.href },
                { label: "법인연혁" },
              ]}
            />
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <div className="border-y border-surface bg-surface py-3 text-center text-sm font-bold text-ink/70">
              2020&apos;s
            </div>

            <div className="p-8 sm:p-12">
              <h2 className="mb-10 text-3xl font-black text-ink">2020&apos;s</h2>

              <ol className="relative border-l-2 border-surface pl-8">
                {history.map((entry) => (
                  <li key={entry.year} className="relative pb-10 last:pb-0">
                    <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-primary bg-white" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                      <span className="w-20 shrink-0 font-bold text-ink">
                        {entry.year}
                      </span>
                      <ul className="space-y-1 text-sm leading-7 text-ink/70">
                        {entry.events.map((event) => (
                          <li key={event}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
