"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Carousel } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useCallback, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function ClientCarousel({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goToSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <>
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={(api) => setApi(api ?? null)}
        className="w-full"
      >
        {children}
      </Carousel>
      {typeof count === "number" && count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: count }).map((_, i) => (
            <Button
              key={i}
              variant="ghost"
              className={cn(
                "w-2 h-2 p-0 rounded-full transition-all",
                i === current
                  ? "bg-primary w-6"
                  : "bg-primary/40 hover:bg-primary/30",
              )}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}
