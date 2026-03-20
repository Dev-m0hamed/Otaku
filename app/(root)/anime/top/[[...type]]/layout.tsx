import { getAnimeTitle } from "@/lib/utils";
import { TopAnimeNavigation } from "@/components/anime/TopAnimeNavigation";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type?: string[] }>;
}) {
  const resolvedParams = await params;
  const type = resolvedParams?.type?.[0] || "all";
  const titleData = getAnimeTitle(type);
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {titleData.title}
        </h1>
        <p className="text-sm text-muted-foreground">{titleData.description}</p>
      </div>
      <TopAnimeNavigation currentType={type} />
      {children}
    </section>
  );
}

export default layout;
