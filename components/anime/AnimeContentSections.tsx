import { Anime } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TrailerSection from "./TrailerSection";
import CommentSection from "../CommentSection";
import RelatedAnimeSection from "./RelatedAnimeSection";

function CardSection({
  title,
  titleColor = "bg-primary",
  children,
}: {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/40">
      <CardHeader className="-mt-2 -mb-4">
        <CardTitle className="tracking-tight flex items-center justify-between text-lg sm:text-xl">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-5 rounded-full mr-1.5 ${titleColor}`}
            ></span>
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function AnimeContentSections({ data }: { data: Anime }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <CardSection title="Synopsis">
        <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
          {data.synopsis || "No synopsis available."}
        </p>
      </CardSection>
      <CardSection title="Trailer" titleColor="bg-red-500">
        <TrailerSection trailer={data.trailer} />
      </CardSection>
      <CardSection title="Comments">
        <CommentSection mal_id={data.mal_id} />
      </CardSection>
      <CardSection title="Related Anime">
        <RelatedAnimeSection relations={data.relations} />
      </CardSection>
    </div>
  );
}

export default AnimeContentSections;
