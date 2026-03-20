import Link from "next/link";
import { Button } from "./ui/button";
import { Genre } from "@/types";

function GenreCategories({
  genres,
  themes,
  demographics,
}: {
  genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
}) {
  const renderGenreSection = (title: string, genreList: Genre[]) => {
    if (!genreList) return null;
    return (
      <div className="border border-primary-foreground p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex items-center justify-start flex-wrap gap-2">
          {genreList.map((genre) => (
            <Link
              key={genre.mal_id}
              href={`/anime/genre/${genre.mal_id}/${genre.name}`}
            >
              <Button
                variant="secondary"
                size="sm"
                className="text-xs uppercase cursor-pointer"
              >
                {genre.name} ({genre.count})
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="p-4 space-y-6">
      {renderGenreSection("Genres", genres)}
      {renderGenreSection("Themes", themes)}
      {renderGenreSection("Demographics", demographics)}
    </div>
  );
}

export default GenreCategories;
