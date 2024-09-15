import { IMangaChapter } from "@consumet/extensions";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { isNum } from "@/actions/mangadex";

type Props = {
  chapter: IMangaChapter;
  mangaId: string;
};

const ChapterCard = ({ chapter, mangaId }: Props) => {
  return (
    <Link href={"/manga/" + mangaId + "/" + chapter.id}>
      <Button className="mb-1 w-full basis-[45%] bg-secondary py-6 text-primary hover:text-secondary">
        {isNum(chapter.title) ? "Chapter " : ""} {chapter.title}
      </Button>
    </Link>
  );
};

export default ChapterCard;
