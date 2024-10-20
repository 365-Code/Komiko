"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { getChapterPages, isNum } from "@/actions/mangadex";
import { useMangaStore } from "@/store/manga-store";
import { IMangaChapter, IMangaInfo, IMangaResult } from "@consumet/extensions";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface PageProps {
  params: {
    id: string;
    chapter: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { manga, setChapter, chapter } = useMangaStore();

  const { data: chapterPages, isLoading } = useQuery({
    queryKey: ["get-chapter-page"],
    queryFn: async () => {
      try {
        const data = await getChapterPages(params.chapter);
        const chIndex = (manga?.chapters as IMangaChapter[]).findIndex(
          (ch) => ch.id == params.chapter,
        );
        if (chIndex != -1) {
          setChapter(
            {
              index: chIndex,
              id: params.chapter,
              title: (manga?.chapters as IMangaChapter[])[
                chIndex
              ].title.toString(),
            },
            {
              id: params.id || "",
              description: (manga?.description as { [lang: string]: string })[
                "en"
              ].split(".")[0],
              image: manga?.image,
              title: manga?.title.toString() || "",
            },
          );
          return data;
        }
      } catch (error) {
        throw error;
      }
    },
    staleTime: 15000,
  });

  if (isLoading) {
    return [...Array(10)].map((_, i) => (
      <img
        key={i}
        style={{
          animationDelay: `${i * 0.1}s`,
        }}
        width={500}
        height={500}
        src="/komiko.jpg"
        className="mx-auto my-2 aspect-square w-[500px] max-w-full animate-pulse rounded-xl bg-black/10 p-8"
      />
    ));
  }

  if (!chapterPages) {
    return <div>Not Found</div>;
  }

  return (
    <div
      id="chapter-pages"
      className="mx-auto mt-6 w-full max-w-7xl space-y-4 pb-6"
    >
      <Breadcrumb className="px-4 sm:px-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/manga/" + params.id}>
              {manga?.title.toString()}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{"Chapter " + chapter?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ChapterController manga={manga} chapter={chapter} />

      <div className="mx-auto">
        {chapterPages?.map((pg) => (
          <img
            key={pg.page}
            src={pg.img}
            alt={String(pg.page)}
            className="mx-auto object-cover"
            loading="lazy"
          />
        ))}
      </div>

      <ChapterController manga={manga} chapter={chapter} />

      <BackToTop />
    </div>
  );
};

export default Page;

interface ControllerProps {
  chapter: {
    index: number;
    id: string;
    title: string;
  } | null;
  manga: IMangaInfo | IMangaResult | null;
}

const ChapterController = ({ chapter, manga }: ControllerProps) => {
  const nav = useRouter();
  const params = useParams();
  const mangaId = params.id;
  const chapterId = params.chapter as string;

  const mangaChapters = manga?.chapters as IMangaChapter[];
  const hasPrev = (chapter && chapter?.index - 1 >= 0) || false;
  const hasNext =
    (chapter &&
      chapter?.index + 1 < (manga?.chapters as IMangaChapter[]).length) ||
    false;

  return (
    <div className="mb-4 flex w-full justify-between px-4 sm:px-0">
      <ComboBox
        comboList={(manga?.chapters as IMangaChapter[]).map((ch) => ({
          label: `${isNum(ch.title) ? "Chapter " : ""} ${ch.title}`,
          value: ch.id,
        }))}
        listName="Chapters"
        onChange={(v) => nav.push(`/manga/${mangaId}/${v}`)}
        defaultValue={chapterId}
      />
      <div className="flex items-center gap-2">
        {chapter && (
          <Link
            className={!hasPrev ? "pointer-events-none" : ""}
            href={
              hasPrev
                ? `/manga/${mangaId}/${mangaChapters[chapter.index - 1].id}`
                : ""
            }
          >
            <Button disabled={!hasPrev}>
              <ChevronLeft />
              Prev
            </Button>
          </Link>
        )}
        {chapter && (
          <Link
            className={!hasNext ? "pointer-events-none" : ""}
            href={
              hasNext
                ? `/manga/${mangaId}/${mangaChapters[chapter.index + 1].id}`
                : ""
            }
          >
            <Button disabled={!hasNext}>
              Next
              <ChevronRight />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const BackToTop = () => {
  const scrollRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mainPage = document.getElementById("main-page") as HTMLDivElement;

    if (!mainPage || !scrollRef || !scrollRef.current) return;

    window.onscroll = () => {
      if (scrollRef.current) {
        // console.log(window.scrollY, mainPage.scrollHeight - window.outerHeight);

        if (
          window.scrollY >= 1000 &&
          window.scrollY <= mainPage.scrollHeight - window.outerHeight - 200
        ) {
          scrollRef.current.style.visibility = "visible";
        } else {
          scrollRef.current.style.visibility = "hidden";
        }
      }
    };

    mainPage.onscroll = () => {
      if (scrollRef.current) {
        // console.log(mainPage.scrollTop, mainPage.scrollHeight);

        if (
          mainPage.scrollTop >= 1000 &&
          mainPage.scrollTop <= mainPage.scrollHeight - window.outerHeight - 200
        ) {
          scrollRef.current.style.visibility = "visible";
        } else {
          scrollRef.current.style.visibility = "hidden";
        }
      }
    };
  }, []);

  return (
    <Link href={"#"}>
      <Button
        ref={scrollRef}
        className="fixed bottom-4 right-8 aspect-square rounded-full p-0"
        style={{ visibility: "hidden" }} // Initially hidden
      >
        <ChevronUp />
      </Button>
    </Link>
  );
};
