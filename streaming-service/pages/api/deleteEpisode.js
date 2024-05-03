import mysql from "mysql2/promise";
import { getDbConnection } from './db';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const episode_ID  = req.body;


    try {
        const db = await getDbConnection();
        const sql = `DELETE FROM Episode WHERE episode_ID = ?`;
        const values = [episode_ID];

        if (!show_ID) {
            return res.status(400).json({ error: 'Episode ID is required' });
        }

        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Episode deleted successfully' });
        } else {
            res.status(404).json({ error: 'Episode not found' });
        }
    } catch (error) {
        console.error('Failed to delete show:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}