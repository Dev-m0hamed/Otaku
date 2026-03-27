import { Relations } from "@/types";
import Link from "next/link";
import { EmptyState } from "../EmptyState";

function RelatedAnimeSection({ relations }: Relations) {
  const animeRelations = relations?.filter((relation) =>
    relation.entry.some((e) => e.type !== "manga"),
  );
  if (!animeRelations || animeRelations.length === 0) {
    return <EmptyState message="No related anime available." />;
  }
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {animeRelations.map((relation, i) => (
        <div
          key={`${relation.relation}-${i}`}
          className="bg-muted/50 rounded-md p-2 sm:p-3"
        >
          <div className="text-sm sm:text-base font-medium">
            {relation.relation}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {relation.entry.map((entry, j) => (
              <span key={entry.mal_id}>
                {j > 0 ? ", " : ""}
                <Link
                  href={`/anime/${entry.mal_id}/${entry.name}`}
                  className="hover:text-primary transition-colors"
                >
                  {entry.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RelatedAnimeSection;
