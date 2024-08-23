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

export type MultipleHeadlineDocument = {
  headlines: Record<string, boolean>;
};

export type NewsDocument = {
  imageUrl: string;
  headline: string;
  background: string;
  isFake: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

export function useMultipleHeadlineQuestions() {
  return useSWR<MultipleHeadlineDocument[]>("/database/headlines-multiple.json", fetcher);
}