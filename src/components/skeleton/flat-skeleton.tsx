import React from "react";

const FlatMangaCardSkeleton = () => {
  return (
    <div className="flex max-h-[100px] min-h-[100px] min-w-[230px] animate-pulse items-center gap-2 rounded-lg md:min-w-[300px]">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] h-full w-[80px] rounded bg-gray-300" />

      {/* Text Skeleton */}
      <div className="flex-1 space-y-2">
        {/* Title Skeleton */}
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>

        {/* Status Skeleton */}
        <div className="h-3 w-1/4 rounded bg-gray-300"></div>
      </div>

      {/* Separator */}
      <div className="my-auto h-[50%] w-px bg-gray-300"></div>

      {/* Release Date Skeleton */}
      <div className="h-4 w-1/4 rounded bg-gray-300"></div>
    </div>
  );
};

export default FlatMangaCardSkeleton;
