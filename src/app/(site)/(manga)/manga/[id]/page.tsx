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
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { setManga } = useMangaStore();

  const [isBookMarked, setIsBookMarked] = useState(false);

  const { data: mangaInfo, isLoading } = useQuery({
    queryKey: ["get-manga-info"],
    gcTime: 0,
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
        status: string;
        release_date: number;
      }>;
      if (bookmarks.findIndex((v) => v.id == mangaInfo?.id) != -1) {
        setIsBookMarked(true);
      } else {
        setIsBookMarked(false);
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
              status: mangaInfo?.status,
              chapters: mangaInfo?.chapters?.length,
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
            status: mangaInfo?.status,
            chapters: mangaInfo?.chapters?.length,
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
      <div className="h-full w-full">
        <MangaSkeleton />
      </div>
    );
  }

  if (!mangaInfo) {
    return (
      <div className="mx-auto text-3xl font-medium">Failed to Fetch Manga</div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      {/* Header */}
      <div id="manga-header" className="grid md:grid-cols-2">
        <div className="relative h-full w-full">
          <div className="h-full w-full md:absolute md:left-0 md:top-0">
            <div className="mx-auto w-fit">
              <img
                width={500}
                height={500}
                src={mangaInfo.image || ""}
                alt={String(mangaInfo.title) || ""}
                className="top-0 h-[300px] w-full rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="my-auto flex w-full max-w-[80%] flex-col gap-4 p-4 sm:p-0 sm:text-4xl">
          <h1 className="line-clamp-3 text-3xl font-semibold sm:text-4xl md:text-5xl">
            {mangaInfo.title
              ? mangaInfo.title.toString()
              : Object.values(
                  mangaInfo.altTitles ? mangaInfo.altTitles[0] : { a: "b" },
                )}
          </h1>
          <Badge className="w-fit text-sm font-medium">
            {mangaInfo.status}
          </Badge>
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
      {/* Details */}
      <div className="mx-auto flex w-full flex-1 flex-col py-4 md:mt-8 md:overflow-hidden md:bg-white/40 md:px-16">
        <div className="grid gap-2 md:grid-cols-2">
          <div />
          {/* Actions */}
          <div className="relative px-4 md:px-0 md:py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/manga/${id}/${(mangaInfo.chapters as IMangaChapter[])[0]?.id}`}
              >
                <Button>Start Reading</Button>
              </Link>
              <div className="flex w-fit items-center gap-2">
                <Button
                  onClick={handleBookMark}
                  className={`h-[40px] w-[40px] rounded-full bg-secondary p-3 text-primary hover:text-secondary ${isBookMarked ? "bg-primary text-secondary" : ""}`}
                >
                  {isBookMarked ? <BookmarkCheck /> : <Bookmark />}
                </Button>
                <Button className="h-[40px] w-[40px] rounded-full bg-secondary p-3 text-primary hover:text-secondary">
                  <Share2 className="h-full w-full" />
                </Button>
              </div>
            </div>
            <Separator className="mt-2" />
          </div>
        </div>
        {/* Details */}
        <div className="grid flex-1 gap-2 md:grid-cols-2">
          {/* Description */}
          <Card className="mb-2 h-fit md:basis-[45%]">
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {mangaInfo.description &&
                  (mangaInfo.description as { [lang: string]: string })[
                    "en"
                  ].split("\n\n")[0]}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* other details */}
          <div className="h-fit">
            <div className="flex h-full flex-col-reverse md:flex-col">
              {/* Genres */}
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  {mangaInfo.genres?.map((genre: string, i: number) => (
                    <Badge className="mb-2 mr-2" key={i}>
                      {genre}
                    </Badge>
                  ))}
                  {(mangaInfo.themes as Array<string>)?.map(
                    (theme: string, i: number) => (
                      <Badge className="mb-2 mr-2" key={i}>
                        {theme}
                      </Badge>
                    ),
                  )}
                </CardContent>
              </Card>
              {/* Chapters */}
              <Card className="mb-2 flex h-fit flex-col overflow-hidden">
                <CardHeader>Chapters</CardHeader>
                <CardContent>
                  <ScrollArea className="h-[150px] w-full ">
                    <div className="flex flex-col-reverse">
                      {mangaInfo.chapters?.map((chapter: IMangaChapter, i) => (
                        <ChapterCard
                          key={chapter.id + i}
                          chapter={chapter}
                          mangaId={id}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
