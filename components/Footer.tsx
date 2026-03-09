import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Otaku Hub</h3>
            <p className="text-muted-foreground text-sm">
              Your ultimate anime tracking platform with comprehensive content
              discovery and personalized recommendations.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link
                href="https://github.com/Dev-m0hamed"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github />
              </Link>
              <Link
                href="https://github.com/Dev-m0hamed"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-normal md:items-center justify-normal md:justify-around colspan-1 md:col-span-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Anime
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Ongoing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Browse</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Most Popular
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Currently Airing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Movies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="-mx-4">
          <Separator className="my-8" />
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Otaku Hub. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Powered by{" "}
            <Link href="https://jikan.moe/" className="underline">
              Jikan API
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
