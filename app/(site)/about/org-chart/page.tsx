import PageHeader from "@/components/ui/PageHeader";

const orgChart = [
  { role: "이사회", people: "이사장 · 이사 · 감사" },
  { role: "사무국", people: "사무국장" },
  { role: "복지사업팀", people: "팀장 · 사회복지사" },
  { role: "후원관리팀", people: "팀장 · 담당자" },
];

export default function OrgChartPage() {
  return (
    <>
      <PageHeader
        title="사단법인 깊은순종 조직도"
        subtitle="사단법인 깊은순종은 아동/청소년, 장애인, 노인 어르신, 다문화 가정, 저소득 계층 등 사회의 모든 구성원이 행복해지도록 노력하고 있습니다."
      />
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="space-y-4">
          {orgChart.map((row) => (
            <div
              key={row.role}
              className="flex items-center justify-between rounded-xl bg-white p-5 shadow-card"
            >
              <span className="font-bold text-primary-dark">{row.role}</span>
              <span className="text-sm text-ink/70">{row.people}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
