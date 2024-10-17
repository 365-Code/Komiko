import {
  IMangaChapter,
  IMangaInfo,
  IMangaResult,
  MANGA,
} from "@consumet/extensions";

export const getMangaInfo = async (mangaId: string) => {
  try {
    const manga = new MANGA.MangaDex();
    const mangaInfo = (await manga.fetchMangaInfo(mangaId)) as IMangaInfo;
    if (!mangaInfo.chapters) {
      return [];
    }
    const chaptersLength = mangaInfo.chapters?.length || 0;
    const mangaChapters = mangaInfo.chapters.filter(
      (ch) => ch.pages != 0,
    ) as IMangaChapter[];
    const mangaData = {
      ...mangaInfo,
      chapters: [],
    } as IMangaInfo;

    for (let index = 1; index < chaptersLength; index++) {
      const currElement = (mangaChapters as IMangaChapter[])[index];
      const prevElement = (mangaChapters as IMangaChapter[])[index - 1];
      if (prevElement.id != currElement.id) {
        mangaData.chapters?.push(currElement);
      }
    }
    mangaData.chapters?.reverse();
    console.log(mangaData);
    
    return mangaData;
  } catch (error) {
    throw error;
  }
};

export const getChapterPages = async (chapterId: string) => {
  try {
    const manga = new MANGA.MangaDex();
    return await manga.fetchChapterPages(chapterId);
  } catch (error) {
    throw error;
  }
};

export const getLatestUpdates = async (): Promise<IMangaResult[]> => {
  try {
    const manga = new MANGA.MangaDex();
    const { results } = await manga.fetchLatestUpdates();
    return results;
  } catch (error) {
    throw error;
  }
};

export const getPopularManga = async () => {
  try {
    const manga = new MANGA.MangaDex();
    const { results } = await manga.fetchPopular();
    return results;
  } catch (error) {
    throw error;
  }
};

export const getRecentManga = async () => {
  try {
    const manga = new MANGA.MangaDex();
    const { results } = await manga.fetchRecentlyAdded();
    return results;
  } catch (error) {
    throw error;
  }
};

export const getSearchResults = async (
  query: string,
): Promise<IMangaResult[]> => {
  try {
    const manga = new MANGA.MangaDex();
    const searchResults = await manga.search(query || "", undefined, 20);
    return searchResults.results;
  } catch (error) {
    throw error;
  }
};

export const isNum = (num: string) => {
  const number: number = Number(num);
  return number >= 0;
};
