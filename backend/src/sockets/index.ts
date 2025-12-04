import type { Server } from "socket.io";

import { registerRoomSocketEvents } from "./room/room.event";
import { registerRouletteSocketEvents } from "./roulette/roulette.event";

export const initSocketEvents = (io: Server) => {
	registerRoomSocketEvents(io);
	registerRouletteSocketEvents(io);
};
