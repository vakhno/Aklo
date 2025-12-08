import type { RedisClientType } from "redis";

import { client } from "./client";

export const subscriber = client.duplicate() as RedisClientType;

subscriber.on("connect", () => {
	// eslint-disable-next-line no-console
	console.log("Redis subscribe client connected!");
});
subscriber.on("error", (error) => {
	// eslint-disable-next-line no-console
	console.log("Redis subscribe client error!", error);
});
subscriber.on("reconnecting", () => {
	// eslint-disable-next-line no-console
	console.log("Redis subscribe client reconnecting!");
});
subscriber.on("end", () => {
	// eslint-disable-next-line no-console
	console.log("Redis subscribe client closed!");
});
