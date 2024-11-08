import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getDB } from '../db.js';
import { hashPassword, comparePassword } from '../utils/auth.js';

const router = Router();

const userSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6)
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = userSchema.parse(req.body);
    const db = getDB();

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.collection('users').insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    const token = jwt.sign(
      { id: user.insertedId, username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = userSchema.parse(req.body);
    const db = getDB();

    const user = await db.collection('users').findOne({ username });
    if (!user || !await comparePassword(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router as authRouter };