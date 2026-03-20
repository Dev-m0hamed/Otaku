"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Search, LogIn, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Header({ session }: { session: Session | null }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/anime?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchVisible(false);
    }
  };
  return (
    <header className="w-full bg-background">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <div className="w-33.75 h-10 flex items-center justify-center">
            <span className="font-bold text-4xl text-foreground font-[Poppins]">
              OTAKU
            </span>
          </div>
        </Link>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search className="size-5" />
          </Button>
          <ThemeToggle />
          {session ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => signOut()}
              aria-label="logout"
            >
              <LogOut className="size-4" />
            </Button>
          ) : (
            <Button variant="outline" asChild size="icon">
              <Link href="/sign-up" aria-label="sign up">
                <LogIn />
              </Link>
            </Button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 min-w-lg">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <ThemeToggle />
          {session ? (
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/sign-up">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {isSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
