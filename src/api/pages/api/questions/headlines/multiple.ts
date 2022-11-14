import clientPromise from '../../../../lib/database';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            const client = await clientPromise;
            const data: any[] = [];
            await client
                .db('questions')
                .collection('headlines-multiple')
                .find()
                .forEach(document => {
                    data.push(document);
                });
            res.status(200).json(data);
            break;
        default:
            res.status(500).end();
            break;
    }
}