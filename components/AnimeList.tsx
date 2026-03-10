import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Calendar, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import type { Anime } from "@/types";

interface Props {
  title: string;
  description: string;
  url: string;
}

async function AnimeList({ title, description, url }: Props) {
const res = await fetch(url, { next: { revalidate: 3600 } });
const json = await res.json();
const data = json.data ?? [];
  return (
    <section className="mb-12 pr-4 lg:pr-8">
      <div className="flex items-center justify-between mb-6 pl-4 lg:pl-8">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Link href="#">
          <Button variant="outline" className="py-0 px-3">
            View All
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Carousel opts={{ align: "start", dragFree: true }}>
          <div className="flex items-center">
            <div className="hidden lg:block shrink-0">
              <CarouselPrevious className="bg-transparent relative size-12 translate-y-0 left-10 top-0 z-10 backdrop-blur-3xl cursor-pointer" />
            </div>
            <CarouselContent className="ml-0">
              {data.map((anime: Anime) => (
                <CarouselItem
                  key={anime.mal_id}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <Link
                    href="/"
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-14 h-[88%] bg-linear-to-r from-background to-transparent pointer-events-none rounded-l-lg"></div>
            <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-14 h-[88%] bg-linear-to-l from-background to-transparent pointer-events-none rounded-r-lg"></div>
            <div className="hidden lg:block shrink-0">
              <CarouselNext className="bg-transparent relative size-12 translate-y-0 right-6 top-0 z-10 backdrop-blur-3xl cursor-pointer" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default AnimeList;
