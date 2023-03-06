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