import { NextRequest, NextResponse } from "next/server";
import { deletePostImage, movePostImage } from "@/lib/post-images";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const { imageId } = await params;
  const { direction } = await request.json();

  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "invalid direction" }, { status: 400 });
  }

  await movePostImage(Number(imageId), direction);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const { imageId } = await params;
  await deletePostImage(Number(imageId));
  return NextResponse.json({ ok: true });
}
