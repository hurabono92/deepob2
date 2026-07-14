"use client";

import Link from "next/link";
import { navGroups } from "@/lib/nav-config";

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-4 h-16 border-b border-surface">
          <span className="font-bold text-primary-dark">메뉴</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="text-2xl leading-none text-ink"
          >
            &times;
          </button>
        </div>
        <nav className="px-4 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="font-bold text-primary-dark mb-2">
                {group.label}
              </div>
              <ul className="space-y-1 pl-2">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onClose}
                      className="block py-1 text-sm text-ink hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
