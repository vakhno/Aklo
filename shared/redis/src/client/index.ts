import type { RedisClientType } from "redis";

let redis: RedisClientType | null = null;

export function setRedisClient(client: RedisClientType): void {
	redis = client;
}

export function getRedisClient(): RedisClientType {
	if (!redis) {
		throw new Error("Redis client not configured. Call setRedisClient after the client is created.");
	}
	return redis;
}
