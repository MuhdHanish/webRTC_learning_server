import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { config } from "dotenv";
config();

const port = 8080;
const app = express();

const origin = ["http://localhost:5173"];
const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
app.use(cors({ origin, methods }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin, methods },
});

io.on(`connection`, (socket) => {
  const userId = socket.id;
  console.log(`[${getCurrentTime()}] User connected: ${userId} 🟢`);

  socket.on(`join-room`, () => {
    console.log(`[${getCurrentTime()}] Join room requested by ${userId} 🟠`);
    socket.emit(`joined-room`);
    console.log(`[${getCurrentTime()}] Join request accepted for ${userId} 🟢`);
  });

  socket.on(`disconnect`, () => {
    console.log(`[${getCurrentTime()}] User disconnected: ${userId} 🔴`);
  });
});

server.listen(port, () => {
  console.log(`[${getCurrentTime()}] Server listening on port ${port} 🎉`);
});

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString();
}
