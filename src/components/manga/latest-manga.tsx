"use client";
import { getLatestUpdates } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FlatMangaCard from "./flat-manga-card";
import { IMangaResult } from "@consumet/extensions";
import FlatMangaCardSkeleton from "../skeleton/flat-skeleton";

const LatestManga = () => {
  const { data: latestManga, isLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getLatestUpdates,
  });

  return (
    <div className="flex h-full flex-1 flex-col">
      <h3 className="mb-4 text-xl font-medium">Latest Updates</h3>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Uncomment this section when data is available */}
        <div className="flex flex-wrap gap-4 no-scrollbar md:max-h-[150px]">
          {latestManga?.map((manga: IMangaResult, ind) => (
            <FlatMangaCard key={ind} manga={manga} />
          ))}
          {isLoading &&
            Array(10)
              .fill(0)
              .map((_, y) => <FlatMangaCardSkeleton key={y} />)}
        </div>
      </div>
    </div>
  );
};

export default LatestManga;
