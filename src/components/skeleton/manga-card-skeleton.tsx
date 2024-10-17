import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

type CardSize = "default" | "small";

const MangaCardSkeleton = ({ size }: { size?: CardSize }) => {
  return (
    <Card
      className={cn(
        "relative w-full max-w-[300px] overflow-hidden transition-all",
        size == "small" ? "h-[250px]" : "h-[380px]",
      )}
    >
      <Image
        width={400}
        height={400}
        alt="loader"
        src={"/loader.jpg"}
        className="h-full w-full object-cover object-center opacity-50"
      />
      <Button className="absolute bottom-4 left-4 animate-pulse">
        Loading...
      </Button>
    </Card>
    // </SwiperSlide>
  );
};
export default MangaCardSkeleton;
