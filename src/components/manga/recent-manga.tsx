"use client";
import { getRecentManga } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCard from "./manga-card";
import CardSkeletonLoader from "../skeleton/card-skeleton";

const RecentManga = () => {
  const { data: recentManga, isLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getRecentManga,
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold">Recent Manga</h3>
      <div className="flex flex-1 snap-x flex-wrap items-start gap-2 gap-y-8 overflow-x-auto overflow-y-hidden py-4 no-scrollbar">
        {recentManga?.map((manga, ind) => (
          <div key={ind} className="w-fit flex-1 self-start">
            <MangaCard manga={manga} variant="small" />
          </div>
        ))}
        {isLoading &&
          Array(10)
            .fill(0)
            .map((x, i) => <CardSkeletonLoader key={i} variant="small" />)}
      </div>
    </div>
  );
};

export default RecentManga;
