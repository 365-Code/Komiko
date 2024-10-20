"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BookOpen, Compass } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Header = () => {
  const [lastManga, setLastManga] = useState<{
    id: string;
    title: string;
    description: string;
    chapterId: string;
    chapterTitle: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const chapter = localStorage.getItem("chapter");
    if (chapter) {
      const lastChapter = JSON.parse(chapter) as {
        id: string;
        title: string;
        description: string;
        chapterId: string;
        image: string;
        index: number;
      };
      setLastManga({
        id: lastChapter.id,
        title: lastChapter.title.toString(),
        description: String(lastChapter.description),
        chapterId: lastChapter.chapterId,
        chapterTitle: lastChapter.title,
        image: lastChapter.image || "/komiko.jpg",
      });
    }
  }, []);

  return (
    <section className="mb-4 px-4 sm:px-6">
      {lastManga ? (
        // <div className="flex flex-col-reverse items-start gap-4 py-4 md:flex-row">
        <div className="grid gap-4 sm:grid-cols-2 items-center">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-2xl font-medium sm:text-4xl md:text-5xl">
              Keep the story going..
            </h2>
            <p className="max-w-[90%] text-sm font-medium">
              Don&apos;t let the story end just yet. Continue reading your last
              book and immerse yourself in the world of iterature.
            </p>
            <Link
              className="w-fit"
              href={"/manga/" + lastManga.id + "/" + lastManga.chapterId}
            >
              <Button className="w-fit rounded-full">
                Continue Reading <BookOpen size={20} className="text ml-2" />
              </Button>
            </Link>
          </div>
          <LastMangaCard lastManga={lastManga} />
        </div>
      ) : (
        <div className="flex w-[600px] max-w-full flex-col gap-4">
          <h2 className="text-2xl font-medium sm:text-4xl md:text-5xl">
            Start Your Next Adventure
          </h2>
          <p className="text-sm font-medium">
            Dive into captivating worlds and discover stories that will ignite
            your imagination. Your next favorite manga is just a click away!
          </p>
          <Link className="w-fit" href={"/manga/search"}>
            <Button className="w-fit rounded-full">
              Explore <Compass size={20} className="text ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Header;

const LastMangaCard = ({
  lastManga,
}: {
  lastManga: { image: string; id: string; title: string; description: string };
}) => {
  return (
    <Card className="relative h-[200px] overflow-hidden">
      <img
        src={lastManga.image}
        alt="Featured Manga"
        className="h-full w-full rounded-lg object-cover opacity-40"
      />
      <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-secondary to-transparent">
        <CardHeader>
          <Link
            href={"/manga/" + lastManga.id}
            className="mb-2 text-2xl font-bold text-primary"
          >
            <CardTitle className="line-clamp-2">{lastManga.title}</CardTitle>
          </Link>
          <CardDescription className="line-clamp-4">
            {lastManga.description}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

{
  /* <div className="flex basis-[50%] flex-row gap-3">
<div className="aspect-[4/5] h-[150px]">
  <img
    src={lastManga.image}
    className="h-full w-full rounded-xl object-cover object-center"
  />
</div>
<div className="basis-[60%]">
  <Link href={`/manga/${lastManga.id}`} className="text-primary">
    <h3 className="line-clamp-2 text-xl font-medium">
      {lastManga.title}
    </h3>
  </Link>
  <p className="line-clamp-4 text-sm font-medium italic">
    {lastManga.description}.
  </p>
</div>
</div> */
}
