import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AnimeTypeInfo } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYoutubeThumbnail(embedUrl: string): string | null {
  if (!embedUrl) return null;

  const match = embedUrl.match(/embed\/([^?]+)/);
  if (!match) return null;

  const youtubeId = match[1];
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function getCurrentSeason(): { year: number; season: string } {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const season =
    month <= 3
      ? "winter"
      : month <= 6
        ? "spring"
        : month <= 9
          ? "summer"
          : "fall";

  return { year, season };
}

export function getAnimeTitle(type: string | undefined): AnimeTypeInfo {
  switch (type) {
    case "all":
      return {
        title: "Top Anime",
        description: "Discover the highest-rated anime of all time",
      };
    case "tv":
      return {
        title: "Top TV Series",
        description: "Best television anime series ranked by ratings",
      };
    case "movie":
      return {
        title: "Top Movies",
        description: "Highest-rated anime movies and films",
      };
    case "ova":
      return {
        title: "Top OVA",
        description: "Best Original Video Animation releases",
      };
    case "ona":
      return {
        title: "Top ONA",
        description: "Top-rated Original Net Animation series",
      };
    case "special":
      return {
        title: "Top Specials",
        description: "Best anime specials and one-shots",
      };
    case "airing":
      return {
        title: "Top Airing",
        description: "Currently airing anime ranked by popularity",
      };
    case "upcoming":
      return {
        title: "Most Anticipated",
        description: "Upcoming anime with highest anticipation",
      };
    case "bypopularity":
      return {
        title: "Most Popular",
        description: "Anime ranked by member count and popularity",
      };
    case "favorite":
      return {
        title: "Most Favorited",
        description: "Anime with the most user favorites",
      };
    default:
      return {
        title: "Top Anime",
        description: "Explore the best anime collections",
      };
  }
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "finished airing":
      return "bg-green-500/20 text-green-700 border-green-500/30";
    case "currently airing":
      return "bg-blue-500/20 text-blue-700 border-blue-500/30";
    case "not yet aired":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
    default:
      return "bg-muted/20 text-muted-foreground border-muted/30";
  }
}

export function toSlug(name: string) {
  if (!name) return;
  return encodeURIComponent(name.replace(/\s+/g, "_"));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
