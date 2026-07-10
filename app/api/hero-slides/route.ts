import { NextRequest, NextResponse } from "next/server";
import { createHeroSlide, getHeroSlides } from "@/lib/hero-slides";

export async function GET() {
  const slides = await getHeroSlides();
  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  const { imageUrl } = await request.json();

  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json({ error: "imageUrl이 필요합니다." }, { status: 400 });
  }

  const slide = await createHeroSlide(imageUrl);
  return NextResponse.json(slide, { status: 201 });
}
