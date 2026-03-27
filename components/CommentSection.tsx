import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { auth } from "@/auth";
import { getInitials } from "@/lib/utils";
import { post } from "@/lib/actions/postComment";
import prisma from "@/lib/prisma";
import { intlFormatDistance } from "date-fns";
import Icons from "./Icons";

async function CommentSection({ mal_id }: { mal_id: number }) {
  const session = await auth();
  const currentUser = session?.user.id;
  const comments = await prisma.comments.findMany({
    where: { mal_id, parentId: null },
    include: {
      user: true,
      commentLikes: true,
      replies: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? undefined} />
          <AvatarFallback>
            {getInitials(session?.user?.name ?? "CN")}
          </AvatarFallback>
        </Avatar>
        <form
          className="flex-1"
          action={async (formData) => {
            "use server";
            await post(mal_id, formData);
          }}
        >
          <div className="relative">
            <Textarea
              name="content"
              placeholder="Share your thoughts about this anime..."
              className="min-h-24 resize-none text-sm pb-10"
            />
            <div className="absolute bottom-2 right-2">
              <Button type="submit" size="sm" className="gap-1 h-7 text-xs">
                <Send className="size-3.5" />
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="max-h-100 overflow-y-auto mt-4 space-y-5 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground">
        {comments.map((com) => (
          <div key={com.id} className="flex gap-3 min-w-0">
            <Avatar className="shrink-0">
              <AvatarImage src={com.user.image ?? undefined} />
              <AvatarFallback>
                {getInitials(com.user.name ?? "CN")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-xs">{com.user.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {intlFormatDistance(new Date(com.createdAt), new Date())}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/90 leading-relaxed wrap-break-word">
                {com.content}
              </p>
              <Icons
                com={com}
                isLiked={com.commentLikes.some(
                  (like) => like.userId === session?.user.id,
                )}
                currentUser={currentUser}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentSection;
