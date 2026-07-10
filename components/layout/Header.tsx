"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navGroups } from "@/lib/nav-config";
import NavDropdown from "./NavDropdown";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary-dark shadow-card">
      <div className="mx-auto max-w-[1200px] px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logos/deepob-mark.png" alt="사단법인 깊은순종 로고" width={44} height={44} className="h-11 w-11 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-medium text-white">사단법인</span>
            <span className="text-2xl font-black text-white tracking-tight">깊은순종</span>
            <span className="text-xs font-medium text-white tracking-wide">
              Amazing Grace Corporation
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center">
          {navGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin/login"
            className="text-[17px] font-semibold text-white/70 hover:text-white"
          >
            관리자
          </Link>
          <Link
            href="/about/location"
            className="rounded-full bg-primary px-[22px] py-[11px] text-[17px] font-bold text-white hover:bg-primary/90"
          >
            LOCATION
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white text-2xl leading-none"
          aria-label="메뉴 열기"
          onClick={() => setMobileOpen(true)}
        >
          &#9776;
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
