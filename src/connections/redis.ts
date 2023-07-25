import { Redis } from "ioredis";
import { REDIS_URL } from "../constants";
import logger from "../utils/logger";

const RedisClient = new Redis(REDIS_URL);

RedisClient.on("connect", () => {
  logger.info(`🚀 [redis]: connected`);
});

RedisClient.on("error", (err: any) => {
  logger.error(`❌ [redis]: unable to connect`);
  logger.error(err);
});

export default RedisClient;
