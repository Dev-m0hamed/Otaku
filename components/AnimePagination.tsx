import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AnimePaginationProps {
  currentPage: number;
  totalPages: number;
  type?: string;
}

function AnimePagination({
  currentPage,
  totalPages,
  type,
}: AnimePaginationProps) {
  const basePath = type ? `/anime/top/${type}` : "/anime/top";
  const getPageUrl = (p: number) => `${basePath}?page=${p}`;

  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];

  pages.push(1);
  if (currentPage > 3) pages.push("ellipsis");
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p > 1 && p < totalPages) pages.push(p);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={getPageUrl(p)} isActive={p === currentPage}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default AnimePagination;
