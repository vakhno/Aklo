import type { RedisClientType } from "redis";

import { createClient } from "redis";

export const subscriber = createClient({
	url: process.env.REDIS_URL,
	socket: {},
}) as RedisClientType;

subscriber.on("error", err => console.error("Redis subscriber error!", err));
subscriber.on("connect", () => console.warn("Redis subscriber successful connection!"));
