import type { Request, Response } from "express";

import { NewRoomSchema } from "../libs/zod-schemas/new-room.schema";
import * as roomService from "../services/room.service";
import { getCookies } from "../utils/get-cookies";
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
			secure: true,
			sameSite: "none",
			maxAge: 7200000,
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

		const sockets = await req.app.get("io").in(id).fetchSockets();

		for (const socket of sockets) {
			socket.data.roomDeleted = true;
		}

		req.app.get("io").to(id).emit("room-deleted", { roomId: id });

		res.clearCookie(id, {
			path: "/",
			sameSite: "none",
			secure: true,
			httpOnly: true,
		});

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

		const cookies = getCookies({ req });
		const isCreator = !!cookies[id] && cookies[id] === creatorId;

		res.status(200).json({
			isCreator,
		});
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getOwnRoomIds(req: Request, res: Response) {
	try {
		const cookies = getCookies({ req });
		const ownRoomIds = Object.values(cookies);

		res.status(200).json({ ids: ownRoomIds });
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
