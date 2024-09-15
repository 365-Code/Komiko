import { IMangaResult } from "@consumet/extensions";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

type Props = {
  manga: IMangaResult;
};

const FlatMangaCard = ({ manga }: Props) => {
  return (
    <Link
      href={"/manga/" + manga.id}
      className="flex-1 md:flex-none md:basis-[30%]"
    >
      <div className="flex max-h-[100px] min-h-[100px] min-w-[230px] items-center gap-2 rounded-lg transition-all hover:pl-0 hover:pr-2 md:min-w-[300px]">
        <img
          width={500}
          height={500}
          src={manga.image || ""}
          alt={String(manga.title) || "" }
          className="aspect-[4/5] h-full w-[80px] object-cover text-sm shadow-black drop-shadow-md"
        />
        <div className="flex-1">
          <h2>{manga.title.toString()}</h2>
          <p className="text-xs text-secondary-foreground">{manga.status}</p>
        </div>
        <Separator orientation="vertical" className="my-auto h-[50%]" />
        <div>
          <p>{manga.releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default FlatMangaCard;
