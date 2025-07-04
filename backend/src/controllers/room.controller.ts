import type { Request, Response } from "express";

import { NewRoomSchema } from "../libs/zod-schemas/new-room.schema";
import * as roomService from "../services/room.service";
import { parseGetAllRoomsQueries } from "../utils/parse-get-all-rooms-queries";

export async function createRoom(req: Request, res: Response) {
	try {
		const data = req.body;
		const validator = NewRoomSchema.safeParse(data);

		if (!validator.success) {
			const error = validator.error.errors;

			res.status(400).json({ error });
			return;
		}

		const roomData = validator.data;
		const room = await roomService.createRoom(roomData);

		res.status(201).json(room);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const room = await roomService.getRoom(id);

		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		res.status(200).json(room);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getAllRooms(req: Request, res: Response) {
	try {
		const { category, language, limit, page } = parseGetAllRoomsQueries(req);

		const { rooms, isHasMore } = await roomService.getAllRooms({
			category,
			language,
			limit,
			page,
		});

		res.status(200).json({ rooms, isHasMore });
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function deleteRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;
		await roomService.deleteRoom(id);

		res.status(204).send();
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

// export async function joinRoom(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params;
// 		const room = await roomService.updateRoomGuestCount(id, true);

// 		if (!room) {
// 			return res.status(404).json({ error: "Room not found or is full" });
// 		}

// 		res.json(room);
// 	}
// 	catch (error) {
// 		res.status(500).json({ error });
// 	}
// }

// export async function leaveRoom(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params;
// 		const room = await roomService.updateRoomGuestCount(id, false);

// 		if (!room) {
// 			return res.status(204).send(); // Room was deleted
// 		}

// 		res.json(room);
// 	}
// 	catch (error) {
// 		res.status(500).json({ error });
// 	}
// }
