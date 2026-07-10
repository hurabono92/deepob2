import { notFound } from "next/navigation";
import BoardDetail from "@/components/board/BoardDetail";
import { getPostById, boardMeta, BoardType } from "@/lib/posts";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post || post.board !== BoardType.NOTICE) notFound();

  return (
    <BoardDetail
      listHref={boardMeta.NOTICE.href}
      listLabel={boardMeta.NOTICE.label}
      title={post.title}
      authorName={post.authorName}
      createdAt={post.createdAt}
      thumbnailUrl={post.thumbnailUrl}
      content={post.content}
    />
  );
}
