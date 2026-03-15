import { Skeleton } from "../ui/skeleton";

function AnimeListSkeleton() {
  return (
    <div className="mb-12 pr-4 lg:pr-8">
      <div className="flex items-center justify-between mb-6 pl-4 lg:pl-8">
        <div>
          <Skeleton className="w-48 h-9" />
          <Skeleton className="w-50 h-6 mt-2" />
        </div>
        <Skeleton className="w-20 h-9" />
      </div>
      <div className="relative">
      <div className="flex items-center gap-4">
        <div className="hidden lg:block shrink-0">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 shrink-0">
                <div className="w-full h-auto aspect-2/3 flex flex-col">
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative">
                    <Skeleton className="w-full h-full" />
                    <div className="absolute top-2 right-2">
                      <Skeleton className="h-5 w-10 rounded" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Skeleton className="h-4 w-full mb-1" />
                    <div className="flex items-center mt-1 space-x-1">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-3 w-1 rounded-full" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
        </div>

        <div className="hidden lg:block shrink-0">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default AnimeListSkeleton;
