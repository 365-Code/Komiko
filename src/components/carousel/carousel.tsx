"use client";
import React from "react";

import "./style.css";

import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IMangaResult } from "@consumet/extensions";
import { cn } from "@/lib/utils";

type CardSize = "default" | "small";

interface CarouselProps {
  mangaList: IMangaResult[] | undefined;
  size?: CardSize;
  loading?: boolean;
}

const Carousel = ({ mangaList, size, loading }: CarouselProps) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 1.6,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="relative mt-2 h-fit w-full sm:mt-4 md:mt-8"
    >
      {!mangaList || loading
        ? Array(10)
            .fill(0)
            .map((_, i) => (
              <SwiperSlide
                key={i}
                className="mx-auto h-fit max-w-[90%] sm:max-w-[300px]"
              >
                <SkeletonSlide size={size} />
              </SwiperSlide>
            ))
        : mangaList.map((manga, i) => (
            <SwiperSlide
              key={i}
              className="mx-auto h-fit max-w-[90%] sm:max-w-[300px]"
            >
              <MangaSlide size={size} manga={manga} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default Carousel;

const MangaSlide = ({
  manga,
  size,
}: {
  manga: IMangaResult;
  size?: CardSize;
}) => {
  const swiperSlide = useSwiperSlide();

  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden border-none outline-none transition-all",
        size == "small" ? "h-[250px]" : "h-[400px]",
      )}
    >
      <img
        src={manga.image}
        alt="slide_image"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute -bottom-1 left-0 mx-auto h-fit w-full">
        <Card className="mx-auto w-full border-none bg-secondary/80 outline-none backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-lg sm:text-xl md:text-2xl">
              {manga.title.toString()}
            </CardTitle>
            {manga.description && (
              <CardDescription
                className={size == "small" ? "line-clamp-1" : "line-clamp-2"}
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

const SkeletonSlide = ({ size }: { size?: CardSize }) => {
  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden transition-all",
        size == "small" ? "h-[250px]" : "h-[400px]",
      )}
    >
      <div className="absolute bottom-0 left-0 mx-auto h-fit w-full">
        <Card className="mx-auto w-full border-none bg-transparent backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              {/* {manga.title.toString()} */}
            </CardTitle>
            <CardDescription className="line-clamp-4 sm:line-clamp-none">
              {/* {manga.description?.toString()} */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-[100px]" />
          </CardContent>
        </Card>
      </div>
    </Card>
    // </SwiperSlide>
  );
};
