const BASE = "https://api.jikan.moe/v4/genres/anime";

export async function getGenres() {
  const [genres, explicitGenres, themes, demographics] = await Promise.all([
    fetch(`${BASE}?filter=genres`, {
      next: { revalidate: 3600 },
    }).then((r) => r.json()),

    fetch(`${BASE}?filter=explicit_genres`, {
      next: { revalidate: 3600 },
    }).then((r) => r.json()),

    fetch(`${BASE}?filter=themes`, {
      next: { revalidate: 3600 },
    }).then((r) => r.json()),

    fetch(`${BASE}?filter=demographics`, {
      next: { revalidate: 3600 },
    }).then((r) => r.json()),
  ]);

  return {
    genres: genres.data,
    themes: themes.data,
    demographics: demographics.data,
  };
}