"use server";

import { auth } from "@/auth";
import prisma from "../prisma";
import { Anime } from "@/types";
import { revalidatePath } from "next/cache";

export async function addToFav(data: Anime) {
  const session = await auth();
  if (!session?.user.id) {
    return { success: false, message: "Please sign in to add favorites" };
  }

  const existing = await inFav(data.mal_id);
  if (existing) {
    await prisma.favorite.delete({
      where: {
        mal_id_userId: {
          mal_id: data.mal_id,
          userId: session.user.id,
        },
      },
    });
    revalidatePath("/profile");
    revalidatePath(`/anime/${data.mal_id}`);
    return { success: true, message: "Removed from favorites" };
  } else {
    await prisma.favorite.create({
      data: {
        mal_id: data.mal_id,
        userId: session.user.id,
        images: data.images.jpg.large_image_url,
        title_english: data.title_english,
        title: data.title,
        score: data.score,
        episodes: data.episodes,
        year: data.year,
        type: data.type,
      },
    });
    revalidatePath(`/anime/${data.mal_id}`);
    return { success: true, message: "Added successfully" };
  }
}

export async function inFav(mal_id: number) {
  const session = await auth();
  if (!session?.user.id) return;
  const existing = await prisma.favorite.findUnique({
    where: {
      mal_id_userId: {
        mal_id,
        userId: session.user.id,
      },
    },
  });
  if (existing) return true;
}
