import Image from "next/image";
import { Calendar, Clock, Star } from "lucide-react";
import Link from "next/link";
import type { Anime } from "@/types";
import { toSlug } from "@/lib/utils";

function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link
      href={`/anime/${anime.mal_id}/${toSlug(anime.title_english ? anime.title_english : anime.title)}`}
      className="group transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-full h-auto aspect-2/3 flex flex-col">
        <div className="size-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl relative">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-amber-500/90 text-black text-xs font-bold flex items-center z-10 px-2 py-1 rounded">
            <Star className="size-3 mr-1" />
            {anime.score}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center">
            <Clock className="size-3 mr-1" />
            {anime.episodes} eps
          </div>
        </div>
        <div className="pt-2">
          <h3 className="font-medium leading-tight text-sm truncate line-clamp-2 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          <div className=" flex items-center mt-1 text-xs text-muted-foreground">
            <Calendar className="size-3 mr-1" />
            <span>{anime.year || "TBA"}</span>
            <span className="mx-1">•</span>
            <span>{anime.type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
