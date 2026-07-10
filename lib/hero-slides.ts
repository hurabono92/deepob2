import { prisma } from "@/lib/db";

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
}

export async function createHeroSlide(imageUrl: string) {
  const last = await prisma.heroSlide.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? -1) + 1;
  return prisma.heroSlide.create({ data: { imageUrl, order } });
}

export async function deleteHeroSlide(id: number) {
  return prisma.heroSlide.delete({ where: { id } });
}

export async function updateHeroSlideOrder(id: number, order: number) {
  return prisma.heroSlide.update({ where: { id }, data: { order } });
}

export async function moveHeroSlide(id: number, direction: "up" | "down") {
  const slides = await getHeroSlides();
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= slides.length) return;

  const current = slides[index];
  const swapWith = slides[swapIndex];

  await prisma.$transaction([
    prisma.heroSlide.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.heroSlide.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);
}
