import { RedisClient } from "../connections";
import logger from "./logger";

export async function setCache(
    key: string,
    value: any,
    time_in_seconds: number,
) {
    try {
        await RedisClient.setex(key, time_in_seconds, JSON.stringify(value));
    } catch (err: any) {
        logger.error(err);
    }
}

export async function getCache(key: string) {
    try {
        let cache = await RedisClient.get(key);
        if (!cache) return null;
        cache = JSON.parse(cache);
        return cache;
    } catch (err: any) {
        logger.error(err);
        return null;
    }
}

export async function deleteCache(key: string) {
    try {
        RedisClient.del(key);
    } catch (err: any) {
        logger.error(err);
    }
}
