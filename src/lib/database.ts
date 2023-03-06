import { MongoClient } from "mongodb";
import { connectionString } from "./environment";

const client = new MongoClient(connectionString);

export type LeaderboardDocument = {
  name: string;
  score: number;
};

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

function removeIds(documents: any[]) {
  for (let index = 0; index < documents.length; index++) {
    delete documents[index]._id;
  }
  return documents;
}

export async function GetLeaderboard() {
  const agent = await client.connect();
  const documents = (await agent
    .db("general")
    .collection<LeaderboardDocument>("leaderboard")
    .find()
    .sort({ score: -1 })
    .limit(10)
    .toArray()) as LeaderboardDocument[];
  return removeIds(documents);
}

export async function GetTips() {
  const agent = await client.connect();
  const documents = (await agent
    .db("general")
    .collection<TipDocument>("tips")
    .find()
    .toArray()) as TipDocument[];
  return removeIds(documents);
}

export async function GetStatementQuestions() {
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<StatementDocument>("statements")
    .find()
    .toArray()) as StatementDocument[];
  return removeIds(documents);
}

export async function GetClosedHeadlineQuestions() {
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<ClosedHeadlineDocument>("headlines-closed")
    .find()
    .toArray()) as ClosedHeadlineDocument[];
  return removeIds(documents);
}

export async function GetMultipleHeadlineQuestions() {
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<MultipleHeadlineDocument>("headlines-multiple")
    .find()
    .toArray()) as MultipleHeadlineDocument[];
  return removeIds(documents);
}

export async function GetNewsQuestions() {
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<NewsDocument>("news")
    .find()
    .toArray()) as NewsDocument[];
  return removeIds(documents);
}