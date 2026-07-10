import Link from "next/link";
import type { NavGroup } from "@/lib/nav-config";

export default function SectionSidebar({
  group,
  activeHref,
}: {
  group: NavGroup;
  activeHref: string;
}) {
  return (
    <aside className="w-full shrink-0 sm:w-56">
      <div className="rounded-t-md bg-primary px-5 py-4 text-base font-bold text-white">
        {group.label}
      </div>
      <ul className="rounded-b-md border border-t-0 border-surface bg-white">
        {group.children.map((child) => {
          const active = child.href === activeHref;
          return (
            <li key={child.href} className="border-b border-surface last:border-b-0">
              <Link
                href={child.href}
                className={`block px-5 py-3 text-sm ${
                  active ? "font-bold text-primary" : "text-ink/60 hover:text-primary"
                }`}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
