import { IMangaInfo, IMangaResult } from "@consumet/extensions";
import { create } from "zustand";

type MangaStore = {
  manga: IMangaInfo | IMangaResult | null;
  chapter: {
    index: number;
    id: string;
    title: string;
  } | null;
  setChapter: (
    chapter: { index: number; id: string; title: string },
    manga: IMangaResult,
  ) => void;
  setManga: (manga: IMangaInfo) => void;
};

export const useMangaStore = create<MangaStore>((set) => ({
  manga: null,
  chapter: null,
  setChapter: (
    chapter: { index: number; id: string; title: string },
    manga: IMangaResult,
  ) => {
    localStorage.setItem(
      "chapter",
      JSON.stringify({
        ...manga,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
      }),
    );
    set({ chapter: chapter });
  },
  setManga: (manga: IMangaInfo) => {
    localStorage.setItem("manga", JSON.stringify(manga));
    set({ manga: manga });
  },
}));
