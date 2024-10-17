"use client";
import MangaCard from "@/components/card/manga-card";
import RecentManga from "@/components/manga/recent-manga";
import MangaSkeleton from "@/components/skeleton/manga-skeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const DynamicCarousel = dynamic(
  () => import("@/components/carousel/carousel2"),
  {
    ssr: false,
  },
);

interface BookMarkProps {
  id: string;
  title: string;
  status: string;
  image: string;
  chapters: number;
}

const Page = () => {
  const [bookmarks, setBookMarks] = useState<
    Array<{ id: string; image: string; title: string }>
  >([]);

  useEffect(() => {
    const data = localStorage.getItem("bookmarks");
    if (data) {
      setBookMarks(JSON.parse(data));
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-0">
      <h2 className="mb-2 text-left font-semibold sm:text-2xl md:text-4xl">
        Bookmarks
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {bookmarks.length ? (
          bookmarks.length >= 10 ? (
            <DynamicCarousel
              mangaList={bookmarks}
              SlideComponent={MangaCard}
              SkeletonComponent={MangaSkeleton}
            />
          ) : (
            // <Carousel mangaList={bookmarks} />
            bookmarks.map((bkm) => (
              <BookMarkCard key={bkm.id} manga={bkm as BookMarkProps} />
            ))
          )
        ) : (
          <div className="col-span-full text-center text-lg text-gray-500">
            You haven&apos;t bookmarked anything yet. Explore some manga!
          </div>
        )}
      </div>
      <RecentManga />
    </div>
  );
};

export default Page;

const BookMarkCard = ({ manga }: { manga: BookMarkProps }) => {
  return (
    <Link href={"/manga/" + manga.id}>
      <Card className="relative mx-auto mt-[40px] flex w-full max-w-[320px] flex-row items-center gap-4 border-none bg-transparent/30 shadow-none outline-none">
        <img
          src={manga.image}
          className="absolute left-0 top-0 -z-[1] h-full w-full rounded-xl border-none object-cover object-center outline-none blur-sm"
        />
        <div className="relative h-[100px] w-full max-w-[100px] border-none outline-none">
          <img
            src={manga.image}
            className="h-[120px] w-full -translate-y-10 translate-x-4 rounded-xl border border-none object-cover object-center outline-none"
          />
        </div>
        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-2 text-primary-foreground">
            {manga.title.toString()}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-primary-foreground">
            {manga.chapters && <span>{manga.chapters}</span>}
            {manga.status && (
              <>
                <span className="h-1 w-1 rounded-full bg-primary" />{" "}
                <span>{manga.status}</span>
              </>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
