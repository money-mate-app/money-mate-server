import express, { Request, Response } from "express";
import { app } from "../connections";
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

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(
  compression({
    level: 9,
    filter: shouldCompress,
  })
);
app.use(helmet());
app.use(morgan(":status :method :url :response-time ms"));

export * from "./validator";
