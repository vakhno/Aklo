import type { RedisClientType } from "redis";

import { createClient } from "redis";

export const client = createClient({
	url: process.env.REDIS_URL,
	socket: {},
}) as RedisClientType;

client.on("error", err => console.error("Redis client error!", err));
client.on("connect", () => console.warn("Redis client successful connection!"));
