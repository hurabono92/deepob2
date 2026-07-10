import { NextRequest, NextResponse } from "next/server";
import { getSiteText, setSiteText } from "@/lib/site-texts";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const text = await getSiteText(key);
  return NextResponse.json(text);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const { value } = await request.json();

  if (!value || typeof value !== "string") {
    return NextResponse.json({ error: "value가 필요합니다." }, { status: 400 });
  }

  const text = await setSiteText(key, value);
  return NextResponse.json(text);
}
