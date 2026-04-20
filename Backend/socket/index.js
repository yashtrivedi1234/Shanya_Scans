import { Server } from "socket.io";
import trackingSocket from "./tracking.js";

export const onlineUsers = new Map();
export const onlineActiveUsers = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET] Client connected: ${socket.id}`);

    // ✅ Attach tracking related events
    trackingSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`[SOCKET] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
