import { Anime } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Calendar, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { getStatusColor } from "@/lib/utils";
import Link from "next/link";
import AnimeSidebar from "./AnimeSidebar";
import AnimeContentSections from "./AnimeContentSections";

function AnimeHeroSection({ data }: { data: Anime }) {
  const statusColor = getStatusColor(data.status);
  const stats = [
    {
      label: "Score",
      value: (
        <span className="flex items-center gap-1">
          {data.score} <StarIcon className="h-4 w-4 text-yellow-500" />
        </span>
      ),
      sub: data.scored_by ? `${data.scored_by.toLocaleString()} users` : null,
      show: !!data.score,
    },
    {
      label: "Ranked",
      value: `#${data.rank}`,
      show: !!data.rank,
    },
    {
      label: "Popularity",
      value: `#${data.popularity}`,
      show: !!data.popularity,
    },
    {
      label: "Members",
      value: data.members?.toLocaleString(),
      show: !!data.members,
    },
  ];
  return (
    <>
      <section className="w-full min-h-100 md:min-h-125 lg:min-h-150 relative overflow-hidden bg-linear-to-b from-background/60 via-background/80 to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 scale-110 hover:scale-125 transition-transform duration-[10s] ease-linear">
            <Image
              src={data.images.jpg.large_image_url}
              alt={data.title}
              fill
              priority={true}
              className="object-cover opacity-25 blur-[10px]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20"></div>
        <div className="absolute inset-0 bg-linear-to-r from-background/90 to-transparent" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
        <div className="px-4 h-full relative z-10">
          <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
            <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
              <div className="flex flex-col items-center gap-2">
                <div className="h-45 w-32.5 sm:h-52.5 sm:w-37.5 lg:h-62.5 lg:w-45 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]">
                  <Image
                    src={data.images.jpg.large_image_url}
                    alt={data.title}
                    width={260}
                    height={360}
                    priority={true}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div className="hidden sm:block w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    <StarIcon className="h-3.5 w-3.5 mr-1.5" />
                    Add To List
                  </Button>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left max-w-full">
                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm px-2.5 py-0.5 font-medium border rounded-md"
                  >
                    {data.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${statusColor} text-xs sm:text-sm px-2.5 py-0.5 font-medium border rounded-md`}
                  >
                    {data.status.includes("Currently") ? "Airing" : data.status}
                  </Badge>
                  {data.status.includes("Currently") && data.broadcast.day && (
                    <Badge
                      variant="outline"
                      className="text-xs sm:text-sm px-2.5 py-0.5 font-medium border bg-purple-500/20 text-purple-700 border-purple-500/30 rounded-md"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {data.broadcast.day}
                    </Badge>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-2 mb-1 sm:mb-2 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/90">
                  {data.title_english ? data.title_english : data.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90 line-clamp-1 mb-2 min-h-4 sm:min-h-5 md:min-h-6">
                  {data.title_japanese}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
                  {data.score && (
                    <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs">
                      <StarIcon className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
                      <span className="font-medium">{data.score}</span>
                    </div>
                  )}
                  {data.season && (
                    <Link
                      href={`/anime/season/${data.year}/${data.season}`}
                      className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs"
                    >
                      <span className="font-medium capitalize">
                        {data.season} {data.year}
                      </span>
                    </Link>
                  )}
                  {data.studios?.map((studio) => (
                    <Link
                      key={studio.mal_id}
                      href={studio.url}
                      className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs"
                    >
                      <span>{studio.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {stats
                    .filter((s) => s.show)
                    .map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center"
                      >
                        <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">
                          {stat.label}
                        </div>
                        <div className="font-bold text-lg sm:text-xl">
                          {stat.value}
                        </div>
                        {stat.sub && (
                          <div className="text-xs text-muted-foreground/60 mt-0.5 text-center">
                            {stat.sub}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex sm:hidden">
                  <Button className="w-full">
                    <StarIcon className="h-4 w-4 mr-2" />
                    Add To List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-8 sm:pb-10 px-4 mt-0 md:-mt-24 lg:-mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <AnimeSidebar data={data} />
          </div>
          <div className="lg:col-span-3">
            <AnimeContentSections data={data} />
          </div>
        </div>
      </section>
    </>
  );
}

export default AnimeHeroSection;
