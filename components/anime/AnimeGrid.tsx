import type { Anime, AnimeGridProps } from "@/types";
import AnimeCard from "./AnimeCard";
import { Separator } from "../ui/separator";
import AnimePagination from "./AnimePagination";
import { EmptyState } from "../EmptyState";

function AnimeGrid({
  data,
  currentPage,
  totalPages,
  basePath,
}: AnimeGridProps) {
  if (!data || data.length === 0) return <EmptyState />;
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col items-center gap-4">
        <AnimePagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />
      </div>
    </>
  );
}

export default AnimeGrid;
