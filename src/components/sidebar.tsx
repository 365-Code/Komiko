"use client";
import { BookMarked, Flame, Home, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { useMangaStore } from "@/store/manga-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const links = [
  {
    icon: Home,
    name: "Home",
    url: "/",
  },
  {
    icon: Search,
    name: "Search",
    url: "/manga/search",
  },
  {
    icon: Flame,
    name: "Popular",
    url: "/popular",
  },
  {
    icon: BookMarked,
    name: "BookMarks",
    url: "/bookmark",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const { setManga } = useMangaStore();
  useEffect(() => {
    const data = localStorage.getItem("manga");
    if (data) {
      setManga(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex-col ${
          isHovered ? "items-start" : "items-center"
        } sticky hidden h-screen w-[100px] justify-between p-6 transition-all hover:w-[250px] sm:flex`}
      >
        <div className="w-full">
          <Link href={"/"}>
            <div className="h-[56px] w-[56px] overflow-hidden rounded-full">
              <img
                loading="lazy"
                src={"/logo1.png"}
                width={300}
                height={300}
                alt="komiko"
                className="h-full w-full scale-[2] object-cover object-center"
              />
            </div>
          </Link>
        </div>
        <ul className="flex w-full flex-col gap-2">
          {links.map((lnk, i) => (
            <Link href={lnk.url} key={i} className="h-full w-full text-center">
              <Button
                className={`h-[40px] w-full justify-start gap-2 transition-all ${isHovered ? "justify-start" : "w-[40px] justify-center rounded-full"} ${pathname.endsWith(lnk.url) ? "bg-primary text-secondary" : "bg-secondary text-primary hover:text-secondary"} `}
              >
                <span>
                  <lnk.icon
                    size={20}
                    className="m-0 h-full min-w-fit p-0 transition-all"
                  />
                </span>
                {isHovered && (
                  <span
                    className={`${
                      isHovered ? "opacity-100" : "opacity-0"
                    } text-md transition-all`}
                  >
                    {lnk.name}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </ul>

        <div></div>
        <div className="absolute right-0 top-0 flex h-full flex-col justify-center">
          <Separator orientation="vertical" className="my-auto h-[90%]" />
        </div>
      </div>

      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger id="side-bar" />
          <SheetContent className="w-[300px]" side={"left"}>
            <SheetHeader>
              <SheetTitle>
                <div className="w-full">
                  <Link href={"/"}>
                    <div className="h-[56px] w-[56px] overflow-hidden rounded-full">
                      <img
                        loading="lazy"
                        src={"/logo1.png"}
                        width={300}
                        height={300}
                        alt="komiko"
                        className="h-full w-full scale-[2] object-cover object-center"
                      />
                    </div>
                  </Link>
                </div>
              </SheetTitle>
              <SheetDescription>
                <ul className="flex w-full flex-col gap-2">
                  {links.map((lnk, i) => (
                    <Link
                      href={lnk.url}
                      key={i}
                      className="h-full w-full text-center"
                    >
                      <Button
                        className={`h-[40px] w-full justify-start gap-2 transition-all ${"w-[40px"} ${pathname.endsWith(lnk.url) ? "bg-primary text-secondary" : "bg-secondary text-primary hover:text-secondary"} `}
                      >
                        <span>
                          <lnk.icon
                            size={20}
                            className="m-0 h-full min-w-fit p-0 transition-all"
                          />
                        </span>
                        <span className={`text-md transition-all`}>
                          {lnk.name}
                        </span>
                      </Button>
                    </Link>
                  ))}
                </ul>
                <div></div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
