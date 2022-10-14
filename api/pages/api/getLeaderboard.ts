import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb+srv://admin:admin@default.dkwit.mongodb.net/test");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const collection = client.db("general").collection("leaderboard");
    const data: any[] = [];
    await collection.find().sort({ score: -1 }).limit(20).forEach(document => { data.push(document); });
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({
      error: 500,
      message: error,
     });
  }
}
