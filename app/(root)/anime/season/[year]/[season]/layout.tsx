import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  params: Promise<{ [key: string]: string }>;
}

async function layout({ children, params }: Props) {
  const { year, season } = await params;
  const seasonTitle = `${season.charAt(0).toUpperCase() + season.slice(1)} ${year} Anime`;
  const seasons = ["winter", "spring", "summer", "fall"];
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">{seasonTitle}</h1>
        <p className="text-sm text-muted-foreground">
          {`Anime from ${season} ${year} season`}
        </p>
      </div>
      <div className="mb-6">
        <nav className="flex items-center justify-center gap-2">
          {seasons.map((s) => (
            <Button
              key={s}
              variant={`${s === season ? "default" : "ghost"}`}
              asChild
            >
              <Link href={`/anime/season/2026/${s}`} className="capitalize">
                {s}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <Separator className="my-4" />
      {children}
    </section>
  );
}

export default layout;
