import { prisma } from "@/lib/db";

export const ORG_CHART_BANNER_KEY = "org-chart-banner";

export async function getSiteImage(key: string) {
  return prisma.siteImage.findUnique({ where: { key } });
}

export async function setSiteImage(key: string, imageUrl: string) {
  return prisma.siteImage.upsert({
    where: { key },
    update: { imageUrl },
    create: { key, imageUrl },
  });
}
