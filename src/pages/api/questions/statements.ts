import { GetStatementQuestions } from "@/lib/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await GetStatementQuestions();
  res.status(200).json(data);
}