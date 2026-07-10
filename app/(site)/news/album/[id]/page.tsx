import { notFound } from "next/navigation";
import BoardDetail from "@/components/board/BoardDetail";
import { getPostById, boardMeta, BoardType } from "@/lib/posts";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post || post.board !== BoardType.ALBUM) notFound();

  return (
    <BoardDetail
      listHref={boardMeta.ALBUM.href}
      listLabel={boardMeta.ALBUM.label}
      title={post.title}
      authorName={post.authorName}
      createdAt={post.createdAt}
      thumbnailUrl={post.thumbnailUrl}
      content={post.content}
    />
  );
}
