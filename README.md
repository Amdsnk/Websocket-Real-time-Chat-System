**Websocket-Real-time-Chat-System**

**Tech Stack**
**Frontend**
React.js: A JavaScript library for building user interfaces, leveraging components for scalability and reusability.
Vite: A fast build tool for modern web projects, offering optimized development and production workflows.
Socket.IO Client: Facilitates WebSocket communication between the frontend and backend.
TypeScript: Ensures type safety and better development experience with strong typing.

**Backend**
Node.js: Handles server-side logic and provides a runtime environment for the application.
Express.js: A lightweight and flexible Node.js web application framework for building RESTful APIs.
Socket.IO: Implements WebSocket-based real-time communication between the server and connected clients.
MongoDB: A NoSQL database for storing user information, messages, and media metadata.
Mongoose: Provides a schema-based solution to model MongoDB data.

**Deployment**
CORS: Configured for secure cross-origin requests between the frontend and backend.

**Features**
**Authentication:**

Users are authenticated using JWT (JSON Web Tokens) to secure WebSocket connections and API routes.
Real-Time Messaging:

Messages are delivered in real time using Socket.IO, supporting both private and group chats.

**Media Uploads:**

Users can send and receive images and other files, which are stored on the server.

**Online Status:**

Tracks user online/offline status and broadcasts updates to other users in real time.

**Database-Driven:**

Messages and user data are stored persistently in MongoDB.

**Scalable Frontend:**

Built with React, the frontend is highly scalable, responsive, and efficient.

**Application Architecture**

**Frontend:**
Connects to the backend using REST APIs for authentication and media uploads.
Maintains a persistent WebSocket connection with the backend for real-time messaging.

**Backend:**

**API routes:**
/auth: Handles user registration and login.
/messages: Fetches stored messages from the database.
/upload: Manages media uploads.

**WebSocket handlers:**
message:send: Handles incoming messages from clients.
message:received: Broadcasts messages to the appropriate recipients.
user:status: Tracks user presence (online/offline).

**Database:**
Users: Stores user credentials and profile details.
Messages: Stores messages with sender, recipient, timestamp, and status.
Uploads: Stores metadata for uploaded files (e.g., URLs, types).
