import cors from "cors";
import express from "express";
import helmet from "helmet";

import { connectRedis } from "./configs/redis.config.js";
import { initSocketIo } from "./configs/socket.config.js";
import { registerSocketEvents } from "./events/socket.event.js";
import listRoutes from "./routes/list.routes";
import roomRoutes from "./routes/room.routes";

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
};
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/room", roomRoutes);
app.use("/api/list", listRoutes);

const { io, server } = initSocketIo(app);

registerSocketEvents(io);

server.listen(process.env.PORT, async () => {
	await connectRedis();
});
