import { Server } from 'socket.io';

export const initSocket = (server) => {
  return new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
};