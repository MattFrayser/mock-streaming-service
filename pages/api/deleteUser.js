import mysql from "mysql2/promise";

import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email }   = req.body;
    console.log(email);


    try {
        const db = await getDbConnection();
        const sql = `DELETE FROM Users WHERE email = ?`;
        const values = [email];

        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Failed to delete:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    } finally {
        await closeDbConnection();
    }
}