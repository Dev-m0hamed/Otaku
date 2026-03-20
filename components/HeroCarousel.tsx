import Link from "next/link";
import { CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { getYoutubeThumbnail, toSlug } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ClientCarousel } from "./ClientCarousel";
import type { Anime } from "@/types";

async function HeroCarousel() {
  const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming?limit=6", {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const data = json.data ?? [];
  return (
    <section className="px-7 md:pl-8 md:px-4 mt-3 mb-6">
      <div className="relative overflow-hidden rounded-lg">
        <ClientCarousel count={data.length}>
          <CarouselContent>
            {data.map((anime: Anime, i: number) => {
              const thumbnail = getYoutubeThumbnail(anime.trailer.embed_url);
              return (
                <CarouselItem
                  key={anime.mal_id}
                  className="basis-full relative h-87.5 md:h-100 lg:h-137.5 pl-8 md:pl-4"
                >
                  <Link
                    href={`/anime/${anime.mal_id}/${toSlug(anime.title_english ? anime.title_english : anime.title)}`}
                    className="absolute inset-0 z-30"
                    aria-label={`View details for ${anime.title}`}
                  />
                  <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 z-0">
                    <div className="hidden lg:block bg-background lg:col-span-1"></div>
                    <div className="relative h-full lg:col-span-2">
                      <Image
                        src={thumbnail || anime.images.jpg.large_image_url}
                        alt={anime.title}
                        fill
                        priority={i === 0}
                        quality={85}
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 -left-1 bg-linear-to-t lg:bg-linear-to-r from-background from-15% lg:from-1% via-background/90 via-30% lg:via-5% to-transparent to-70% lg:to-100%"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-0 lg:p-8 z-20 lg:col-span-2">
                      <div className="hidden lg:block w-48 h-72 shrink-0">
                        <div className="size-full overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] relative">
                          <Image
                            src={anime.images.jpg.large_image_url}
                            alt={anime.title}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover"
                            fill
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-end pb-9 lg:pb-0 lg:justify-center flex-1 md:max-lg:pl-4">
                        <div className="mb-3">
                          <Badge
                            variant="secondary"
                            className="bg-amber-400/90 text-black hover:bg-amber-400"
                          >
                            Upcoming
                          </Badge>
                        </div>
                        <h2 className="text-xl lg:text-4xl font-bold text-foreground max-sm:truncate lg:line-clamp-1 mr-4">
                          {anime.title}
                        </h2>
                        <div className="text-sm lg:text-base font-normal text-muted-foreground mt-1">
                          {anime.title_japanese}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {anime.genres.map((genre) => (
                            <Badge
                              key={genre.mal_id}
                              variant="ghost"
                              className="border-border"
                            >
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </ClientCarousel>
      </div>
    </section>
  );
}

export default HeroCarousel;
