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

export async function getLeaderboard() {
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