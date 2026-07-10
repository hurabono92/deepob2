import PageHeader from "@/components/ui/PageHeader";

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="법인연혁" subtitle="법인소개" />
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-base leading-8 text-ink/70">
          지역사회에 건강하고 행복한 가정이 많아지도록 다양한 복지서비스를
          제공하며 안전망 역할을 합니다. 사랑과 봉사 나눔과 섬김을
          실천합니다. 사단법인 깊은순종은 이웃에 대한 그리스도의 사랑을
          실천하기 위해 설립된 비영리법인입니다.
        </p>
      </div>
    </>
  );
}
