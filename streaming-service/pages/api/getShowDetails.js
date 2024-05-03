import mysql from "mysql2/promise";
import { getDbConnection } from './db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'ID parameter is required' });
  }

  try {
    const db = await getDbConnection();
    const query = `
      SELECT Shows.*, Episode.episode_title, Episode.episode_number, Episode.episode_video
      FROM Shows
      JOIN Episode ON Shows.show_ID = Episode.show_ID
      WHERE Shows.show_ID = ?
    `;
    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Show not found' });
    }

    const showDetails = {
      ...results[0],
      episodes: results.map(row => ({
        episode_title: row.episode_title,
        episode_number: row.episode_number,
        episode_video: row.episode_video
      }))
    };

    console.log(showDetails);
    res.status(200).json(showDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}