import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env["MONGODB_URI"] as string);

const apiKey = process.env["DATABASE_API_KEY"] as string;
const apiUrl = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fisvz/endpoint/data/v1";

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

export async function getLeaderboard() {
  /*
  const agent = await client.connect();
  const documents = (await agent
    .db("general")
    .collection<LeaderboardDocument>("leaderboard")
    .find()
    .sort({ score: -1 })
    .limit(10)
    .toArray()) as LeaderboardDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "general",
      collection: "leaderboard",
      sort: { score: -1 },
      limit: 10,
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as LeaderboardDocument[]);
}

export async function getTips() {
  /*
  const agent = await client.connect();
  const documents = (await agent.db("general").collection<TipDocument>("tips").find().toArray()) as TipDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "general",
      collection: "tips",
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as TipDocument[]);
}

export async function getStatementQuestions() {
  /*
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<StatementDocument>("statements")
    .find()
    .toArray()) as StatementDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "questions",
      collection: "statements",
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as StatementDocument[]);
}

export async function getClosedHeadlineQuestions() {
  /*
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<ClosedHeadlineDocument>("headlines-closed")
    .find()
    .toArray()) as ClosedHeadlineDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "questions",
      collection: "headlines-closed",
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as ClosedHeadlineDocument[]);
}

export async function getMultipleHeadlineQuestions() {
  /*
  const agent = await client.connect();
  const documents = (await agent
    .db("questions")
    .collection<MultipleHeadlineDocument>("headlines-multiple")
    .find()
    .toArray()) as MultipleHeadlineDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "questions",
      collection: "headlines-multiple",
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as MultipleHeadlineDocument[]);
}

export async function getNewsQuestions() {
  /*
  const agent = await client.connect();
  const documents = (await agent.db("questions").collection<NewsDocument>("news").find().toArray()) as NewsDocument[];
  return removeIds(documents);
  */
  return fetch(`${apiUrl}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      dataSource: "Default",
      database: "questions",
      collection: "news",
    }),
    cache: "no-cache",
  })
    .then((response) => response.json())
    .then((data) => data.documents as NewsDocument[]);
}