import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {


    try {
        const db = await getDbConnection();
        console.log(req.body)
        const { episode_number, show_title, episode_title, episode_video } = req.body;
        
        const sql = `CALL AddEpisode(?, ?, ?, ?)`;
        const values = [episode_number, show_title, episode_title, episode_video];
        const [result] = await db.execute(sql, values);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'Show not found' });
        }

        res.status(200).json({ message: 'Updated successfully' });

    } catch (error) {
        console.error('Failed to update show:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await closeDbConnection();
    }
    
}