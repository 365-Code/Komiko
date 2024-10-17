"use client";
import { getLatestUpdates } from "@/actions/mangadex";
import { IMangaResult } from "@consumet/extensions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

const LatestManga = () => {
  const { data: latestManga, isLoading } = useQuery({
    queryKey: ["latest-manga"],
    queryFn: getLatestUpdates,
  });
  return (
    <section className="mb-6 flex h-full flex-1 flex-col px-4 sm:px-6">
      <h3 className="text-xl font-medium sm:text-2xl md:text-3xl">
        Latest Updates
      </h3>
      {/* <div className="mb-6 flex-1 overflow-y-auto no-scrollbar"> */}
      {!isLoading && (!latestManga || latestManga.length == 0) ? (
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
              Couldn&apos;t Fetch anything for Latest Manga
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <DynamicCarousel
          mangaList={latestManga}
          loop={false}
          centeredSlides={false}
          SlideComponent={LatestCard}
          SkeletonComponent={LatestCardSkeleton}
        />
      )}
    </section>
  );
};

export default LatestManga;

const LatestCard = ({ manga }: { manga: IMangaResult }) => {
  return (
    <Link href={"/manga/" + manga.id}>
      <div className="relative flex h-[300px] min-w-[150px] max-w-[150px] flex-col justify-between gap-1">
        {/* <div className="absolute right-2 top-2 flex gap-1">
          <Button className="m-0 h-[2rem] w-[2rem] p-0" variant={"outline"}>
            <BookmarkPlus size={13} />
          </Button>
          <Button className="m-0 h-[2rem] w-[2rem] p-0" variant={"outline"}>
            <Star size={13} />
          </Button>
        </div> */}
        <img
          width={300}
          height={300}
          src={manga.image || "/loader.jpg"}
          className="h-[200px] w-full rounded-xl object-fill object-center"
        />
        <h2 className="line-clamp-2 h-[45px] text-sm font-semibold">
          {manga.title.toString()}
        </h2>
        <p className="line-clamp-1 text-xs font-medium text-muted-foreground">
          {manga.description?.toString()}
        </p>
        <div className="mt-1 flex items-center gap-1">
          {manga.releaseDate && <Badge>{manga.releaseDate}</Badge>}
          {manga.status && <Badge>{manga.status}</Badge>}
        </div>
      </div>
    </Link>
  );
};

const LatestCardSkeleton = () => {
  return (
    <div className="flex min-w-[150px] max-w-[150px] snap-start flex-col gap-1">
      <img
        width={300}
        height={300}
        src={"/loader.jpg"}
        className="h-[200px] w-full animate-pulse rounded-xl object-cover object-center"
      />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-full" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-3 basis-1/3" />
        <Skeleton className="h-3 flex-1" />
      </div>
    </div>
  );
};
