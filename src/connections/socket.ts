import { Server } from "socket.io";
import { server } from "./server";
import logger from "../utils/logger";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  const userId = socket.handshake.headers.user_id ?? socket.id;
  if (!userId) return;
  logger.info(`[socket]: ${userId} joined to socket`);

  socket.join(userId);
  socket.on("disconnect", () => {
    logger.info("user disconnected", socket.id);
  });
});

export default io;
