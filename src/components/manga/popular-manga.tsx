"use client";
import { getPopularManga } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCard from "./manga-card";
import CardSkeletonLoader from "../skeleton/card-skeleton";
("../skeleton/card-skeleton");

const PopularManga = () => {
  const { data: popularManga, isLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getPopularManga,
  });

  return (
    <div>
      <h3 className="text-xl font-medium">Popular Now</h3>
      <div className="flex flex-1 snap-x flex-row items-center gap-2 overflow-x-auto overflow-y-hidden pt-4 no-scrollbar">
        {popularManga?.map((manga, ind) => (
          <MangaCard key={ind} manga={manga} variant="small" />
        ))}
        {isLoading &&
          Array(10)
            .fill(0)
            .map((x, i) => <CardSkeletonLoader key={i} variant="small" />)}
      </div>
    </div>
  );
};

export default PopularManga;
