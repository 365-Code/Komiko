"use client";
import React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { IMangaResult } from "@consumet/extensions";

type CardSize = "default" | "small";

interface CarouselProps extends SwiperProps {
  mangaList: IMangaResult[] | undefined;
  loading?: boolean;
  size?: CardSize;
  SlideComponent: ({
    manga,
  }: {
    manga: IMangaResult;
    size?: CardSize;
  }) => React.JSX.Element;
  SkeletonComponent: ({ size }: { size?: CardSize }) => React.JSX.Element;
}

const Carousel2 = ({
  mangaList,
  loading,
  SlideComponent,
  SkeletonComponent,
  size,
  ...props
}: CarouselProps) => {
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
      {...props}
      className="relative mt-2 h-fit w-fit max-w-full mr-auto sm:mt-4 md:mt-6"
    >
      {!mangaList || loading
        ? Array(10)
            .fill(0)
            .map((_, i) => (
              <SwiperSlide key={i} className="mx-auto mr-2 h-fit max-w-fit">
                <SkeletonComponent />
              </SwiperSlide>
            ))
        : mangaList.map((manga, i) => (
            <SwiperSlide key={i} className="mx-auto mr-4 h-fit max-w-fit">
              <SlideComponent manga={manga} size={size} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default Carousel2;
