import useSWR from "swr";

export type StatementDocument = {
  statement: string;
  isOpinion: boolean;
};

export type ClosedHeadlineDocument = {
  headline: string;
  background: string;
  isFake: boolean;
};

export type NewsDocument = {
  imageUrl: string;
  headline: string;
  background: string;
  isFake: boolean;
};

async function fetchResponse(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
  }

  return response;
}

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetchResponse(url);
  return (await response.json()) as T;
};

export async function fetchText(url: string) {
  return (await fetchResponse(url)).text();
}

export function useTips() {
  return useSWR<string[]>("/database/tips.json", fetcher);
}

export function useStatementQuestions() {
  return useSWR<StatementDocument[]>("/database/statements.json", fetcher);
}

export function useNewsQuestions() {
  return useSWR<NewsDocument[]>("/database/news.json", fetcher);
}

export function useClosedHeadlineQuestions() {
  return useSWR<ClosedHeadlineDocument[]>("/database/headlines-closed.json", fetcher);
}
