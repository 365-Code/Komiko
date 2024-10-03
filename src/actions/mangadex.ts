import { IMangaChapter, IMangaInfo, MANGA } from "@consumet/extensions";

export const getMangaInfo = async (mangaId: string) => {
  try {
    const manga = new MANGA.MangaDex();
    let mangaInfo = (await manga.fetchMangaInfo(mangaId)) as IMangaInfo;
    if (!mangaInfo.chapters) {
      return [];
    }
    const chaptersLength = mangaInfo.chapters?.length || 0;
    const mangaChapters = [(mangaInfo.chapters as IMangaChapter[])[0]];
    for (let index = 1; index < chaptersLength; index++) {
      const currElement = (mangaInfo.chapters as IMangaChapter[])[index];
      const prevElement = (mangaInfo.chapters as IMangaChapter[])[index - 1];
      if (prevElement != currElement) {
        mangaChapters.push(currElement);
      }
    }
    mangaInfo = {
      ...mangaInfo,
      chapters: mangaChapters.reverse(),
    };
    return mangaInfo;
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

export const getLatestUpdates = async () => {
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

export const getSearchResults = async (query: string) => {
  try {
    const manga = new MANGA.MangaDex();
    const searchResults = await manga.search(query || "");
    return searchResults.results;
  } catch (error) {
    throw error;
  }
};

export const isNum = (num: string) => {
  const number: number = Number(num);
  return number >= 0;
};
