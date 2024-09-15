"use client";
import MangaCard from "@/components/manga/manga-card";
import CardSkeletonLoader from "@/components/skeleton/card-skeleton";
import { getSearchResults } from "@/actions/mangadex";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Header from "@/components/manga/header";

const Page = ({ searchParams }: { searchParams: { query: string } }) => {
  const [hoverDesc, setHoverDes] = useState("");

  const {
    mutateAsync: fetchSearchResults,
    data: searchResults,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const data = await getSearchResults(searchParams.query);
      return data;
    },
  });

  useEffect(() => {
    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="mt-6 flex flex-1 flex-col gap-4 px-4 sm:px-0">
      <Header />
      <div className="my-auto flex items-center gap-4 overflow-x-scroll py-4 no-scrollbar">
        {searchResults?.map((res) => (
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
      </div>
      <div className="line-clamp-2 w-[600px]">
        <p
          className={`${hoverDesc && hoverDesc != "undefined" ? "opacity-100" : "opacity-0"} justify-self-end text-sm font-medium transition-all sm:block`}
        >
          {hoverDesc ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quos, possimus ad mollitia labore soluta a. Magni reiciendis consequatur deserunt earum magnam modi mollitia quidem quisquam odio velit! Nostrum, nesciunt."}
        </p>
      </div>
    </div>
  );
};

export default Page;
