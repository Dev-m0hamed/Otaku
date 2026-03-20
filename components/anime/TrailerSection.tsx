import { EmptyState } from "@/components/EmptyState";

export function TrailerSection({
  trailer,
}: {
  trailer: { embed_url: string };
}) {
  if (!trailer?.embed_url) {
    return <EmptyState message="No trailer available." className="py-4" />;
  }

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={trailer.embed_url}
        title="Anime Trailer"
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
export default TrailerSection;
