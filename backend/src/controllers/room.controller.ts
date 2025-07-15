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

		const { id, creatorId } = room;

		res.cookie(id, creatorId, {
			httpOnly: true,
			sameSite: "strict",
			// maxAge: 12 * 60 * 60 * 1000,
			path: "/",
		});

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

export async function joinRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const room = await roomService.getRoom(id);

		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		const { isAvailable } = room;

		if (!isAvailable) {
			res.status(409).json({ error: "Room is unavailable" });
			return;
		}

		const roomUpdates = { isAvailable: false };

		await roomService.updateRoom(id, roomUpdates);

		res.status(200).json({});
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

export async function checkIsCreator(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const room = await roomService.getRoom(id);

		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		const { creatorId } = room;

		const isCreator = !!req.cookies[`${id}`] && req.cookies[`${id}`] === creatorId;

		res.status(200).json({
			isCreator,
		});
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
