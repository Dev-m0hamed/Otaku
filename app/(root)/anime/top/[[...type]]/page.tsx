import AnimeCard from "@/components/AnimeCard";
import Pagination from "@/components/AnimePagination";
import { Separator } from "@/components/ui/separator";
import { Anime } from "@/types";

const FILTERS = ["airing", "upcoming", "bypopularity", "favorite"];
const TYPES = ["tv", "movie", "ova", "ona", "special"];

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const type = resolvedParams?.type?.[0];
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;

  const filter = FILTERS.includes(type) ? type : undefined;
  const animeType = TYPES.includes(type) ? type : undefined;

  const url = new URL("https://api.jikan.moe/v4/top/anime");
  url.searchParams.set("page", String(currentPage));
  url.searchParams.set("limit", "24");
  if (filter) url.searchParams.set("filter", filter);
  if (animeType) url.searchParams.set("type", animeType);
  
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  const json = await res.json();
  const data = json.data ?? [];
  const totalPages = json.pagination?.last_visible_page ?? 1;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col items-center gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          type={type}
        />
      </div>
    </>
  );
}

export default page;
