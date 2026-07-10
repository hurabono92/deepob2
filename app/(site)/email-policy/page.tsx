import PageHeader from "@/components/ui/PageHeader";

export default function EmailPolicyPage() {
  return (
    <>
      <PageHeader title="이메일무단수집거부" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-7 text-ink/70">
        <p>
          본 사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그
          밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며,
          이를 위반 시 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에
          의해 처벌받을 수 있습니다.
        </p>
      </div>
    </>
  );
}
