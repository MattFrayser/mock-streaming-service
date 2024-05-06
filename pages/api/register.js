import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const db = await getDbConnection();
        const { email, first_name, last_name, password, credit_card, subscription_status, device } = req.body;
        

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);
        const hashCred = await bcrypt.hash(credit_card, 10);

        const sql = `
            INSERT INTO Users (email, first_name, last_name, password, credit_card, subscription_status, device)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [email, first_name, last_name, hashPass, hashCred, subscription_status, device];
        const [result] = await db.execute(sql, values);

        // Check if the user was successfully added
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User could not be added' });
        } 

        res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await closeDbConnection();
    }
}