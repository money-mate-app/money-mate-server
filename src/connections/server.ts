import express from "express";
import { PORT } from "../constants";
import logger from "../utils/logger";

export const app = express();

export const server = app.listen(PORT, () => {
  logger.info(`🚀 [server]: running on port:${PORT}`);
});
