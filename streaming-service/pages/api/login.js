import bcrypt from "bcrypt";
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import mysql from "mysql2/promise";
import { getDbConnection, closeDbConnection } from './db';

export default async function handler(req, res) {
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

    const token = sign({ email: user.email }, process.env.KEY, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', serialize('auth', token, {
      path: '/',
      httpOnly: true,
      maxAge: 3600
    }));

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (db) {
      await closeDbConnection();
    }
  }
}
