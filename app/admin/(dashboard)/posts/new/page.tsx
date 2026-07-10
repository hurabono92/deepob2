import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-ink">새 게시물 작성</h1>
      <PostForm />
    </div>
  );
}
