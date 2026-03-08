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
}

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
}