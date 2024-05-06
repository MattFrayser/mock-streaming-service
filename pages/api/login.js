import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  let db;

  try {
    db = await getDbConnection();
    const [data] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = data[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user_ID: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    res.status(200).json({ success: true, user_ID: user.id, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (db) {
      await closeDbConnection();
    }
  }
}