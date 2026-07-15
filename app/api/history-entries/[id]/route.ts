import { NextRequest, NextResponse } from "next/server";
import { updateHistoryEntry, deleteHistoryEntry } from "@/lib/history";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { year, content, imageUrl, order } = await request.json();

  if (typeof year !== "string" || !year.trim()) {
    return NextResponse.json({ error: "연도를 입력해주세요." }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });
  }

  const entry = await updateHistoryEntry(Number(id), {
    year: year.trim(),
    content,
    imageUrl: typeof imageUrl === "string" ? imageUrl : null,
    order: typeof order === "number" ? order : undefined,
  });
  return NextResponse.json(entry);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteHistoryEntry(Number(id));
  return NextResponse.json({ ok: true });
}
