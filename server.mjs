import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const httpServer = createServer((req, res) => {
  handle(req, res);
});

const io = new Server(httpServer, {
  cors: {
    origin: [
      // Production frontend
      "https://dandiya-night-one.vercel.app",

      // Local development
      /^http:\/\/localhost:\d+$/,

      // Another laptop / phone on the same Wi-Fi (private IP ranges)
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
      /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
      /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+:\d+$/,
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
  maxHttpBufferSize: 1e6, // 1 MB is plenty for chat messages
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // ==========================================================
  // JOIN CONVERSATION
  // ==========================================================
  socket.on("joinConversation", (conversationId) => {
    if (!conversationId) return;

    const room = `conversation:${conversationId}`;
    socket.join(room);
    console.log(`➡️ Socket ${socket.id} joined ${room}`);
  });

  // ==========================================================
  // LEAVE CONVERSATION
  //

   socket.on("leaveConversation", (conversationId) => {
    if (!conversationId) return;

    const room = `conversation:${conversationId}`;
    socket.leave(room);
    console.log(`⬅️ Socket ${socket.id} left ${room}`);
  });

  // ==========================================================
  // SEND MESSAGE  (sender -> server -> everyone else in the room)
  // ==========================================================
  socket.on("sendMessage", ({ conversationId, message } = {}) => {
    if (!conversationId || !message) {
      console.log("❌ Invalid socket message");
      return;
    }

    const room = `conversation:${conversationId}`;
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

    // roomSize 2 = sender + the other person. 1 = the other person is offline.
    console.log(
      `📨 ${room} | sockets in room: ${roomSize} | text: ${message.text}`
    );

    socket.to(room).emit("newMessage", {
      ...message,
      conversationId,
    });
  });

  // ==========================================================
  // DISCONNECT
  // ==========================================================
  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", socket.id, "REASON:", reason);
  });
});

httpServer.listen(port, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});