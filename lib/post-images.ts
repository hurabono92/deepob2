import { prisma } from "@/lib/db";

export async function getPostImages(postId: number) {
  return prisma.postImage.findMany({
    where: { postId },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
}

export async function addPostImage(postId: number, imageUrl: string) {
  const last = await prisma.postImage.findFirst({
    where: { postId },
    orderBy: { order: "desc" },
  });
  const order = (last?.order ?? -1) + 1;
  return prisma.postImage.create({ data: { postId, imageUrl, order } });
}

export async function deletePostImage(id: number) {
  return prisma.postImage.delete({ where: { id } });
}

export async function movePostImage(id: number, direction: "up" | "down") {
  const image = await prisma.postImage.findUnique({ where: { id } });
  if (!image) return;

  const images = await getPostImages(image.postId);
  const index = images.findIndex((i) => i.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swapWith = images[swapIndex];

  await prisma.$transaction([
    prisma.postImage.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.postImage.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);
}
