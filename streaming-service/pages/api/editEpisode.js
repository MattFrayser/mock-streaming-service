import mysql from "mysql2/promise";
import { getDbConnection } from './db';

export default async function handler(req, res) {


    console.log('Request Body:', req.body)

    try {
        const db = await getDbConnection();
        const { episode_ID, show_ID, episode_number, title} = req.body;
        
        const sql = `UPDATE Episode SET show_ID = ?, episode_number = ?, title = ? WHERE episode_ID = ? `;
        const values = [show_ID, episode_number, title, episode_ID];
        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Show updated successfully' });
        } else {
            res.status(404).json({ error: 'Show not found' });
        }
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}