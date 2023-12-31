import { z } from "zod";
import { parseEnv } from "znv";
import { config } from "dotenv";
config();

export const { __DEV__, DATABASE_URL, PORT, REDIS_URL } = parseEnv(
  process.env,
  {
    __DEV__: z
      .boolean()
      .optional()
      .transform(() => process.env.NODE_ENV !== "production"),
    DATABASE_URL: z
      .string({
        required_error: "Database url is required",
      })
      .min(10, "Please provide a valid Database URL"),
    PORT: z.string().optional().default("5000"),
    REDIS_URL: z
      .string({
        required_error: "Redis url is required",
      })
      .min(10, "Please provide a valid Redis URL"),
  }
);
