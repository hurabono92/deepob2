import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { ZipArchive } from "archiver";
import { getPostById } from "@/lib/posts";
import { getPostImages } from "@/lib/post-images";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
  }

  const images = await getPostImages(post.id);
  const files = images.length > 0
    ? images.map((image) => ({ url: image.imageUrl, name: image.originalName }))
    : post.thumbnailUrl
      ? [{ url: post.thumbnailUrl, name: null as string | null }]
      : [];

  if (files.length === 0) {
    return NextResponse.json({ error: "첨부파일이 없습니다." }, { status: 404 });
  }

  const archive = new ZipArchive({ zlib: { level: 9 } });
  const chunks: Buffer[] = [];
  archive.on("data", (chunk: Buffer) => chunks.push(chunk));
  const archiveDone = new Promise<void>((resolve, reject) => {
    archive.on("end", () => resolve());
    archive.on("error", reject);
  });

  for (const [i, file] of files.entries()) {
    const filePath = path.join(process.cwd(), "public", file.url);
    const buffer = await fs.readFile(filePath);
    archive.append(buffer, { name: file.name ?? `${i + 1}${path.extname(file.url)}` });
  }

  archive.finalize();
  await archiveDone;

  const filename = encodeURIComponent(`${post.title}.zip`);

  return new NextResponse(new Uint8Array(Buffer.concat(chunks)), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="attachments.zip"; filename*=UTF-8''${filename}`,
    },
  });
}
