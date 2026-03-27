import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface Anime extends Relations{
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
  scored_by: number;
  rank: number;
  popularity: number;
  title_synonyms: [string];
  title_english: string;
  rating: string;
  aired: { string: string };
  duration: string;
  source: string;
  favorites: number;
  synopsis: string;
}

interface Relations {
  relations: {
    relation: string;
    entry: { mal_id: number; type: string; name: string }[];
  }[];
}

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
  image?: string;
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

interface AddListProps {
  data: Anime;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
  className: string;
  iconClass: string;
  isFav: boolean | undefined;
}

interface IconsProps {
  com: Comments & {
    commentLikes: CommentLike[];
    replies: (Comments & { user: User })[];
  };
  isLiked: boolean;
  currentUser?: string;
}
