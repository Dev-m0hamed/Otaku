export async function searchAnime(q: string, page: number) {
  if (!q?.trim()) return { data: [], totalPages: 0 };

  const res = await fetch(
    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&page=${page}&limit=24`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) return { data: [], totalPages: 0 };

  const json = await res.json();

  return {
    data: json.data || [],
    totalPages: json.pagination?.last_visible_page || 1,
  };
}
