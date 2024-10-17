"use client";
import { getPopularManga } from "@/actions/mangadex";
import MangaCard from "@/components/card/manga-card";
import MangaCardSkeleton from "@/components/skeleton/manga-card-skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";
import { EffectCoverflow } from "swiper/modules";

const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

const Page = () => {
  const { data: popularManga, isLoading: isPopularLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getPopularManga,
  });

  return (
    <div className="mx-auto my-auto w-full pb-4">
      <h2 className="px-4 text-2xl sm:px-6 sm:text-3xl md:text-3xl">Popular</h2>
      {!isPopularLoading && (!popularManga || popularManga.length == 0) ? (
        <Card>
          <CardHeader>
            <CardTitle>Nothing Found</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <DynamicCarousel
          mangaList={popularManga}
          SkeletonComponent={MangaCardSkeleton}
          SlideComponent={MangaCard}
          modules={[EffectCoverflow]}
          loading={isPopularLoading}
        />
      )}
      {/* <Carousel mangaList={popularManga} loading={isPopularLoading} /> */}
      {/* <RecentManga /> */}
    </div>
  );
};

export default Page;
