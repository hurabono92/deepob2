import SiteTextForm from "@/components/admin/SiteTextForm";
import { getSiteText } from "@/lib/site-texts";
import {
  LOCATION_ADDRESS_KEY,
  LOCATION_ADDRESS_DEFAULT,
  LOCATION_PHONE_KEY,
  LOCATION_PHONE_DEFAULT,
  LOCATION_FAX_KEY,
  LOCATION_FAX_DEFAULT,
  LOCATION_EMAIL_KEY,
  LOCATION_EMAIL_DEFAULT,
  LOCATION_MAP_QUERY_KEY,
  LOCATION_MAP_QUERY_DEFAULT,
} from "@/lib/site-texts";

export default async function AdminLocationPage() {
  const [address, phone, fax, email, mapQuery] = await Promise.all([
    getSiteText(LOCATION_ADDRESS_KEY),
    getSiteText(LOCATION_PHONE_KEY),
    getSiteText(LOCATION_FAX_KEY),
    getSiteText(LOCATION_EMAIL_KEY),
    getSiteText(LOCATION_MAP_QUERY_KEY),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-ink">오시는길 페이지 관리</h1>
      <p className="mb-6 text-sm text-ink/50">
        법인소개 &gt; 오시는길 페이지에 표시되는 주소, 연락처와 지도 검색
        주소를 관리합니다.
      </p>

      <div className="flex flex-col gap-4">
        <SiteTextForm
          textKey={LOCATION_ADDRESS_KEY}
          label="주소 (화면 표시용, 줄바꿈 가능)"
          currentValue={address?.value ?? LOCATION_ADDRESS_DEFAULT}
          multiline
        />
        <SiteTextForm
          textKey={LOCATION_MAP_QUERY_KEY}
          label="지도 검색 주소 (지도에 표시할 도로명 주소)"
          currentValue={mapQuery?.value ?? LOCATION_MAP_QUERY_DEFAULT}
        />
        <SiteTextForm
          textKey={LOCATION_PHONE_KEY}
          label="전화"
          currentValue={phone?.value ?? LOCATION_PHONE_DEFAULT}
        />
        <SiteTextForm
          textKey={LOCATION_FAX_KEY}
          label="팩스"
          currentValue={fax?.value ?? LOCATION_FAX_DEFAULT}
        />
        <SiteTextForm
          textKey={LOCATION_EMAIL_KEY}
          label="이메일"
          currentValue={email?.value ?? LOCATION_EMAIL_DEFAULT}
        />
      </div>
    </div>
  );
}
