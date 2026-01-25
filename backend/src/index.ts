import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { auth } from "./auth";
import { initCache } from "./cache/index.js";
import { initDb } from "./db/index.js";
import { setupRoomListener } from "./listeners/room.listener";
import { initRoutes } from "./routes";
import { initSocketEvents } from "./sockets/index.js";
import { initSocketServer } from "./sockets/server.js";

const corsConfig = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());

app.set("trust proxy", true);

app.all("/api/auth/{*any}", toNodeHandler(auth));

const { io, server } = initSocketServer(app);

app.set("io", io);

setupRoomListener(io);
initSocketEvents(io);
initRoutes(app);

server.listen(process.env.PORT, async () => {
	await initDb();
	await initCache();
});
