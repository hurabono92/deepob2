import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/lib/posts";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { title, content, thumbnailUrl, authorName, published } = body;

  const existing = await getPostById(Number(id));
  if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 });

  const post = await updatePost(Number(id), {
    ...(title !== undefined && { title: String(title).trim() }),
    ...(content !== undefined && { content: String(content).trim() }),
    ...(thumbnailUrl !== undefined && { thumbnailUrl }),
    ...(authorName !== undefined && { authorName: String(authorName).trim() }),
    ...(published !== undefined && { published: Boolean(published) }),
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = await getPostById(Number(id));
  if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 });

  await deletePost(Number(id));
  return NextResponse.json({ ok: true });
}
