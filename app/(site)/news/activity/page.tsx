import BoardList from "@/components/board/BoardList";
import { getPostsByBoard, boardMeta, BoardType } from "@/lib/posts";

export default async function ActivityNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, totalPages } = await getPostsByBoard(
    BoardType.ACTIVITY_NEWS,
    { page }
  );

  return (
    <BoardList
      title={boardMeta.ACTIVITY_NEWS.label}
      href={boardMeta.ACTIVITY_NEWS.href}
      posts={posts}
      page={page}
      totalPages={totalPages}
    />
  );
}
