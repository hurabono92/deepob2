// 클라이언트 컴포넌트에서도 안전하게 import할 수 있는 게시판 메타데이터.
// lib/posts.ts(서버 전용, Prisma/better-sqlite3 포함)와 분리해 클라이언트 번들에
// Node 전용 네이티브 모듈이 섞여 들어가는 것을 방지한다.
import { BoardType } from "@/app/generated/prisma/enums";

export { BoardType };

export const boardMeta: Record<
  BoardType,
  { slug: string; label: string; href: string }
> = {
  BUSINESS_NEWS: { slug: "business-news", label: "사업소식", href: "/business/news" },
  NOTICE: { slug: "notice", label: "공지사항", href: "/news/notice" },
  ACTIVITY_NEWS: { slug: "activity-news", label: "활동소식", href: "/news/activity" },
  ALBUM: { slug: "album", label: "앨범게시판", href: "/news/album" },
};

export function boardTypeFromSlug(slug: string): BoardType | null {
  const entry = Object.entries(boardMeta).find(([, v]) => v.slug === slug);
  return entry ? (entry[0] as BoardType) : null;
}
