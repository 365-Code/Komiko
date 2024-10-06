"use client";
import { getSearchResults } from "@/actions/mangadex";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Header from "@/components/manga/header";
import Carousel from "@/components/carousel/carousel";

const Page = ({ searchParams }: { searchParams: { query: string } }) => {

  const { mutateAsync: fetchSearchResults, data: searchResults } = useMutation({
    mutationFn: async () => {
      const data = await getSearchResults(searchParams.query);
      return data;
    },
  });

  useEffect(() => {
    fetchSearchResults();
  }, [searchParams]);
  console.log(searchResults);

  return (
    <div className="mt-6 flex flex-1 flex-col gap-4 px-4 pb-4 pt-6 sm:px-0">
      <Header />
      <Carousel mangaList={searchResults} />
      {/* <div className="my-auto flex items-center gap-4 overflow-x-scroll py-4 no-scrollbar">
        {searchResults?.map((res: IMangaResult) => (
          <MangaCard
            key={res.id}
            onHover={(desc) => setHoverDes(desc)}
            onHoverOver={() => setHoverDes("")}
            manga={res}
            variant="default"
          />
        ))}
        {isPending &&
          Array(10)
            .fill(0)
            .map((_, i) => <CardSkeletonLoader key={i} variant="default" />)}
      </div> */}
    </div>
  );
};

export default Page;
