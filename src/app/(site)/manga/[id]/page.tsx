"use client";
import ChapterCard from "@/components/manga/chapter-card";
import MangaSkeleton from "@/components/skeleton/manga-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getMangaInfo } from "@/actions/mangadex";
import { useMangaStore } from "@/store/manga-store";
import { IMangaChapter, IMangaInfo } from "@consumet/extensions";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Download, Share2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { setManga } = useMangaStore();

  const [isBookMarked, setIsBookMarked] = useState(false);

  const { data: mangaInfo, isLoading } = useQuery({
    queryKey: ["get-manga-info"],
    queryFn: async () => {
      const data = await getMangaInfo(id);
      setManga(data as IMangaInfo);
      return data as IMangaInfo;
    },
  });

  useEffect(() => {
    if (!mangaInfo) return;
    const data = localStorage.getItem("bookmarks");
    if (data) {
      const bookmarks = JSON.parse(data) as Array<{
        id: string;
        image: string;
        title: string;
      }>;

      if (bookmarks.findIndex((v) => v.id == mangaInfo?.id) != -1) {
        setIsBookMarked(true);
      }
    }
  }, [mangaInfo]);

  const handleBookMark = () => {
    const data = localStorage.getItem("bookmarks");
    if (data) {
      const bookmarks = JSON.parse(data) as Array<{
        id: string;
        image: string;
        title: string;
      }>;

      if (!isBookMarked) {
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([
            ...bookmarks,
            {
              id: mangaInfo?.id,
              image: mangaInfo?.image,
              title: mangaInfo?.title,
            },
          ]),
        );
      } else {
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(bookmarks.filter((bkm) => bkm.id != mangaInfo?.id)),
        );
      }
    } else {
      if (isBookMarked) return;
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([
          {
            id: mangaInfo?.id,
            image: mangaInfo?.image,
            title: mangaInfo?.title,
          },
        ]),
      );
    }

    if (isBookMarked) {
      toast("BookMark Removed", {
        duration: 500,
      });
    } else {
      toast.success("BookMarked", {
        duration: 500,
      });
    }
    setIsBookMarked((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <MangaSkeleton />
      </div>
    );
  }

  if (!mangaInfo) {
    return <div>Failed to Fetch Manga</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pt-6">
      <div id="manga-header" className="flex flex-col items-start md:flex-row">
        <div className="relative basis-1/2">
          <div className="relative left-0 top-0 h-full w-full md:absolute">
            <div className="mx-auto h-full w-[300px]">
              <img
                width={500}
                height={500}
                src={mangaInfo.image || ""}
                alt={String(mangaInfo.title) || ""}
                className="top-0 aspect-[4/5] -translate-y-4 scale-[0.85] rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="my-auto line-clamp-6 basis-[35%] space-y-4">
          <h1 className="text-5xl font-semibold">
            {mangaInfo.title
              ? mangaInfo.title.toString()
              : Object.values(
                  mangaInfo.altTitles ? mangaInfo.altTitles[0] : { a: "b" },
                )}
          </h1>
          <p className="text-sm font-medium text-primary">{mangaInfo.status}</p>
          <p className="line-clamp-3 flex flex-wrap gap-2 text-sm">
            {mangaInfo.description &&
              String(
                (mangaInfo.description as { [index: string]: string })[
                  "en"
                ] as string,
              ).split(".")[0]}
            .
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 flex h-full flex-1 flex-col pb-4 sm:w-full md:bg-white/40 md:px-16">
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2"></div>
          <div className="relative flex-1 py-6">
            <div className="flex items-center justify-between">
              <Link
                href={`/manga/${id}/${(mangaInfo.chapters as IMangaChapter[])[0]?.id}`}
              >
                <Button>Start Reading</Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleBookMark}
                  className={`h-[40px] w-[40px] rounded-full bg-secondary p-3 text-primary hover:text-secondary ${isBookMarked ? "bg-primary text-secondary" : ""}`}
                >
                  <Bookmark className="h-full w-full" />
                </Button>
                <Button className="h-[40px] w-[40px] rounded-full bg-secondary p-3 text-primary hover:text-secondary">
                  <Share2 className="h-full w-full" />
                </Button>
                <Button className="h-[40px] w-[40px] rounded-full bg-secondary p-3 text-primary hover:text-secondary">
                  <Download className="h-full w-full" />
                </Button>
              </div>
            </div>
            <Separator className="absolute bottom-0 left-0" />
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between overflow-hidden md:flex-row">
          <div className="basis-[45%]">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-sm">
              {mangaInfo.description &&
                (mangaInfo.description as { [lang: string]: string })[
                  "en"
                ].split("\n\n")[0]}
            </p>
          </div>
          <div className="flex h-full basis-[45%] flex-col space-y-4 overflow-hidden">
            <div className="">
              <h3 className="font-semibold">Genres</h3>
              <p className="text-sm">
                {mangaInfo.genres?.map((genre, i) => (
                  <Badge key={i} className="mr-1">
                    {genre}
                  </Badge>
                ))}
              </p>
            </div>
            <div className="">
              <h3 className="font-semibold">Themes</h3>
              <p className="text-sm">
                {mangaInfo.themes?.map((theme, i) => (
                  <Badge key={i} className="mr-1">
                    {theme}
                  </Badge>
                ))}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
              <h3 className="font-semibold">Chapters</h3>
              <ScrollArea className="mt-1 h-[150px] w-full">
                <div className="flex flex-col-reverse gap-2">
                  {mangaInfo.chapters?.map((chapter) => (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      mangaId={id}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
