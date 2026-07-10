import BoardList from "@/components/board/BoardList";
import { getPostsByBoard, boardMeta, BoardType } from "@/lib/posts";

export default async function NoticePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, totalPages } = await getPostsByBoard(BoardType.NOTICE, {
    page,
  });

  return (
    <BoardList
      title={boardMeta.NOTICE.label}
      href={boardMeta.NOTICE.href}
      posts={posts}
      page={page}
      totalPages={totalPages}
    />
  );
}
