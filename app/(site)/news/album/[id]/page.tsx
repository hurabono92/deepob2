import { notFound } from "next/navigation";
import BoardDetail from "@/components/board/BoardDetail";
import { getPostById, incrementViewCount, boardMeta, BoardType } from "@/lib/posts";
import { getPostImages } from "@/lib/post-images";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post || post.board !== BoardType.ALBUM) notFound();

  const [, images] = await Promise.all([
    incrementViewCount(post.id),
    getPostImages(post.id),
  ]);

  return (
    <BoardDetail
      listHref={boardMeta.ALBUM.href}
      listLabel={boardMeta.ALBUM.label}
      postId={post.id}
      title={post.title}
      authorName={post.authorName}
      createdAt={post.createdAt}
      viewCount={post.viewCount}
      thumbnailUrl={post.thumbnailUrl}
      content={post.content}
      contentColor={post.contentColor}
      images={images}
    />
  );
}
