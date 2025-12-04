import type { Express } from "express";

import languageRoutes from "./language/language.routes.js";
import roomRoutes from "./room/room.routes.js";
import rouletteRoutes from "./roulette/roulette.routes.js";

export const initRoutes = (app: Express) => {
	app.use("/api/language", languageRoutes);
	app.use("/api/room", roomRoutes);
	app.use("/api/roulette", rouletteRoutes);
};
