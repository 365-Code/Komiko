import { IMangaResult } from "@consumet/extensions";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Card } from "../ui/card";
import { Calendar } from "lucide-react";

type Props = {
  manga: IMangaResult;
};

const FlatMangaCard = ({ manga }: Props) => {
  return (
    <Link
      href={"/manga/" + manga.id}
      className="flex-1 md:flex-none md:basis-[32%]"
    >
      <Card className="group/flat-card bg-transparent/10 flex h-full max-h-[150px] min-h-[100px] min-w-[230px] items-center gap-2 rounded-lg p-2 transition-all md:min-w-[300px]">
        <img
          width={500}
          height={500}
          src={manga.image || ""}
          alt={String(manga.title) || ""}
          className="aspect-[4/5] h-full w-[90px] rounded-lg object-cover text-sm shadow-black drop-shadow-md transition-all"
        />
        <div className="flex-1 text-wrap">
          <h2 className="line-clamp-3 text-wrap">{manga.title.toString()}</h2>
        </div>
        <Separator orientation="vertical" className="my-auto h-[50%]" />
        <div className="basis-[20%] text-center flex flex-col items-center">
          <p className="flex items-center gap-1 text-xs">
            <Calendar size={15} /> {manga.releaseDate}
          </p>
          <p className="text-xs text-secondary-foreground">{manga.status}</p>
        </div>
      </Card>
    </Link>
  );
};

export default FlatMangaCard;
