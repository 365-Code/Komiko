"use client";
import { getRecentManga } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Carousel from "../carousel/carousel";

const RecentManga = () => {
  const { data: recentManga } = useQuery({
    queryKey: ["recent-manga"],
    queryFn: getRecentManga,
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold">Recent Manga</h3>
      <Carousel mangaList={recentManga} size="small" />
    </div>
  );
};

export default RecentManga;
