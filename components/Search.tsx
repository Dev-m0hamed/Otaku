"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ForwardedRef } from "react";

function Search({ ref }: { ref?: ForwardedRef<HTMLInputElement> }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("query", val);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex-1 max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="py-4 pl-10 pr-3 placeholder:text-muted-foreground"
        placeholder="Search anime..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        ref={ref}
      />
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export default Search;
