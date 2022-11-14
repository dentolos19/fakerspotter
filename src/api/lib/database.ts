import { MongoClient } from 'mongodb';
import { connectionString } from './environment';

let client = new MongoClient(connectionString);
let clientPromise = client.connect();

export default clientPromise;