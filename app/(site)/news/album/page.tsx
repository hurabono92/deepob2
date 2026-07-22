import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionSidebar from "@/components/layout/SectionSidebar";
import BoardTable from "@/components/board/BoardTable";
import { getPostsByBoard, boardMeta, BoardType } from "@/lib/posts";
import { navGroups } from "@/lib/nav-config";

const newsGroup = navGroups.find((g) => g.label === "법인소식")!;

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, total, totalPages } = await getPostsByBoard(
    BoardType.ALBUM,
    { page, q }
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <SectionSidebar group={newsGroup} activeHref="/news/album" />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-ink">
              {boardMeta.ALBUM.label}
            </h1>
            <Breadcrumb
              items={[
                { label: "처음으로", href: "/" },
                { label: "법인소식", href: newsGroup.href },
                { label: boardMeta.ALBUM.label },
              ]}
            />
          </div>

          <BoardTable
            href={boardMeta.ALBUM.href}
            posts={posts}
            page={page}
            totalPages={totalPages}
            total={total}
            q={q}
          />
        </div>
      </div>
    </div>
  );
}
