import { prisma } from "@/lib/db";

export const HERO_TITLE_KEY = "hero-title";
export const HERO_SUBTITLE_KEY = "hero-subtitle";

export const HERO_TITLE_DEFAULT = "우리 모두가 행복한 세상 함께 만들어요~!";
export const HERO_SUBTITLE_DEFAULT =
  "사단법인 깊은순종은 이웃에 대한 그리스도의 사랑을 실천하기 위해 설립된 비영리법인입니다.";

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
