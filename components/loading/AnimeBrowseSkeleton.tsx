import { Skeleton } from "../ui/skeleton";

function AnimeBrowseSkeleton() {
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="border border-primary-foreground p-4 rounded-lg">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex items-center justify-start flex-wrap gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded" />
            ))}
          </div>
        </div>

        <div className="border border-primary-foreground p-4 rounded-lg">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex items-center justify-start flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded" />
            ))}
          </div>
        </div>

        <div className="border border-primary-foreground p-4 rounded-lg">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex items-center justify-start flex-wrap gap-2">
            {Array.from({ length: 42 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded" />
            ))}
          </div>
        </div>

        <div className="border border-primary-foreground p-4 rounded-lg">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex items-center justify-start flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimeBrowseSkeleton;
