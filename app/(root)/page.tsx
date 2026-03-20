import { Suspense } from "react";
import HeroCarouselSkeleton from "@/components/loading/HeroCarouselSkeleton";
import AnimeListSkeleton from "@/components/loading/AnimeListSkeleton";
import dynamic from "next/dynamic";

const AnimeList = dynamic(() => import("@/components/anime/AnimeList"));
const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"));

export default function Home() {
  return (
    <main className="mx-auto pb-12">
      <Suspense fallback={<HeroCarouselSkeleton />}>
        <HeroCarousel />
      </Suspense>
      <Suspense fallback={<AnimeListSkeleton />}>
        <AnimeList
          title="Top Rated"
          description="Most popular among fans"
          url="https://api.jikan.moe/v4/top/anime"
        />
      </Suspense>
      <Suspense fallback={<AnimeListSkeleton />}>
        <AnimeList
          title="Ongoing Anime"
          description="Currently airing this season"
          url="https://api.jikan.moe/v4/seasons/now"
        />
      </Suspense>
    </main>
  );
}
