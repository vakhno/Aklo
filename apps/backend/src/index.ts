import { initDb } from "@shared/mongo";
import { initCache } from "@shared/redis/cache";
import { initSocketEvents, initSocketServer, setupRoomListener } from "@shared/sockets";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { initAuth } from "./inits/auth.init.js";
import { initRoutes } from "./routes/index.js";

const corsConfig = {
	origin: [process.env.VITE_APP_URL, `http://127.0.0.1:${process.env.VITE_PORT}`, `http://localhost:${process.env.VITE_PORT}`],
	credentials: true,
};

const app = express();

app.set("trust proxy", true);

app.use(cookieParser());
app.use(cors(corsConfig));

initAuth({ app });

app.use(helmet());
app.use(express.json());

const { io, server } = initSocketServer(app);

app.set("io", io);

setupRoomListener(io);
initSocketEvents(io);
initRoutes(app);

server.listen(process.env.PORT, async () => {
	await initDb();
	await initCache();
});
