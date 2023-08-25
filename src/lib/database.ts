import useSWR from "swr";

export type TipDocument = {
  tip: string;
};

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

export function getTips() {
  return useSWR<string[]>("/database/tips.json", fetcher);
}

export function getStatementQuestions() {
  return useSWR<StatementDocument[]>("/database/statements.json", fetcher);
}

export function getNewsQuestions() {
  return useSWR<NewsDocument[]>("/database/news.json", fetcher);
}

export function getClosedHeadlineQuestions() {
  return useSWR<ClosedHeadlineDocument[]>("/database/headlines-closed.json", fetcher);
}

export function getMultipleHeadlineQuestions() {
  return useSWR<MultipleHeadlineDocument[]>("/database/headlines-multiple.json", fetcher);
}