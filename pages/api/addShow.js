import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {


    try {
        const db = await getDbConnection();
        console.log(req.body)
        const { title, description, genre, image } = req.body;
        
        const sql = `INSERT INTO Shows (title, description, genre, image) VALUES(title = ?, description = ?, genre = ?, image = ?`;
        const values = [title, description, genre, image];
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