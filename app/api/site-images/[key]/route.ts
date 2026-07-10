import { NextRequest, NextResponse } from "next/server";
import { getSiteImage, setSiteImage } from "@/lib/site-images";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const image = await getSiteImage(key);
  return NextResponse.json(image);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const { imageUrl } = await request.json();

  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json({ error: "imageUrl이 필요합니다." }, { status: 400 });
  }

  const image = await setSiteImage(key, imageUrl);
  return NextResponse.json(image);
}
