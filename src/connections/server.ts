import express, { Request, Response } from "express";
import { PORT } from "../constants";
import logger from "../utils/logger";

export const app = express();

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

function shouldCompress(req: Request, res: Response) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(req, res);
}
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(
  compression({
    level: 9,
    filter: shouldCompress,
  })
);
app.use(helmet());
app.use(morgan(":status :method :url :response-time ms"));

export const server = app.listen(PORT, () => {
  logger.info(`🚀 [server]: running on port:${PORT}`);
});
