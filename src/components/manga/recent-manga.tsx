"use client";
import { getRecentManga } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCardSkeleton from "../skeleton/manga-card-skeleton";
import { EffectCoverflow } from "swiper/modules";
import MangaCard from "../card/manga-card";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

const RecentManga = () => {
  const { data: recentManga, isLoading } = useQuery({
    queryKey: ["recent-manga"],
    queryFn: getRecentManga,
  });

  return (
    <div className="flex-1">
      <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
        Recent Manga
      </h3>
      {!isLoading && (!recentManga || recentManga.length == 0) ? (
        <Card className="mx-auto flex w-fit max-w-full flex-col items-center sm:max-w-[600px] sm:flex-row">
          <CardHeader>
            <Image
              width={400}
              height={400}
              alt="nothing-found"
              src={"/loader.jpg"}
              className="h-[200px] w-[200px]"
            />
          </CardHeader>
          <CardHeader>
            <CardTitle>Nothing Found</CardTitle>
            <CardDescription className="hyphens-auto">
              Couldn&apos;t Fetch anything Recent Mangas
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <DynamicCarousel
          mangaList={recentManga}
          SkeletonComponent={MangaCardSkeleton}
          SlideComponent={MangaCard}
          modules={[EffectCoverflow]}
          size="small"
        />
      )}
      {/* <Carousel mangaList={recentManga} /> */}
    </div>
  );
};

export default RecentManga;
