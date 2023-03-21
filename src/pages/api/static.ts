import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query as { name: string };
  const dir = path.join(process.cwd(), "public", "static");
  const contents = await fs.readFile(path.join(dir, name), "utf8");
  res.status(200).send(contents);
}