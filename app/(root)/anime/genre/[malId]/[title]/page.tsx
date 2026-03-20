import type { Metadata } from "next";
import type { PageProps } from "@/types";
import AnimeGrid from "@/components/anime/AnimeGrid";

export const metadata: Metadata = {
  title: "Anime by Genre",
  description: "Browse anime by genre",
};

async function page({ params, searchParams }: PageProps) {
  const { malId, title } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const genreName = title
    .replace(/%20/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const res = await fetch(
    `https://api.jikan.moe/v4/anime?genres=${malId}&page=${currentPage}&limit=24&order_by=members&sort=desc`,
    { next: { revalidate: 3600 } },
  );
  const json = await res.json();
  const data = json.data ?? [];
  const totalPages = json.pagination?.last_visible_page ?? 1;
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {`${genreName} Anime`}
        </h1>
        <p className="text-sm text-muted-foreground">{`Browse anime in the ${genreName} genre`}</p>
      </div>
      <AnimeGrid
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/anime/genre/${malId}/${title}`}
      />
    </section>
  );
}

export default page;
