import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IMangaResult } from "@consumet/extensions";
import { useSwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import Link from "next/link";

type CardSize = "default" | "small";

const MangaCard = ({
  manga,
  size,
}: {
  manga: IMangaResult;
  size?: CardSize;
}) => {
  const swiperSlide = useSwiperSlide();

  return (
    <Card className="relative h-[380px] w-[300px] overflow-hidden border-none outline-none transition-all">
      <img
        src={manga.image || "/loader.jpg"}
        alt="slide_image"
        className="h-full w-full object-fill object-center"
      />
      <div className="absolute -bottom-1 left-0 mx-auto h-fit w-full">
        <Card className="mx-auto w-full border-none bg-secondary/80 outline-none backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="line-clamp-2 text-lg sm:text-xl md:text-2xl">
              {manga.title.toString()}
            </CardTitle>
            {manga.description && (
              <CardDescription
                className={size == "small" ? "line-clamp-2" : "line-clamp-2"}
              >
                {manga.description?.toString()}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <Link
              href={"/manga/" + manga.id}
              className={
                swiperSlide.isActive
                  ? "opacity-100"
                  : "opacity-0" + " transition-all"
              }
            >
              <Button>Read Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Card>
    // </SwiperSlide>
  );
};

export default MangaCard;
