import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDbConnection();
    const query = `SELECT * FROM Subscription`;
    const results = await db.query(query, []);

    console.log(results);
    res.status(200).json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await closeDbConnection();
}
}