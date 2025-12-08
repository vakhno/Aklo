import type { RedisClientType } from "redis";

import { createClient } from "redis";

const url = process.env.REDIS_URL || "";

export const client = createClient({
	url,
}) as RedisClientType;

client.on("connect", () => {
	// eslint-disable-next-line no-console
	console.log("Redis client connected!");
});
client.on("error", (error) => {
	// eslint-disable-next-line no-console
	console.log("Redis client error!", error);
});
client.on("reconnecting", () => {
	// eslint-disable-next-line no-console
	console.log("Redis client reconnecting!");
});
client.on("end", () => {
	// eslint-disable-next-line no-console
	console.log("Redis client closed!");
});
