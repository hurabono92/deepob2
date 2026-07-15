import { prisma } from "@/lib/db";

export const HERO_TITLE_KEY = "hero-title";
export const HERO_SUBTITLE_KEY = "hero-subtitle";

export const HERO_TITLE_DEFAULT = "우리 모두가 행복한 세상 함께 만들어요~!";
export const HERO_SUBTITLE_DEFAULT =
  "사단법인 깊은순종은 이웃에 대한 그리스도의 사랑을 실천하기 위해 설립된 비영리법인입니다.";

export const LOCATION_ADDRESS_KEY = "location-address";
export const LOCATION_PHONE_KEY = "location-phone";
export const LOCATION_FAX_KEY = "location-fax";
export const LOCATION_EMAIL_KEY = "location-email";
export const LOCATION_MAP_QUERY_KEY = "location-map-query";

export const LOCATION_ADDRESS_DEFAULT =
  "(08792) 서울특별시 관악구 낙성대로3길 15 (봉천동)\n사단법인 깊은순종";
export const LOCATION_PHONE_DEFAULT = "070-4163-5243";
export const LOCATION_FAX_DEFAULT = "02-888-1285";
export const LOCATION_EMAIL_DEFAULT = "deepob@naver.com";
export const LOCATION_MAP_QUERY_DEFAULT = "서울특별시 관악구 낙성대로3길 15";

export async function getSiteText(key: string) {
  return prisma.siteText.findUnique({ where: { key } });
}

export async function setSiteText(key: string, value: string) {
  return prisma.siteText.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
