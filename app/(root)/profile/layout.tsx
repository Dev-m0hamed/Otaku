import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect("/sign-up");
  }
  return (
    <section className="py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Favorite Anime</h1>
        <p className="text-sm text-muted-foreground">
          Browse All Your Favorite Anime
        </p>
      </div>
      <form
        className="flex justify-center mb-4"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="outline">
          <LogOut /> Sign Out
        </Button>
      </form>
      <Separator className="my-4" />
      {children}
    </section>
  );
}

export default layout;
