import BoardPreviewColumn from "@/components/home/BoardPreviewColumn";
import ExternalLinksColumn from "@/components/home/ExternalLinksColumn";
import OrgChartBanner from "@/components/home/OrgChartBanner";
import ExploreCards from "@/components/home/ExploreCards";
import HistorySection from "@/components/home/HistorySection";
import QuoteBanner from "@/components/home/QuoteBanner";
import GalleryGrid from "@/components/home/GalleryGrid";
import { getLatestByBoard, boardMeta, BoardType } from "@/lib/posts";
import { getSiteImage, ORG_CHART_BANNER_KEY } from "@/lib/site-images";

export default async function HomePage() {
  const [businessNews, notice, activityNews, album, orgChartImage] =
    await Promise.all([
      getLatestByBoard(BoardType.BUSINESS_NEWS, 4),
      getLatestByBoard(BoardType.NOTICE, 4),
      getLatestByBoard(BoardType.ACTIVITY_NEWS, 4),
      getLatestByBoard(BoardType.ALBUM, 8),
      getSiteImage(ORG_CHART_BANNER_KEY),
    ]);

  return (
    <>
      <section className="relative z-10 -mt-16 px-4 pb-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <BoardPreviewColumn
            title={boardMeta.BUSINESS_NEWS.label}
            href={boardMeta.BUSINESS_NEWS.href}
            posts={businessNews}
          />
          <BoardPreviewColumn
            title={boardMeta.NOTICE.label}
            href={boardMeta.NOTICE.href}
            posts={notice}
          />
          <BoardPreviewColumn
            title={boardMeta.ACTIVITY_NEWS.label}
            href={boardMeta.ACTIVITY_NEWS.href}
            posts={activityNews}
          />
          <ExternalLinksColumn />
        </div>
      </section>

      <OrgChartBanner imageUrl={orgChartImage?.imageUrl ?? null} />
      <ExploreCards />
      <HistorySection />
      <QuoteBanner />
      <GalleryGrid posts={album} />
    </>
  );
}
