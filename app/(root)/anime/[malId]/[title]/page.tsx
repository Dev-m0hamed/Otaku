import AnimeHeroSection from "@/components/anime/AnimeHeroSection";
import type { PageProps } from "@/types";

async function page({ params }: PageProps) {
  const { malId } = await params;
  const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}/full`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const data = json.data ?? [];
  return (
    <AnimeHeroSection data={data} />
  );
}

export default page;
