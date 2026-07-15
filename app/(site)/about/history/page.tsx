import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import { navGroups } from "@/lib/nav-config";
import { getHistoryEntries, parseHistoryLines } from "@/lib/history";

const aboutGroup = navGroups.find((g) => g.label === "법인소개")!;

export default async function HistoryPage() {
  const entries = await getHistoryEntries();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={aboutGroup} activeHref="/about/history" />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">법인연혁</h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "법인소개", href: aboutGroup.href },
                { label: "법인연혁" },
              ]}
            />
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <div className="border-y border-surface bg-surface py-3 text-center text-sm font-bold text-ink/70">
              2020&apos;s
            </div>

            <div className="p-8 sm:p-12">
              <h2 className="mb-10 text-3xl font-black text-ink">2020&apos;s</h2>

              {entries.length === 0 ? (
                <p className="text-sm text-ink/50">등록된 연혁이 없습니다.</p>
              ) : (
                <ol className="relative border-l-2 border-surface pl-8">
                  {entries.map((entry) => (
                    <li key={entry.id} className="relative pb-10 last:pb-0">
                      <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-primary bg-white" />
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <span className="w-20 shrink-0 font-bold text-ink">
                          {entry.year}
                        </span>
                        {entry.imageUrl && (
                          <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-md bg-surface">
                            <Image
                              src={entry.imageUrl}
                              alt={entry.year}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <ul className="space-y-1 text-sm leading-7 text-ink/70">
                          {parseHistoryLines(entry.content).map((event) => (
                            <li key={event}>{event}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
