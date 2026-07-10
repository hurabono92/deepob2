import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import PostImageGallery from "@/components/admin/PostImageGallery";
import { getPostById } from "@/lib/posts";
import { getPostImages } from "@/lib/post-images";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  const images = await getPostImages(post.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-ink">게시물 수정</h1>
      <PostForm
        initial={{
          id: post.id,
          board: post.board,
          title: post.title,
          content: post.content,
          thumbnailUrl: post.thumbnailUrl,
        }}
      />

      <div className="mt-10">
        <PostImageGallery postId={post.id} images={images} />
      </div>
    </div>
  );
}
