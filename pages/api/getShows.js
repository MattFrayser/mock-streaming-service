import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {

  const db = await getDbConnection();

  try {
    // query
    const query = "SELECT * FROM Shows";
    const [data] = await db.query(query, []);

    res.status(200).json({ results: data })

    
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await closeDbConnection();
}
}