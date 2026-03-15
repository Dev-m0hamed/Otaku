"use client";

import Link from "next/link";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Search as SearchIcon, LogIn, LogOut } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

function Header({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);
  return (
    <header className="w-full bg-background">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <Link className="text-4xl font-bold text-foreground" href="/">
          OTAKU
        </Link>
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            <SearchIcon className="size-4" />
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
          <Search />
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
      <div className={`md:hidden px-4 pb-4 ${isOpen ? "block" : "hidden"}`}>
        <Search ref={searchRef} />
      </div>
    </header>
  );
}

export default Header;
