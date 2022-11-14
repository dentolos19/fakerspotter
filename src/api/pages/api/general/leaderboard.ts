import clientPromise from '../../../lib/database';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = await clientPromise;
    switch (req.method) {
        case 'GET':
            const data: any[] = [];
            await client
                .db('general')
                .collection('leaderboard')
                .find()
                .sort({ score: -1 })
                .limit(20)
                .forEach(document => {
                    data.push(document);
                });
            res.status(200).json(data);
            break;
        case 'POST':
            await client
                .db('general')
                .collection('leaderboard')
                .insertOne(req.body);
            res.status(201).end();
            break;
        default:
            res.status(500).end();
            break;
    }
}