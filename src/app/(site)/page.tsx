import Header from "@/components/manga/header";
import LatestManga from "@/components/manga/latest-manga";
import PopularManga from "@/components/manga/popular-manga";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 pt-6 sm:px-0">
      <Header />
      <PopularManga />
      <LatestManga />
    </div>
  );
};

export default Page;
