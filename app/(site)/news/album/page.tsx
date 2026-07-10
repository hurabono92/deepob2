import BoardList from "@/components/board/BoardList";
import { getPostsByBoard, boardMeta, BoardType } from "@/lib/posts";

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, totalPages } = await getPostsByBoard(BoardType.ALBUM, {
    page,
    limit: 12,
  });

  return (
    <BoardList
      title={boardMeta.ALBUM.label}
      href={boardMeta.ALBUM.href}
      posts={posts}
      page={page}
      totalPages={totalPages}
      variant="grid"
    />
  );
}
