import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      <Separator className="mt-2" />
      <main className="mx-auto pb-12">{children}</main>
      <Footer/>
    </>
  );
}

export default layout;