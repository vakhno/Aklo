import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { initCache } from "./cache/index.js";
import { initDb } from "./db/index.js";
import { initRoutes } from "./routes";
import { initSocketEvents } from "./sockets/index.js";
import { initSocketServer } from "./sockets/server.js";

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
};
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

const { io, server } = initSocketServer(app);

app.set("io", io);

initSocketEvents(io);
initRoutes(app);

server.listen(process.env.PORT, async () => {
	await initDb();
	await initCache(io);
});
