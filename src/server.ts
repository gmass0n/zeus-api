require("dotenv").config();

import * as express from "express";

import "express-async-errors";

import * as cors from "cors";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

import { routes } from "./routes";

import { errorHandler } from "./middlewares/errorHandler";

import { startDatabase } from "./database";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorHandler);

const http = createServer(app);

const io = new SocketServer(http, {
  transports: ["websocket"],
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.sockets.sockets.forEach((s) => {
      if (s.id !== socket.id) {
        s.emit("message", message);
      }
    });

    console.log(message);
  });
});

http.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}.`);

  startDatabase();
});
