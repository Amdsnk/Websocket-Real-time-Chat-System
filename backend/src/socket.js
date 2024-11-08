import { getDB } from './db.js';
import { verifyToken } from './utils/auth.js';

const connectedUsers = new Map();

export function setupSocketHandlers(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const user = await verifyToken(token);
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    connectedUsers.set(userId, socket.id);

    // Broadcast user online status
    io.emit('user:status', { userId, status: 'online' });

    socket.on('message:send', async (data) => {
      try {
        const db = getDB();
        const message = {
          ...data,
          sender: userId,
          timestamp: new Date(),
          status: 'sent'
        };

        await db.collection('messages').insertOne(message);
        
        // Send to specific user if private message
        if (data.recipient) {
          const recipientSocket = connectedUsers.get(data.recipient);
          if (recipientSocket) {
            io.to(recipientSocket).emit('message:received', message);
          }
        } else {
          // Broadcast to all if no specific recipient
          socket.broadcast.emit('message:received', message);
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      connectedUsers.delete(userId);
      io.emit('user:status', { userId, status: 'offline' });
    });
  });
}