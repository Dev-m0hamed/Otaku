import SearchInput from "../SearchInput";
import type { PageProps } from "@/types";
import GenreCategories from "@/components/GenreCategories";
import AnimeSearchResults from "./AnimeSearchResults";
import { getGenres } from "@/lib/genre";
import { searchAnime } from "@/lib/searchAnime";
import Link from "next/link";
import { Button } from "../ui/button";

async function AnimePageContent({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const searchQuery = resolvedSearchParams?.q || "";
  const genre = await getGenres();
  const { data, totalPages } = await searchAnime(searchQuery, currentPage);
  const allGenres = [...genre.genres, ...genre.themes, ...genre.demographics];
  return (
    <>
      <section className="py-8 sm:py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search: ${searchQuery}` : "Anime List"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse all anime series, movies, and specials from extensive collection"}
          </p>
        </div>
        <SearchInput
          defaultValue={searchQuery}
          basePath="/anime"
          placeholder="Search anime titles..."
          autoFocus={true}
        />
        {searchQuery ? (
          <AnimeSearchResults
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
          />
        ) : (
          <GenreCategories {...genre} />
        )}
      </section>
      {searchQuery && (
        <section className="pb-8 sm:pb-10 px-4">
          <div className="border border-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-center flex-wrap gap-2">
              {allGenres.map((gen) => (
                <Link
                  key={gen.mal_id}
                  href={`/anime/genre/${gen.mal_id}/${gen.name}`}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs cursor-pointer uppercase"
                  >
                    {gen.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AnimePageContent;
