import AnimeGrid from "@/components/anime/AnimeGrid";
import { PageProps } from "@/types";

const FILTERS = ["airing", "upcoming", "bypopularity", "favorite"];
const TYPES = ["tv", "movie", "ova", "ona", "special"];

async function page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const type = resolvedParams?.type?.[0];
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;

  const filter = FILTERS.includes(type) ? type : undefined;
  const animeType = TYPES.includes(type) ? type : undefined;

  const url = `https://api.jikan.moe/v4/top/anime?page=${currentPage}&limit=24${filter ? `&filter=${filter}` : ""}${animeType ? `&type=${animeType}` : ""}`;

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  const json = await res.json();
  const data = json.data ?? [];
  const totalPages = json.pagination?.last_visible_page ?? 1;

  return (
    <AnimeGrid
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={type === "all" ? "/anime/top" : `/anime/top/${type}`}
    />
  );
}

export default page;
