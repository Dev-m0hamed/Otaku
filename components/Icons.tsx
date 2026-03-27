"use client";

import { MessageSquare, Send, ThumbsUp, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  deleteComment,
  editComment,
  Like,
  postReply,
} from "@/lib/actions/postComment";
import { toast } from "sonner";
import type { IconsProps } from "@/types";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { intlFormatDistance } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function Icons({ com, isLiked, currentUser }: IconsProps) {
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const isOwner = currentUser === com.userId;
  const addLike = async (commentId: string, mal_id: number) => {
    const res = await Like(commentId, mal_id);
    if (!res?.success) toast.error(res?.message);
  };

  const handleReply = async (formData: FormData) => {
    const res = await postReply(com.id, com.mal_id, formData);
    if (!res?.success) {
      toast.error(res?.message);
    } else {
      toast.success("Reply posted!");
      setShowReply(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center">
        <Button
          onClick={() => addLike(com.id, com.mal_id)}
          variant="ghost"
          className={`flex items-center gap-1.5 rounded-full text-xs transition-colors ${isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <ThumbsUp className={`size-4 ${isLiked && "fill-current"}`} />
          <span>{com.commentLikes.length}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowReply(!showReply)}
          className="flex items-center gap-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="size-4" />
          <span>
            Reply {com.replies.length > 0 && `(${com.replies.length})`}
          </span>
        </Button>
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setShowEdit(true)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => deleteComment(com.id, com.mal_id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData) => {
              await editComment(com.id, com.mal_id, formData);
              setShowEdit(false);
            }}
          >
            <Textarea
              name="content"
              defaultValue={com.content}
              className="min-h-24 resize-none text-sm mb-4"
              autoFocus
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {showReply && (
        <form action={handleReply} className="mt-2 flex flex-col gap-2">
          <div className="relative">
            <Textarea
              name="content"
              placeholder="Write a reply..."
              className="min-h-16 resize-none text-sm pb-8"
              autoFocus
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => setShowReply(false)}
              >
                <X className="size-3.5" />
              </Button>
              <Button type="submit" size="sm" className="gap-1 h-7 text-xs">
                <Send className="size-3.5" />
                Reply
              </Button>
            </div>
          </div>
        </form>
      )}

      {com.replies.length > 0 && (
        <div className="mt-3 space-y-3 pl-4 border-l-2 border-border/40">
          {com.replies.map((reply: typeof com.replies[0]) => (
            <div key={reply.id} className="flex gap-2">
              <Avatar className="size-7 shrink-0">
                <AvatarImage src={reply.user.image ?? undefined} />
                <AvatarFallback className="text-[10px]">
                  {getInitials(reply.user.name ?? "CN")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-xs">
                    {reply.user.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {intlFormatDistance(new Date(reply.createdAt), new Date())}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/90 leading-relaxed wrap-break-word">
                  {reply.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Icons;
