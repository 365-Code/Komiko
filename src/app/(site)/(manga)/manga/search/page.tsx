"use client";
import { getSearchResults } from "@/actions/mangadex";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Header from "@/components/manga/header";
import MangaCard from "@/components/card/manga-card";
import MangaCardSkeleton from "@/components/skeleton/manga-card-skeleton";
import { EffectCoverflow } from "swiper/modules";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

const Page = ({ searchParams }: { searchParams: { query: string } }) => {
  const {
    mutateAsync: fetchSearchResults,
    data: searchResults,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async () => {
      const data = await getSearchResults(searchParams.query);
      return data;
    },
  });

  useEffect(() => {
    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="mt-6 flex flex-1 flex-col gap-4 px-4 pb-4 pt-6 sm:px-0">
      <Header />
      {!isLoading && (!searchResults || searchResults.length == 0) ? (
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
              Couldn&apos;t Fetch anything for query {searchParams.query}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <DynamicCarousel
          mangaList={searchResults}
          SlideComponent={MangaCard}
          SkeletonComponent={MangaCardSkeleton}
          modules={[EffectCoverflow]}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default Page;
