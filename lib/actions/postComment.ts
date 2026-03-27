"use server";

import { auth } from "@/auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function post(mal_id: number, formData: FormData) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return;
  const content = formData.get("content") as string;
  if (!content?.trim()) return;
  await prisma.comments.create({
    data: {
      content,
      mal_id,
      userId,
    },
  });
  revalidatePath(`/anime/${mal_id}`);
}

export async function Like(commentId: string, mal_id: number) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return { success: false, message: "Please sign in" };
  }
  const existingLike = await prisma.commentLike.findUnique({
    where: { userId_commentId: { commentId, userId } },
  });
  if (existingLike) {
    await prisma.commentLike.delete({
      where: { userId_commentId: { commentId, userId } },
    });
  } else {
    await prisma.commentLike.create({
      data: { userId, commentId },
    });
  }
  revalidatePath(`/anime/${mal_id}`);
  return { success: true };
}

export async function postReply(
  commentId: string,
  mal_id: number,
  formData: FormData,
) {
  const session = await auth();
  if (!session?.user.id) return { success: false, message: "Please sign in" };

  const content = formData.get("content") as string;
  if (!content?.trim()) return;

  await prisma.comments.create({
    data: {
      content,
      userId: session.user.id,
      mal_id,
      parentId: commentId,
    },
  });

  revalidatePath(`/anime/${mal_id}`);
  return { success: true };
}

export async function deleteComment(commentId: string, mal_id: number) {
  await prisma.comments.delete({
    where: { id: commentId },
  });
  revalidatePath(`/anime/${mal_id}`);
}

export async function editComment(
  commentId: string,
  mal_id: number,
  formData: FormData,
) {
  const content = formData.get("content") as string;
  if (!content?.trim()) return;

  await prisma.comments.update({
    where: { id: commentId },
    data: { content },
  });

  revalidatePath(`/anime/${mal_id}`);
}
