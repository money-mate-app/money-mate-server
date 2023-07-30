import { config } from "dotenv";
config();

import { z } from "zod";

const envSchema = z.object({
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
});

export const __DEV__ = process.env.NODE_ENV !== "production";
export const { DATABASE_URL, PORT, REDIS_URL } = envSchema.parse(process.env);
