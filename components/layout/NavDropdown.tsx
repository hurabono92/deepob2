import Link from "next/link";
import type { NavGroup } from "@/lib/nav-config";

export default function NavDropdown({ group }: { group: NavGroup }) {
  return (
    <div className="group relative h-20 flex items-center">
      <Link
        href={group.href}
        className="px-4 text-[20px] font-bold text-white hover:text-white/80"
      >
        {group.label}
      </Link>
      <div
        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 w-44 rounded-b-md
        bg-white shadow-card opacity-0 -translate-y-1 transition
        group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
      >
        <ul className="py-2">
          {group.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block px-4 py-2 text-[14px] text-ink hover:bg-surface hover:text-primary"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
