import { IMangaResult } from "@consumet/extensions";
import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

type Props = {
  manga: IMangaResult;
  variant: "default" | "small" | "medium";
  onHover?: (desc: string) => void;
  onHoverOver?: () => void;
};

const MangaCard = ({ manga, variant, onHover, onHoverOver }: Props) => {
  return (
    <Link href={"/manga/" + manga.id}>
      <div
        onMouseLeave={onHoverOver}
        onMouseEnter={
          onHover ? () => onHover(String(manga.description)) : () => ""
        }
        className={` ${variants[variant]} relative scale-100 snap-start bg-transparent transition-all hover:ml-2 hover:-translate-y-2 hover:scale-105`}
      >
        <img
          width={500}
          height={500}
          loading="lazy"
          src={manga.image || "/logo1.png"}
          alt={manga.title.toString() || ""}
          className="aspect-[4/5] h-full w-full rounded-xl object-cover object-center shadow-black drop-shadow-lg"
        />
        <p className="mt-2 line-clamp-1 text-sm font-medium text-primary">
          {manga.title.toString()}
        </p>
        <Badge className="absolute left-2 top-2">{manga.status}</Badge>
      </div>
    </Link>
  );
};

export default MangaCard;

const variants: { [index: string]: string } = {
  small: "min-w-[150px] max-w-[150px]",
  medium: "min-w-[220px] max-w-[280px]",
  default: "min-w-[290px] max-w-[300px]",
};
