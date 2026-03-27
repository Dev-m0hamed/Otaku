"use client";

import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";
import type { AddListProps, Anime } from "@/types";
import { addToFav } from "@/lib/actions/addToFav";
import { toast } from "sonner";
import { useState } from "react";

function AddToList({
  data,
  variant = "default",
  size,
  className,
  iconClass,
  isFav,
}: AddListProps) {
  const [fav, setFav] = useState(isFav);

  const handleAddToFav = async (data: Anime) => {
    const loadingToast = toast.loading(
      fav ? "Removing from favorites..." : "Adding to favorites...",
    );
    const res = await addToFav(data);
    toast.dismiss(loadingToast);
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      setFav(!fav);
    }
  };
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => handleAddToFav(data)}
    >
      <StarIcon className={`${iconClass} ${fav && "fill-yellow-400"}`} />
      {fav ? "Remove" : "Add To List"}
    </Button>
  );
}

export default AddToList;
