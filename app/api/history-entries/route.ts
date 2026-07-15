import { NextRequest, NextResponse } from "next/server";
import { getHistoryEntries, createHistoryEntry } from "@/lib/history";

export async function GET() {
  const entries = await getHistoryEntries();
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const { year, content, imageUrl, order } = await request.json();

  if (typeof year !== "string" || !year.trim()) {
    return NextResponse.json({ error: "연도를 입력해주세요." }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });
  }

  const entry = await createHistoryEntry({
    year: year.trim(),
    content,
    imageUrl: typeof imageUrl === "string" ? imageUrl : null,
    order: typeof order === "number" ? order : 0,
  });
  return NextResponse.json(entry, { status: 201 });
}
