import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

prisma.$queryRaw`SELECT 1`
  .then(() => {
    logger.info(`🚀 [prisma]: connected`);
  })
  .catch((err) => {
    logger.error(`❌ [prisma]: unable to connect\n`);
    logger.error(err);
  });

export default prisma;
