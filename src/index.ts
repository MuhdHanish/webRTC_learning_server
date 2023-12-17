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
    cors: { origin, methods }
});

io.on(`connection`, (socket) => {
    console.log(`user connected...🟢`);
    socket.on(`disconnect`, () => { console.log(`user disconnected...🔴`); });
});

server.listen(port, () => {
    console.log(`Server listening on ${port}...🚀`);
});