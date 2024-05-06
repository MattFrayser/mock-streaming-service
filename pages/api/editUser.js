import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {


    console.log('Request Body:', req.body)

    try {
        const db = await getDbConnection();
        const { name, email, subscription_status } = req.body;
        
        const sql = `UPDATE Users SET email = ?, name = ?, subscription_status = ? WHERE email = ?`;
        const values = [email, name, subscription_status, email];
        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Show updated successfully' });
        } else {
            res.status(404).json({ error: 'Show not found' });
        }
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await closeDbConnection();
    }
    
}