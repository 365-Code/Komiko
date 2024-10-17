"use client";
import { getPopularManga } from "@/actions/mangadex";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MangaCard from "../card/manga-card";
import { EffectCoverflow } from "swiper/modules";
import MangaCardSkeleton from "../skeleton/manga-card-skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";
("../skeleton/card-skeleton");

const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

const PopularManga = () => {
  const { data: popularManga, isLoading } = useQuery({
    queryKey: ["popular-manga"],
    queryFn: getPopularManga,
  });

  return (
    <section className="mb-4">
      <h3 className="px-4 text-xl font-medium sm:px-6 sm:text-2xl md:text-3xl">
        Popular Now
      </h3>
      {!isLoading && (!popularManga || popularManga.length == 0) ? (
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
              Couldn&apos;t Fetch anything for Popular Manga
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <DynamicCarousel
          mangaList={popularManga}
          SkeletonComponent={MangaCardSkeleton}
          SlideComponent={MangaCard}
          modules={[EffectCoverflow]}
          loading={isLoading}
        />
        // <Carousel mangaList={popularManga} size="small" />
      )}
    </section>
  );
};

export default PopularManga;
