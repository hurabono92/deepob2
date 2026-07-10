import { NextRequest, NextResponse } from "next/server";
import { deleteHeroSlide, moveHeroSlide } from "@/lib/hero-slides";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { direction } = await request.json();

  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "invalid direction" }, { status: 400 });
  }

  await moveHeroSlide(Number(id), direction);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteHeroSlide(Number(id));
  return NextResponse.json({ ok: true });
}
