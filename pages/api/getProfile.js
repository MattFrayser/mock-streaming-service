import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'ID parameter is required' });
  }

  try {
    const db = await getDbConnection();
    const query = `
    SELECT u.email, CONCAT(u.first_name, ' ', u.last_name)as 'name' , u.subscription_status, s.title, s.image
    FROM Users u
    JOIN Watch_History h ON u.email = h.user_ID
    JOIN Shows s ON h.show_ID = s.show_ID
    WHERE u.email = ?
    `;

    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(404).json({ error: ' not found' });
    }

    console.log(results);
    res.status(200).json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await closeDbConnection();
}
}