import PostForm from "@/components/admin/PostForm";
import { BoardType } from "@/lib/posts";

function isBoardType(value: string | undefined): value is BoardType {
  return !!value && (Object.values(BoardType) as string[]).includes(value);
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string; from?: string }>;
}) {
  const { board, from } = await searchParams;

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-ink">새 게시물 작성</h1>
      <PostForm
        initialBoard={isBoardType(board) ? board : undefined}
        returnTo={from}
      />
    </div>
  );
}
