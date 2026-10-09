// import { createServer } from "http";
// import next from "next";
// import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "0.0.0.0";
// const port = process.env.PORT || 3000;

// const app = next({
//   dev,
//   hostname,
//   port,
// });

// const handle = app.getRequestHandler();

// await app.prepare();

// const httpServer = createServer((req, res) => {
//   handle(req, res);
// });

// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: "https://dandiya-night-one.vercel.app",
// //     methods: ["GET", "POST"],
// //     credentials: true,
// //   },
// // });

// const io = new Server(httpServer, {
//   cors: {
//     origin: [
//       "https://dandiya-night-one.vercel.app",
//       "http://localhost:3000",
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
//   transports: ["websocket"],
// });

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   // ==========================================================
//   // JOIN CONVERSATION
//   // ==========================================================

//   socket.on("joinConversation", (conversationId) => {
//     if (!conversationId) {
//       console.log("❌ No conversationId received");
//       return;
//     }

//     const room = `conversation:${conversationId}`;

//     socket.join(room);

//     console.log(
//       `➡️ Socket ${socket.id} joined ${room}`
//     );
//   });

//   // ==========================================================
//   // LEAVE CONVERSATION
//   // ==========================================================

//   socket.on("leaveConversation", (conversationId) => {
//     if (!conversationId) return;

//     const room = `conversation:${conversationId}`;

//     socket.leave(room);

//     console.log(
//       `⬅️ Socket ${socket.id} left ${room}`
//     );
//   });

//   // ==========================================================
//   // SEND MESSAGE
//   // ==========================================================

//   // socket.on(
//   //   "sendMessage",
//   //   ({ conversationId, message }) => {
//   //     if (!conversationId || !message) {
//   //       console.log(
//   //         "❌ Invalid socket message"
//   //       );
//   //       return;
//   //     }

//   //     const room = `conversation:${conversationId}`;

//   //     console.log(
//   //       `📨 Broadcasting message to ${room}:`,
//   //       message.text
//   //     );

//   //     // Send to everyone ELSE in the room
//   //     socket.to(room).emit(
//   //       "newMessage",
//   //       message
//   //     );
//   //   }
//   // );

//   socket.on("sendMessage", ({ conversationId, message }) => {
//   if (!conversationId || !message) return;

//   const room = `conversation:${conversationId}`;

//   socket.to(room).emit("newMessage", {
//     ...message,
//     conversationId,
//   });
// });

//   // ==========================================================
//   // DISCONNECT
//   // ==========================================================

//  socket.on("disconnect", (reason) => {
//   console.log(
//     "🔴 Socket disconnected:",
//     socket.id,
//     "REASON:",
//     reason
//   );
// });

//   socket.on("connect_error", (error) => {
//     console.error(
//       "❌ SOCKET CONNECTION ERROR:",
//       error.message,
//       error.description,
//       error.context
//     );
//   });

// });

// httpServer.listen(port, () => {
//   console.log(
//     `> Ready on http://${hostname}:${port}`
//   );
// });


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
      "https://dandiya-night-one.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
  maxHttpBufferSize: 5e6, // 5 MB (default is 1 MB)
});

// Lets API routes (same Node process) broadcast: globalThis.io.to(room).emit(...)
globalThis.io = io;

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // DEBUG: log every event the client sends
  socket.onAny((event) => {
    console.log("📥 EVENT FROM CLIENT:", event, "| socket:", socket.id);
  });

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
    console.log(`➡️ Socket ${socket.id} joined ${room}`);
  });

  // ==========================================================
  // LEAVE CONVERSATION
  // ==========================================================
  socket.on("leaveConversation", (conversationId) => {
    if (!conversationId) return;

    const room = `conversation:${conversationId}`;
    socket.leave(room);
    console.log(`⬅️ Socket ${socket.id} left ${room}`);
  });

  // ==========================================================
  // SEND MESSAGE (client -> server -> other users in room)
  // ==========================================================
  socket.on("sendMessage", ({ conversationId, message } = {}) => {
    if (!conversationId || !message) {
      console.log("❌ Invalid socket message");
      return;
    }

    const room = `conversation:${conversationId}`;

    // How many OTHER sockets are in this room right now?
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

    console.log(
      `📨 Broadcasting to ${room} | sockets in room: ${roomSize} | text: ${message.text}`
    );

    // Everyone in the room EXCEPT the sender
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