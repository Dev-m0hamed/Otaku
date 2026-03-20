import { FilterTabs } from "@/components/anime/FilterTabs";
import type { PageProps } from "@/types";
import AnimeGrid from "@/components/anime/AnimeGrid";

async function page({ params, searchParams }: PageProps) {
  const { year, season } = await params;
  const typeFilter = (await searchParams)?.type || "";
  const currentPage = parseInt((await searchParams)?.page || "1");

  const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${currentPage}&limit=24${typeFilter ? `&filter=${typeFilter}` : ""}`;

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  const json = await res.json();
  const data = json.data ?? [];
  const totalPages = json.pagination?.last_visible_page ?? 1;
  return (
    <>
      <FilterTabs
        typeFilter={typeFilter}
        basePath={`/anime/season/${year}/${season}`}
      />
      <AnimeGrid
        key={typeFilter}
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/anime/season/${year}/${season}`}
      />
    </>
  );
}

export default page;
