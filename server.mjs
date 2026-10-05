import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({
  dev,
  hostname,
  port,
});

const handle = app.getRequestHandler();

await app.prepare();

const httpServer = createServer((req, res) => {
  handle(req, res);
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://dandiya-night-one.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // ==========================================================
  // JOIN CONVERSATION
  // ==========================================================

  socket.on("joinConversation", (conversationId) => {
    if (!conversationId) {
      console.log("❌ No conversationId received");
      return;
    }

    const room = `conversation:${conversationId}`;

    socket.join(room);

    console.log(
      `➡️ Socket ${socket.id} joined ${room}`
    );
  });

  // ==========================================================
  // LEAVE CONVERSATION
  // ==========================================================

  socket.on("leaveConversation", (conversationId) => {
    if (!conversationId) return;

    const room = `conversation:${conversationId}`;

    socket.leave(room);

    console.log(
      `⬅️ Socket ${socket.id} left ${room}`
    );
  });

  // ==========================================================
  // SEND MESSAGE
  // ==========================================================

  socket.on(
    "sendMessage",
    ({ conversationId, message }) => {
      if (!conversationId || !message) {
        console.log(
          "❌ Invalid socket message"
        );
        return;
      }

      const room = `conversation:${conversationId}`;

      console.log(
        `📨 Broadcasting message to ${room}:`,
        message.text
      );

      // Send to everyone ELSE in the room
      socket.to(room).emit(
        "newMessage",
        message
      );
    }
  );

  // ==========================================================
  // DISCONNECT
  // ==========================================================

  socket.on("disconnect", () => {
    console.log(
      "🔴 Socket disconnected:",
      socket.id
    );
  });
});

httpServer.listen(port, () => {
  console.log(
    `> Ready on http://${hostname}:${port}`
  );
});