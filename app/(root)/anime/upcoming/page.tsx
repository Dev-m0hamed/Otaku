import AnimeGrid from "@/components/anime/AnimeGrid";
import { PageProps } from "@/types";

async function page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const url = `https://api.jikan.moe/v4/seasons/upcoming?page=${currentPage}&limit=24`;
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  const json = await res.json();
  const data = json.data ?? [];
  const totalPages = json.pagination?.last_visible_page ?? 1;
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Upcoming Anime</h1>
        <p className="text-sm text-muted-foreground">
          Discover anime that will be released soon
        </p>
      </div>
      <AnimeGrid
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={"/anime/upcoming"}
      />
    </section>
  );
}

export default page;
