import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import { navGroups } from "@/lib/nav-config";
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

const aboutGroup = navGroups.find((g) => g.label === "법인소개")!;

export default async function LocationPage() {
  const [address, phone, fax, email, mapQuery] = await Promise.all([
    getSiteText(LOCATION_ADDRESS_KEY),
    getSiteText(LOCATION_PHONE_KEY),
    getSiteText(LOCATION_FAX_KEY),
    getSiteText(LOCATION_EMAIL_KEY),
    getSiteText(LOCATION_MAP_QUERY_KEY),
  ]);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery?.value ?? LOCATION_MAP_QUERY_DEFAULT
  )}&output=embed`;

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

          <div className="overflow-hidden rounded-xl shadow-card">
            <iframe
              src={mapSrc}
              className="h-80 w-full border-0 sm:h-96"
              loading="lazy"
              title="오시는길 지도"
            />
          </div>

          <div className="mt-4 rounded-xl bg-white p-8 shadow-card">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-surface pb-3">
                <dt className="text-ink/50">주소</dt>
                <dd className="whitespace-pre-line text-right font-semibold text-ink">
                  {address?.value ?? LOCATION_ADDRESS_DEFAULT}
                </dd>
              </div>
              <div className="flex justify-between border-b border-surface pb-3">
                <dt className="text-ink/50">전화</dt>
                <dd className="font-semibold text-ink">
                  {phone?.value ?? LOCATION_PHONE_DEFAULT}
                </dd>
              </div>
              <div className="flex justify-between border-b border-surface pb-3">
                <dt className="text-ink/50">팩스</dt>
                <dd className="font-semibold text-ink">
                  {fax?.value ?? LOCATION_FAX_DEFAULT}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">이메일</dt>
                <dd className="font-semibold text-ink">
                  {email?.value ?? LOCATION_EMAIL_DEFAULT}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
