import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const MangaSkeleton = () => {
  return (
    <div className="flex flex-1 h-full flex-col gap-6">
      <div id="manga-header" className="h-full flex flex-col items-start md:flex-row">
        <div className="relative basis-1/2">
          <div className="relative left-0 top-0 h-full w-full md:absolute">
            <div className="mx-auto h-full w-[300px] animate-pulse rounded-xl bg-gray-300"></div>
          </div>
        </div>
        <div className="my-auto line-clamp-6 basis-[35%] space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="mx-auto pb-4 mt-8 h-full flex-1 sm:w-full md:bg-white/40 md:px-16">
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2"></div>
          <div className="relative flex-1 py-6">
            <div className="flex items-center justify-between">
              <Button
                disabled
                className="h-10 w-1/3 animate-pulse bg-gray-300"
              ></Button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
              </div>
            </div>
            <Separator className="absolute bottom-0 left-0" />
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between overflow-hidden md:flex-row">
          <div className="basis-[45%]">
            <h2 className="h-5 w-1/3 animate-pulse rounded bg-gray-300"></h2>
            <p className="mt-2 h-4 w-full animate-pulse rounded bg-gray-300"></p>
            <p className="mt-2 h-4 w-full animate-pulse rounded bg-gray-300"></p>
          </div>
          <div className="flex basis-[45%] flex-col space-y-4 overflow-hidden">
            <div className="space-y-2">
              <h3 className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></h3>
              <p className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></p>
            </div>
            <div className="space-y-2">
              <h3 className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></h3>
              <p className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></p>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <h3 className="h-5 my-4 w-1/4 animate-pulse rounded bg-gray-300"></h3>
              <ScrollArea className="max-h-[120px] w-full">
                <div className="flex flex-col-reverse gap-2">
                  <div className="h-6 w-full animate-pulse rounded bg-gray-300"></div>
                  <div className="h-6 w-full animate-pulse rounded bg-gray-300"></div>
                  <div className="h-6 w-full animate-pulse rounded bg-gray-300"></div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaSkeleton;
