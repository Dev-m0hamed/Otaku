import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface Anime {
  mal_id: number;
  title: string;
  title_japanese: string;
  images: { jpg: { large_image_url: string } };
  score: number;
  episodes: number;
  year: number;
  type: string;
  trailer: { embed_url: string };
  status: string;
  genres: { mal_id: number; name: string }[];
  members?: number;
  studios: { mal_id: number; name: string; url: string }[];
  broadcast: { day: string; string: string };
  season: string;
  year: string;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  title_synonyms: [string];
  title_english: string;
  rating: string;
  aired: { string: string };
  duration: string;
  source: string;
  favorites: number;
  synopsis: string;
}

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
}

interface AnimeTypeInfo {
  title: string;
  description: string;
}

interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}

interface Genre {
  mal_id: number;
  name: string;
  count: number;
}

interface AnimeGridProps {
  data: Anime[];
  currentPage: number;
  totalPages: number;
  basePath: string;
}
