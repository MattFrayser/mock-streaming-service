import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {


    try {
        const db = await getDbConnection();
        const { show_ID, title, description, season, episode, genre, image } = req.body;
        
        const sql = `UPDATE Shows SET title = ?, description = ?, season = ?, episode = ?, genre = ?, image = ? WHERE show_ID = ?`;
        const values = [title, description, season, episode, genre, image, show_ID];
        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Show updated successfully' });
        } else {
            res.status(404).json({ error: 'Show not found' });
        }
    } catch (error) {
        console.error('Failed to update show:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await closeDbConnection();
    }
    
}