import PageHeader from "@/components/ui/PageHeader";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="개인정보처리방침" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-7 text-ink/70">
        <p>
          사단법인 깊은순종은 이용자의 개인정보를 중요시하며, 「개인정보
          보호법」 등 관련 법령을 준수하고 있습니다. 수집된 개인정보는
          후원·문의 응대 등 목적 범위 내에서만 이용하며, 목적 달성 후에는
          지체 없이 파기합니다. 개인정보 처리에 관한 문의는 아래 연락처로
          부탁드립니다.
        </p>
        <p className="mt-4">문의: deepob@naver.com &nbsp;|&nbsp; 070-4163-5243</p>
      </div>
    </>
  );
}
