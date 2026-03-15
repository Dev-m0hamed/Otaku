import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "./ui/button";
import type { Anime } from "@/types";
import AnimeCard from "./AnimeCard";

interface Props {
  title: string;
  description: string;
  url: string;
}

async function AnimeList({ title, description, url }: Props) {
  const res = await fetch(url);
  const { data } = await res.json();
  return (
    <section className="mb-12 pr-4 lg:pr-8">
      <div className="flex items-center justify-between mb-6 pl-4 lg:pl-8">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Link href="/anime/top">
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
                  <AnimeCard anime={anime} />
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
