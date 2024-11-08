**Websocket-Real-time-Chat-System**<br>
**Tech Stack**<br>
**Frontend**<br>
React.js: A JavaScript library for building user interfaces, leveraging components for scalability and reusability.<br>
Vite: A fast build tool for modern web projects, offering optimized development and production workflows.<br>
Socket.IO Client: Facilitates WebSocket communication between the frontend and backend.<br>
TypeScript: Ensures type safety and better development experience with strong typing.<br><br>

**Backend**<br>
Node.js: Handles server-side logic and provides a runtime environment for the application.<br>
Express.js: A lightweight and flexible Node.js web application framework for building RESTful APIs.<br>
Socket.IO: Implements WebSocket-based real-time communication between the server and connected clients.<br>
MongoDB: A NoSQL database for storing user information, messages, and media metadata.<br>
Mongoose: Provides a schema-based solution to model MongoDB data.<br><br>

**Deployment**<br>
CORS: Configured for secure cross-origin requests between the frontend and backend.<br><br>

**Features**<br>
**Authentication:** <br>
Users are authenticated using JWT (JSON Web Tokens) to secure WebSocket connections and API routes.<br><br>

**Real-Time Messaging:** <br>
Messages are delivered in real time using Socket.IO, supporting both private and group chats.<br><br>

**Media Uploads:** <br>
Users can send and receive images and other files, which are stored on the server.<br><br>

**Online Status:** <br>
Tracks user online/offline status and broadcasts updates to other users in real time.<br><br>

**Database-Driven:** <br>
Messages and user data are stored persistently in MongoDB.<br><br>

**Scalable Frontend:** <br>
Built with React, the frontend is highly scalable, responsive, and efficient.<br><br>

**Application Architecture**<br>
**Frontend:** <br>
Connects to the backend using REST APIs for authentication and media uploads.<br>
Maintains a persistent WebSocket connection with the backend for real-time messaging.<br><br>

**Backend:** <br>
**API routes:** <br>
/auth: Handles user registration and login.<br>
/messages: Fetches stored messages from the database.<br>
/upload: Manages media uploads.<br><br>

**WebSocket handlers:** <br>
message:send: Handles incoming messages from clients.<br>
message:received: Broadcasts messages to the appropriate recipients.<br>
user:status: Tracks user presence (online/offline).<br><br>

**Database:** <br>
Users: Stores user credentials and profile details.<br>
Messages: Stores messages with sender, recipient, timestamp, and status.<br>
Uploads: Stores metadata for uploaded files (e.g., URLs, types).
