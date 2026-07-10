import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const links = [
  { href: "/about/org-chart", title: "조직도" },
  { href: "/about/history", title: "법인연혁" },
  { href: "/about/location", title: "오시는길" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="법인소개" subtitle="사단법인 깊은순종" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="mb-12 text-base leading-7 text-ink/70">
          사단법인 깊은순종은 이웃에 대한 그리스도의 사랑을 실천하기 위해
          설립된 비영리법인입니다. 아동/청소년, 장애인, 노인 어르신,
          다문화 가정, 저소득 계층 등 사회의 모든 구성원이 행복해지도록
          노력하고 있습니다.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl bg-white p-6 font-bold text-ink shadow-card hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
