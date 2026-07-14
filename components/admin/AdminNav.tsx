"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/posts", label: "게시물 관리" },
  { href: "/admin/hero-slides", label: "사진 관리" },
  { href: "/admin/business-welfare", label: "복지서비스 페이지 관리" },
  { href: "/admin/giving-pages", label: "나눔안내 페이지 관리" },
  { href: "/admin/news", label: "법인소식 페이지 관리" },
  { href: "/admin/account", label: "계정 설정" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full shrink-0 border-b border-black/10 bg-primary-dark text-white sm:h-screen sm:w-56 sm:border-b-0 sm:border-r">
      <div className="px-6 py-5 text-sm font-bold">사단법인 깊은순종 관리자</div>
      <nav className="flex gap-1 px-3 pb-3 sm:flex-col">
        <Link
          href="/"
          className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          홈 화면으로
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-2 text-sm ${
              pathname === link.href
                ? "bg-white/15 font-semibold"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 rounded-md px-3 py-2 text-left text-sm text-white/60 hover:bg-white/10"
        >
          로그아웃
        </button>
      </nav>
    </aside>
  );
}
