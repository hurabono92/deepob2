import { NextRequest, NextResponse } from "next/server";
import { addPostImage, getPostImages } from "@/lib/post-images";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const images = await getPostImages(Number(id));
  return NextResponse.json(images);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { imageUrl } = await request.json();

  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json({ error: "imageUrl이 필요합니다." }, { status: 400 });
  }

  const image = await addPostImage(Number(id), imageUrl);
  return NextResponse.json(image, { status: 201 });
}
