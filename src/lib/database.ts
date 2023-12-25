import { Client, Databases, ID, Models, Query } from "appwrite";
import useSWR from "swr";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("658911b1ee07093aa03e");
const databases = new Databases(client);
const mainDatabaseId = "658911c44b8f36947d2d";
const leaderboardCollectionId = "65891270838d906f0d32";

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

export type LeaderboardEntry = Models.Document & {
  name: string;
  score: number;
};

export function getLeaderboardEntry(id: string) {
  try {
    return databases.getDocument(mainDatabaseId, leaderboardCollectionId, id).then((res) => {
      return res as LeaderboardEntry;
    });
  } catch {
    return null;
  }
}

export function getLeaderboardEntries(page: number = 1, limit: number = 10) {
  try {
    return databases
      .listDocuments(mainDatabaseId, leaderboardCollectionId, [
        Query.orderDesc("score"),
        Query.offset((page - 1) * limit),
        Query.limit(limit),
      ])
      .then((res) => {
        return res.documents as LeaderboardEntry[];
      });
  } catch {
    return null;
  }
}

export function createLeaderboardEntry(name: string, score: number) {
  try {
    return databases
      .createDocument(mainDatabaseId, leaderboardCollectionId, ID.unique(), {
        name,
        score,
      })
      .then((res) => {
        return res as LeaderboardEntry;
      });
  } catch {
    return null;
  }
}

export function updateLeaderboardEntry(id: string, score: number) {
  try {
    return databases
      .updateDocument(mainDatabaseId, leaderboardCollectionId, id, {
        score,
      })
      .then((res) => {
        return res as LeaderboardEntry;
      });
  } catch {
    return null;
  }
}

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