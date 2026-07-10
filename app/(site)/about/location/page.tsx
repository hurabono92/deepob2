import PageHeader from "@/components/ui/PageHeader";

export default function LocationPage() {
  return (
    <>
      <PageHeader title="오시는길" subtitle="법인소개" />
      <div className="mx-auto max-w-2xl px-4 py-16">
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
    </>
  );
}
