import AnimeHeroSection from "@/components/anime/AnimeHeroSection";
import type { PageProps } from "@/types";
import { notFound } from "next/navigation";

async function page({ params }: PageProps) {
  const { malId } = await params;
  const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}/full`, {
    next: { revalidate: 3600 },
  });
  const {data} = await res.json();
  if (!data) notFound();
  return <AnimeHeroSection data={data} />;
}

export default page;
