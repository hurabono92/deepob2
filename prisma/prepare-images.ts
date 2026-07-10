// 앨범 시드용 이미지를 my-website/images에서 가져와 public/uploads로 복사/압축한다.
// (원본 대형 이미지, 특히 language-edu.jpg(~6.9MB)는 웹 게시용으로 리사이즈한다.)
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

const SOURCE_DIR = path.join(
  process.cwd(),
  "..",
  "my-website",
  "images"
);
const TARGET_DIR = path.join(process.cwd(), "public", "uploads");

export const albumImages = [
  { file: "family-camp.jpg", uploadName: "seed-family-camp.jpg" },
  { file: "language-edu.jpg", uploadName: "seed-language-edu.jpg" },
  { file: "tutoring.jpeg", uploadName: "seed-tutoring.jpg" },
  { file: "coding-class.jpg", uploadName: "seed-coding-class.jpg" },
  { file: "childcenter-class.jpg", uploadName: "seed-childcenter-class.jpg" },
  { file: "side-dish-sharing.png", uploadName: "seed-side-dish-sharing.jpg" },
];

export async function prepareSeedImages() {
  await fs.mkdir(TARGET_DIR, { recursive: true });

  for (const { file, uploadName } of albumImages) {
    const src = path.join(SOURCE_DIR, file);
    const dest = path.join(TARGET_DIR, uploadName);
    await sharp(src)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(dest);
  }
}
