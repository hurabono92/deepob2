import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";
import { isAllowedAttachment } from "@/lib/files";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 20 * 1024 * 1024; // 20MB — 카메라/스캔 원본 사진도 올릴 수 있도록 여유 있게 설정

// 로컬 디스크(public/uploads)에 저장 — next start/dev로 상시 실행되는 서버 전제.
// 이후 서버리스(예: Vercel/Cloudflare) 배포로 옮길 경우 파일 시스템이 휘발성이므로
// S3/R2 등 외부 스토리지로 교체해야 함.
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind"); // "attachment"면 문서 파일도 허용, 그 외(기본값)는 이미지 전용

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  const allowed =
    kind === "attachment" ? isAllowedAttachment(file.name) : IMAGE_TYPES.includes(file.type);
  if (!allowed) {
    return NextResponse.json(
      {
        error:
          kind === "attachment"
            ? "지원하지 않는 파일 형식입니다."
            : "jpg, png, webp 형식만 업로드할 수 있습니다.",
      },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "파일 크기는 20MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name) || "";
  const filename = `${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json(
    { url: `/uploads/${filename}`, originalName: file.name },
    { status: 201 }
  );
}
