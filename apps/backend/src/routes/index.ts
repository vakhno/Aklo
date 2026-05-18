import type { Express } from "express";

import { API_MOUNT, API_PREFIX } from "@shared/routes/constants";

import languageRoutes from "./language/language.routes.js";
import roomRoutes from "./room/room.routes.js";
import rouletteRoutes from "./roulette/roulette.routes.js";
import userRoutes from "./user/user.routes.js";

export const initRoutes = (app: Express) => {
	app.use(`${API_PREFIX}${API_MOUNT.language}`, languageRoutes);
	app.use(`${API_PREFIX}${API_MOUNT.room}`, roomRoutes);
	app.use(`${API_PREFIX}${API_MOUNT.roulette}`, rouletteRoutes);
	app.use(`${API_PREFIX}${API_MOUNT.user}`, userRoutes);
};
