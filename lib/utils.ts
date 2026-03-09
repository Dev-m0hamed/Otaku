import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
