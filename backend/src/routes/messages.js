import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = getDB();
    const messages = await db.collection('messages')
      .find({
        $or: [
          { recipient: null },
          { recipient: req.user.id },
          { sender: req.user.id }
        ]
      })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const db = getDB();
    const messages = await db.collection('messages')
      .find({
        $or: [
          { sender: req.user.id, recipient: req.params.userId },
          { sender: req.params.userId, recipient: req.user.id }
        ]
      })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as messageRouter };