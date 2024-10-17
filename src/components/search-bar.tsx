"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Menu, Search } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const nav = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    nav.push("/manga/search?query=" + searchInput);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-4 sm:px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-1 items-center gap-2"
      >
        <Search size={20} />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search manga, manhwa, manhua ..."
          className="outline-none focus:border-transparent"
        />
      </form>
      <Label htmlFor="side-bar">
        <Menu className="cursor-pointer sm:hidden" />
      </Label>
      <ModeToggle />
    </div>
  );
};

export default SearchBar;
