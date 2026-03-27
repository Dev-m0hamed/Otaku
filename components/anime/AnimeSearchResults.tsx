import { Anime } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import AnimePagination from "./AnimePagination";
import { toSlug } from "@/lib/utils";

function AnimeSearchResults({
  data,
  currentPage,
  totalPages,
  searchQuery,
}: {
  data: Anime[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No anime found matching your search.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="space-y-3">
        {data.map((anime) => (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}/${toSlug(anime.title_english ? anime.title_english : anime.title)}`}
            className="group block p-4 border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-muted relative">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {anime.title}
                </h3>

                <div className="mt-2 space-y-1">
                  <div className="text-xs text-muted-foreground">
                    {anime.episodes
                      ? `${anime.type || "TV"} (${anime.episodes} eps)`
                      : anime.type || "TV"}
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    <span>{anime.score || "N/A"}</span>
                  </div>

                  {anime.members && (
                    <div className="text-xs text-muted-foreground">
                      {anime.members.toLocaleString()} members
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Separator className="my-8" />
      <AnimePagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/anime"
        queryParams={searchQuery}
      />
    </>
  );
}

export default AnimeSearchResults;
