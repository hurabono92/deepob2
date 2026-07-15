// 실행: npx prisma db seed (또는 npx tsx prisma/seed.ts)
// 사단법인 깊은순종 실제 공개 게시물 제목/날짜(스크랩 확보)와, 이미 보유 중인
// 자체 활동 사진(my-website/images)을 이용해 초기 데이터를 채운다.
import "dotenv/config";
import { PrismaClient, BoardType } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { parseShortDate } from "../lib/dates";
import { prepareSeedImages, albumImages } from "./prepare-images";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      // 사업소식
      {
        board: BoardType.BUSINESS_NEWS,
        title:
          "2026년 저소득 취약계층 자녀 교육 지원(시각장애인부모의 자녀 교육 지원)",
        content:
          "시각장애인 부모를 둔 저소득 가정 자녀의 교육을 지원하는 사업입니다.",
        createdAt: parseShortDate("26.01.02"),
      },
      {
        board: BoardType.BUSINESS_NEWS,
        title:
          "2026년 저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도)",
        content:
          "다문화가족 자녀의 언어발달과 학습을 지원하는 사업입니다.",
        createdAt: parseShortDate("26.01.02"),
      },
      {
        board: BoardType.BUSINESS_NEWS,
        title: "2026년 저소득 취약계층 의료비 지원(취약계층 아동 심리 치료 지원)",
        content: "취약계층 아동의 심리 치료비를 지원하는 사업입니다.",
        createdAt: parseShortDate("26.01.02"),
      },
      {
        board: BoardType.BUSINESS_NEWS,
        title:
          "2026년 지역의 사회복지시설을 통한 저소득 취약계층 자립 지원(스마트 워커 육성을 위한 컴퓨터 코딩교육)",
        content:
          "지역 사회복지시설과 연계하여 저소득 취약계층의 자립을 돕는 컴퓨터 코딩교육 사업입니다.",
        createdAt: parseShortDate("26.01.02"),
      },

      // 공지사항
      {
        board: BoardType.NOTICE,
        title: "2025년 결산보고서류공시",
        content: "2025년도 결산보고서류를 공시합니다.",
        createdAt: parseShortDate("26.03.12"),
      },
      {
        board: BoardType.NOTICE,
        title: "2026년 정기 회원총회 개최",
        content: "2026년 정기 회원총회를 개최합니다.",
        createdAt: parseShortDate("26.02.06"),
      },
      {
        board: BoardType.NOTICE,
        title: "2026-1차 이사회 개최",
        content: "2026년도 1차 이사회를 개최합니다.",
        createdAt: parseShortDate("26.01.15"),
      },
      {
        board: BoardType.NOTICE,
        title: "2024년 결산보고서류공시",
        content: "2024년도 결산보고서류를 공시합니다.",
        createdAt: parseShortDate("25.03.25"),
      },

      // 활동소식
      {
        board: BoardType.ACTIVITY_NEWS,
        title: "2026년 저소득 취약계층 의료비 지원(취약계층 아동 심리 치료 지원)",
        content: "취약계층 아동 심리 치료 지원 활동을 진행했습니다.",
        createdAt: parseShortDate("26.07.01"),
      },
      {
        board: BoardType.ACTIVITY_NEWS,
        title: "2026년 저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어학습지원)",
        content: "다문화가족 자녀 언어학습지원 활동을 진행했습니다.",
        createdAt: parseShortDate("26.06.30"),
      },
      {
        board: BoardType.ACTIVITY_NEWS,
        title: "2026년 상반기 관악구 신림동 하늘지역아동센터 코딩교육",
        content: "관악구 신림동 하늘지역아동센터에서 코딩교육을 진행했습니다.",
        createdAt: parseShortDate("26.06.24"),
      },
      {
        board: BoardType.ACTIVITY_NEWS,
        title: "2026년 상반기 쪽방촌 소망을 찾는 이 지역아동센터 코딩교육",
        content:
          "쪽방촌 소망을 찾는 이 지역아동센터에서 코딩교육을 진행했습니다.",
        createdAt: parseShortDate("26.06.24"),
      },
    ],
  });

  // 앨범게시판 — 자체 보유 활동 사진 리사이즈 후 등록
  await prepareSeedImages();

  const albumMeta: Record<string, string> = {
    "family-camp.jpg": "자녀 교육 지원 · 가족캠프",
    "language-edu.jpg": "자녀 교육 지원 · 언어교육",
    "tutoring.jpeg": "자녀 교육 지원 · 학습지도",
    "coding-class.jpg": "자립 지원 · 사회복지시설 연계 수업",
    "childcenter-class.jpg": "자립 지원 · 지역아동센터",
    "side-dish-sharing.png": "무상급식 및 생활 지원 · 반찬나눔",
  };

  for (const { file, uploadName } of albumImages) {
    await prisma.post.create({
      data: {
        board: BoardType.ALBUM,
        title: albumMeta[file],
        content: albumMeta[file],
        thumbnailUrl: `/uploads/${uploadName}`,
      },
    });
  }

  // 메인 화면 슬라이드 — 앨범과 동일한 사진 5장을 초기값으로 등록
  await prisma.heroSlide.deleteMany();
  const heroSlideFiles = albumImages.slice(0, 5);
  for (const [order, { uploadName }] of heroSlideFiles.entries()) {
    await prisma.heroSlide.create({
      data: { imageUrl: `/uploads/${uploadName}`, order },
    });
  }

  // 조직도 소개 배너 사진 — 초기값
  await prisma.siteImage.upsert({
    where: { key: "org-chart-banner" },
    update: { imageUrl: `/uploads/${albumImages[3].uploadName}` },
    create: {
      key: "org-chart-banner",
      imageUrl: `/uploads/${albumImages[3].uploadName}`,
    },
  });

  // 법인연혁 — 참고 사이트에서 옮겨온 연도별 실제 연혁
  await prisma.historyEntry.deleteMany();
  await prisma.historyEntry.createMany({
    data: [
      {
        year: "2020년",
        order: 0,
        content: [
          "설립추진단 결성 (1월)",
          "설립추진단 모임 및 목적사업에 대한 회의 (12월)",
        ].join("\n"),
      },
      {
        year: "2021년",
        order: 1,
        content: [
          "설립배경과 구체화된 목적사업에 대한 협의 (1월)",
          "설립동역자 모집 및 준비 모임 진행 (2~4월)",
          "창립총회 진행 (2021. 10. 31)",
        ].join("\n"),
      },
      {
        year: "2022년",
        order: 2,
        content: [
          "사단법인 깊은순종 설립허가 (2022. 3. 3)",
          "사단법인 깊은순종 법인등기 (2022. 3. 31)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬) (2022. 4~)",
          "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2022. 4~)",
          "저소득 취약계층 의료비 지원 (2022. 4~)",
          "저소득 취약계층 의료비 지원(아동 심리 치료) (2022. 5~)",
          "지역의 사회복지시설을 통한 저소득 취약계층 자립 지원(컴퓨터 코딩교육) (2022. 7~) - 상록보육원",
          "사단법인 깊은순종 지정기부금단체 지정 (2022. 9. 30)",
          "지역의 사회복지시설을 통한 저소득 취약계층 자립 지원(컴퓨터 코딩교육) (2022. 12~) - 쪽방촌 소망을 찾는 이 지역아동센터",
        ].join("\n"),
      },
      {
        year: "2023년",
        order: 3,
        content: [
          "저소득 취약계층 의료비 지원(다문화가족 긴급 의료비 추가) (2023. 1~)",
          "저소득 취약계층 의료비 지원(아동 심리 치료) (2023. 1~)",
          "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2023. 1~)",
          "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2023. 1~)",
          "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2023. 1~)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬, 다문화가족 긴급 생활비 추가) (2023. 1~)",
          "사단법인 깊은순종 2023-1차 이사회 (2023. 1. 29)",
          "사단법인 깊은순종 2023년 정기총회 (2023. 2. 26)",
          "저소득 취약계층 의료비 지원(아동 심리 치료 4명 추가) (2023. 6~)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬 17명 추가) (2023. 6~)",
          "관악구 남현동 상록보육원 컴퓨터 코딩교육 (2023. 7, 8)",
        ].join("\n"),
      },
      {
        year: "2024년",
        order: 4,
        content: [
          "저소득 취약계층 의료비 지원 (2024. 1~)",
          "저소득 취약계층 아동 심리 치료 지원 (2024. 1~)",
          "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2024. 1~)",
          "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2024. 1~)",
          "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2024. 1~)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬, 다문화가족 긴급 생활비) (2024. 1~)",
          "사단법인 깊은순종 2024-1차 이사회 (2024. 1. 28)",
          "사단법인 깊은순종 2024년 정기총회 (2024. 2. 25)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬 2명 추가) (2024. 8~)",
          "관악구 신림동 한우리지역아동센터 컴퓨터 코딩교육 (2024. 7, 8)",
        ].join("\n"),
      },
      {
        year: "2025년",
        order: 5,
        content: [
          "사단법인 깊은순종 공익법인 재지정 (2025. 1)",
          "저소득 취약계층 의료비 지원 (2025. 1~)",
          "저소득 취약계층 아동 심리 치료 지원 (2025. 1~)",
          "저소득 취약계층 자녀 교육 지원(시각장애인 부모의 자녀 교육) (2025. 1~)",
          "저소득 취약계층 자녀 교육 지원(다문화가족 자녀 언어발달 및 학습지도) (2025. 1~)",
          "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 (2025. 1~)",
          "저소득 취약계층 무상급식 및 생활 지원(밑반찬 보라매동 추가) (2025. 1~)",
          "관악구 신림동 하늘지역아동센터 컴퓨터 코딩교육 (2025. 1)",
          "사단법인 깊은순종 2025-1차 이사회 (2025. 1. 26)",
          "사단법인 깊은순종 2025년 정기총회 (2025. 2. 16)",
          "쪽방촌 소망을 찾는 이 지역아동센터 컴퓨터 코딩교육 1명 추가 지원 (2025. 5~)",
          "보건복지부장관 감사패 수상 (2025. 11. 20)",
        ].join("\n"),
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
