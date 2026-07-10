import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { getHeroSlides } from "@/lib/hero-slides";
import {
  getSiteText,
  HERO_TITLE_KEY,
  HERO_TITLE_DEFAULT,
  HERO_SUBTITLE_KEY,
  HERO_SUBTITLE_DEFAULT,
} from "@/lib/site-texts";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [heroSlides, heroTitle, heroSubtitle] = await Promise.all([
    getHeroSlides(),
    getSiteText(HERO_TITLE_KEY),
    getSiteText(HERO_SUBTITLE_KEY),
  ]);

  return (
    <>
      <Header />
      <Hero
        slides={heroSlides}
        title={heroTitle?.value ?? HERO_TITLE_DEFAULT}
        subtitle={heroSubtitle?.value ?? HERO_SUBTITLE_DEFAULT}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
