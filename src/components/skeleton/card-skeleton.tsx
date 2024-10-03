import React from "react";

const CardSkeletonLoader = ({ variant }: { variant: "default" | "small" }) => {
  return (
    <div
      className={` ${skeletonVariants[variant]} relative flex scale-100 animate-pulse snap-start flex-col rounded-xl transition-all`}
    >
      {/* Image Skeleton */}
      <img
        src="/logo.png"
        className="h-full w-full rounded-xl bg-gray-300 object-cover object-center"
      />

      {/* Title Skeleton */}
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-300"></div>

      {/* Badge Skeleton */}
      <div className="absolute left-2 top-2 h-4 w-1/3 rounded bg-primary/20"></div>
    </div>
  );
};

export default CardSkeletonLoader;

const skeletonVariants: { [index: string]: string } = {
  small: "min-w-[150px] max-w-[150px] h-[220px]",
  default: "min-w-[290px] max-w-[300px] h-[400px]",
};
