import { NextRequest, NextResponse } from "next/server";
import {
  BoardType,
  createPost,
  getPostsByBoard,
} from "@/lib/posts";

function isBoardType(value: unknown): value is BoardType {
  return (
    typeof value === "string" &&
    (Object.values(BoardType) as string[]).includes(value)
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const board = searchParams.get("board");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  if (!isBoardType(board)) {
    return NextResponse.json({ error: "invalid board" }, { status: 400 });
  }

  const result = await getPostsByBoard(board, { page, limit });
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { board, title, content, thumbnailUrl, authorName } = body;

  if (!isBoardType(board) || !title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const post = await createPost({
    board,
    title: title.trim(),
    content: content.trim(),
    thumbnailUrl: thumbnailUrl || null,
    authorName: authorName?.trim() || undefined,
  });

  return NextResponse.json(post, { status: 201 });
}
