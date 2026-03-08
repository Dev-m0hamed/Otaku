import AnimeList from "@/components/AnimeList";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AnimeList
        title="Top Rated"
        description="Most popular among fans"
        url="https://api.jikan.moe/v4/top/anime"
      />
      <AnimeList
        title="Ongoing Anime"
        description="Currently airing this season"
        url="https://api.jikan.moe/v4/seasons/now"
      />
    </>
  );
}
