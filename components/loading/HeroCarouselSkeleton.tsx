import { Skeleton } from "../ui/skeleton";

function HeroCarouselSkeleton() {
  return (
    <div className="px-7 md:pl-8 md:px-4 mt-3 mb-6 rounded-lg">
      <div className="basis-full relative h-87.5 md:h-100 lg:h-137.5 pl-8 md:pl-4">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 z-0">
          <div className="hidden lg:block bg-background lg:col-span-1"></div>
          <div className="relative h-full lg:col-span-2">
            <Skeleton className="size-full" />
            <div className="absolute inset-0 -left-1 bg-linear-to-t lg:bg-linear-to-r from-background from-15% lg:from-1% via-background/90 via-30% lg:via-5% to-transparent to-70% lg:to-100%"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-0 lg:p-8 z-20 lg:col-span-2">
            <div className="hidden lg:block w-48 h-72 shrink-0">
              <Skeleton className="w-full h-full rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
            </div>
          </div>
          <div className="flex flex-col justify-end pb-9 lg:pb-0 lg:justify-center flex-1 md:max-lg:pl-4">
            <div className="mb-3">
              <Skeleton className="h-5 w-16 rounded" />
            </div>
            <Skeleton className="h-4 lg:h-6 w-1/2 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-12 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarouselSkeleton;
