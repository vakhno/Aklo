import type { Express } from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

export function initSocketIo(app: Express) {
	const server = createServer(app);

	const io = new Server(server, {
		cors: {
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		},
		// serveClient: false,
	});

	return { io, server };
}
