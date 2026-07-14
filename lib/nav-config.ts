export type NavChild = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children: NavChild[];
};

// 사단법인 깊은순종 사이트의 4단 메뉴 구조 (실제 사이트 메뉴를 참고해 재구성)
export const navGroups: NavGroup[] = [
  {
    label: "사업안내",
    href: "/business/welfare",
    children: [
      { label: "복지서비스", href: "/business/welfare" },
      { label: "사업소식", href: "/business/news" },
    ],
  },
  {
    label: "나눔안내",
    href: "/giving/volunteer",
    children: [
      { label: "자원봉사참여방법", href: "/giving/volunteer" },
      { label: "후원신청", href: "/giving/donate" },
      { label: "기금후원", href: "/giving/fund" },
    ],
  },
  {
    label: "법인소식",
    href: "/news/activity",
    children: [
      { label: "활동소식", href: "/news/activity" },
      { label: "공지사항", href: "/news/notice" },
      { label: "앨범게시판", href: "/news/album" },
    ],
  },
  {
    label: "법인소개",
    href: "/about/org-chart",
    children: [
      { label: "조직도", href: "/about/org-chart" },
      { label: "법인연혁", href: "/about/history" },
      { label: "오시는길", href: "/about/location" },
    ],
  },
];
