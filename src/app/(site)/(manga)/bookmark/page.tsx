"use client";
import Carousel from "@/components/carousel/carousel";
import MangaCard from "@/components/manga/manga-card";
import RecentManga from "@/components/manga/recent-manga";
import { IMangaInfo } from "@consumet/extensions";
import React, { useEffect, useState } from "react";

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
    <div className="mt-6 space-y-4 px-4 sm:px-0">
      <h2 className="mb-4 text-4xl font-semibold">Bookmarks</h2>
      <div className="flex flex-wrap gap-2">
        {bookmarks.length ? (
          bookmarks.length >= 10 ? (
            <Carousel mangaList={bookmarks} />
          ) : (
            bookmarks.map((bkm) => (
              <MangaCard
                key={bkm.id}
                manga={bkm as IMangaInfo}
                variant="small"
              />
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
