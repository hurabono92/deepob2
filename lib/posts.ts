import { prisma } from "@/lib/db";
import { BoardType, boardMeta, boardTypeFromSlug } from "@/lib/board-meta";

export { BoardType, boardMeta, boardTypeFromSlug };

export type PostInput = {
  board: BoardType;
  title: string;
  content: string;
  contentColor?: string | null;
  thumbnailUrl?: string | null;
  authorName?: string;
};

export async function getLatestByBoard(board: BoardType, limit: number) {
  return prisma.post.findMany({
    where: { board, published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getPostsByBoard(
  board: BoardType,
  {
    page = 1,
    limit = 10,
    q,
  }: { page?: number; limit?: number; q?: string } = {}
) {
  const where = {
    board,
    published: true,
    ...(q ? { title: { contains: q } } : {}),
  };
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);
  return { posts, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({ where: { id } });
}

export async function incrementViewCount(id: number) {
  return prisma.post.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

export async function createPost(data: PostInput) {
  return prisma.post.create({ data });
}

export async function updatePost(
  id: number,
  data: Partial<PostInput> & { published?: boolean }
) {
  return prisma.post.update({ where: { id }, data });
}

export async function deletePost(id: number) {
  return prisma.post.delete({ where: { id } });
}
