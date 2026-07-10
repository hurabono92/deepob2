import Card from "@/components/ui/Card";

const cards = [
  {
    href: "/business/welfare",
    title: "복지서비스",
    description: "저소득 취약계층을 위한 다양한 복지서비스를 소개합니다.",
    icon: "🏥",
  },
  {
    href: "/giving/donate",
    title: "후원신청",
    description: "정기·일시 후원으로 나눔에 함께 참여하실 수 있습니다.",
    icon: "🤝",
  },
  {
    href: "/giving/fund",
    title: "기금후원",
    description: "사업 기금 후원으로 지속가능한 지원을 도와주세요.",
    icon: "💐",
  },
  {
    href: "/giving/volunteer",
    title: "자원봉사참여",
    description: "따뜻한 손길을 기다려요 — 자원봉사 참여 방법을 안내합니다.",
    icon: "🙌",
  },
];

export default function ExploreCards() {
  return (
    <section className="bg-surface px-4 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-2xl font-black text-primary-dark sm:text-3xl">
          둘러보기
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.href} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
