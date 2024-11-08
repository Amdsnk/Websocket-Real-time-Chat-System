import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './db.js';
import { setupSocketHandlers } from './socket.js';
import { authRouter } from './routes/auth.js';
import { messageRouter } from './routes/messages.js';
import { uploadRouter } from './routes/upload.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Routes
app.use('/auth', authRouter);
app.use('/messages', messageRouter);
app.use('/upload', uploadRouter);

// Socket.IO setup
setupSocketHandlers(io);

// Connect to MongoDB
connectDB().then(() => {
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});