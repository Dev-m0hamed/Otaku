import { Anime } from "@/types";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    {children}
  </div>
);
const InfoValue = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-right">{children}</span>
);

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="py-3">
      <span className="text-sm font-semibold text-foreground/90">{title}</span>
      <div className="mt-1.5 space-y-2">{children}</div>
    </div>
  );
};

const BadgeList = <T,>({
  items,
  renderBadge,
  className = "flex flex-wrap gap-1.5 justify-end",
}: {
  items: T[];
  renderBadge: (item: T) => React.ReactNode;
  className?: string;
}) => <div className={className}>{items?.map(renderBadge)}</div>;

function AnimeSidebar({ data }: { data: Anime }) {
  return (
    <Card className="py-0 shadow-lg border-border/40">
      <CardContent className="p-4 space-y-0 divide-y divide-border/60">
        <SidebarSection title="Alternative Titles">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground/80 font-medium block">
              Japanese
            </span>
            <div className="font-japanese text-sm">{data.title_japanese}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground/80 font-medium block">
              Synonyms
            </span>
            <div className="space-y-0.5">
              <div className="text-sm">{data.title_synonyms[0]}</div>
            </div>
          </div>
        </SidebarSection>
        <SidebarSection title="Basic Info">
          <InfoRow label="Status">
            <InfoValue>{data.status || "N/A"}</InfoValue>
          </InfoRow>
          <InfoRow label="Episodes">
            <InfoValue>{data.episodes || "?"}</InfoValue>
          </InfoRow>
          {data.rating && (
            <InfoRow label="Age Rating">
              <InfoValue>{data.rating}</InfoValue>
            </InfoRow>
          )}
          {data.season && (
            <InfoRow label="Season">
              <InfoValue>
                {data.season} {data.year}
              </InfoValue>
            </InfoRow>
          )}
          {data.aired?.string && (
            <InfoRow label="Aired">
              <InfoValue>{data.aired.string}</InfoValue>
            </InfoRow>
          )}
          {data.duration && (
            <InfoRow label="Duration">
              <InfoValue>{data.duration}</InfoValue>
            </InfoRow>
          )}
          {data.broadcast?.string && (
            <InfoRow label="Broadcast">
              <InfoValue>{data.broadcast.string}</InfoValue>
            </InfoRow>
          )}
        </SidebarSection>
        <SidebarSection title="Credits">
          {data.studios?.length > 0 && (
            <InfoRow label="Studio">
              <BadgeList
                items={data.studios}
                renderBadge={(studio) => (
                  <span key={studio.mal_id} className="font-medium">
                    {studio.name}
                  </span>
                )}
              />
            </InfoRow>
          )}
        </SidebarSection>
        <SidebarSection title="Details">
          <InfoRow label="Source">
            <InfoValue>{data.source || "N/A"}</InfoValue>
          </InfoRow>
          {data.genres?.length > 0 && (
            <InfoRow label="Genres">
              <BadgeList
                items={data.genres}
                renderBadge={(genre) => (
                  <Link
                    key={genre.mal_id}
                    href={`/anime/genre/${genre.mal_id}/${genre.name}`}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
                    >
                      {genre.name}
                    </Badge>
                  </Link>
                )}
              />
            </InfoRow>
          )}
        </SidebarSection>
        <SidebarSection title="Statistics">
          <InfoRow label="Rank">
            <InfoValue>#{data.rank}</InfoValue>
          </InfoRow>

          <InfoRow label="Popularity">
            <InfoValue>#{data.popularity}</InfoValue>
          </InfoRow>

          <InfoRow label="Members">
            <InfoValue>{data.members}</InfoValue>
          </InfoRow>

          <InfoRow label="Favorites">
            <InfoValue>{data.favorites}</InfoValue>
          </InfoRow>
        </SidebarSection>
      </CardContent>
    </Card>
  );
}

export default AnimeSidebar;
