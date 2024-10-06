"use client";
import { getPopularManga } from "@/actions/mangadex";
import Carousel from "@/components/carousel/carousel";
import RecentManga from "@/components/manga/recent-manga";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  const { data: popularManga, isLoading: isPopularLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getPopularManga,
  });

  return (
    <div className="mx-auto mt-12 max-w-7xl pb-4 w-full">
      <h2 className="px-4 text-2xl sm:text-3xl md:text-3xl">Popular</h2>
      <Carousel mangaList={popularManga} loading={isPopularLoading} />
      <RecentManga />
    </div>
  );
};

export default Page;
