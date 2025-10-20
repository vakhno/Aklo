import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { connectRedis } from "./configs/redis.config.js";
import { initSocketIo } from "./configs/socket.config.js";
import { registerRoomSocketEvents } from "./events/room.event.js";
import { registerRouletteSocketEvents } from "./events/roulette.event.js";
import listRoutes from "./routes/list.routes";
import roomRoutes from "./routes/room.routes";
import rouletteRoutes from "./routes/roulette.routes.js";

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
};
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/room", roomRoutes);
app.use("/api/roulette", rouletteRoutes);
app.use("/api/list", listRoutes);

const { io, server } = initSocketIo(app);

app.set("io", io);

registerRoomSocketEvents(io);
registerRouletteSocketEvents(io);

server.listen(process.env.PORT, async () => {
	await connectRedis(io);
});
