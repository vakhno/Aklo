import type { Server } from "socket.io";

import { registerRoomSocketEvents } from "./room/room.event.js";
import { registerRouletteSocketEvents } from "./roulette/roulette.event.js";

export const initSocketEvents = (io: Server) => {
	registerRoomSocketEvents(io);
	registerRouletteSocketEvents(io);
};
