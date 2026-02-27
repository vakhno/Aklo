import type { Request, Response } from "express";

import { RoomInputSchema } from "../../libs/zod-schemas/room.schema.js";
import * as roomCacheService from "../../services/room-cache.service.js";
import * as roomService from "../../services/room.service.js";
import { getCookies } from "../../utils/get-cookies.js";
import { parseGetAllRoomsQueries } from "../../utils/parse-get-all-rooms-queries.js";

export async function updateRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Room id is required" });
			return;
		}

		const updated = await roomService.updateRoom(id, req.body);
		res.status(200).json(updated);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function getRoomUsers(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Room id is required" });
			return;
		}

		const cache = await roomCacheService.getRoomCache(id);
		res.status(200).json({ users: cache.availableUsers });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function removeRoomUser(req: Request, res: Response) {
	try {
		const { id, userId } = req.params;
		if (!id || !userId) {
			res.status(400).json({ error: "Room id and user id are required" });
			return;
		}

		await roomCacheService.leftRoomCache(id, userId, undefined);
		await roomService.leftRoom(id, undefined);

		const io = req.app.get("io");
		const roomNamespace = io.of("/room");
		roomNamespace.to(userId).emit("admin-room-kick");

		res.status(200).json({ success: true });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function createRoom(req: Request, res: Response) {
	try {
		const data = req.body;
		const { data: parsedData, success, error } = RoomInputSchema.safeParse(data);

		if (!success) {
			const errorMessage = error.errors;

			// eslint-disable-next-line no-console
			console.log({ error: errorMessage });

			res.status(400).json({ error: errorMessage });

			return;
		}

		const createdRoom = await roomService.createRoom(parsedData);
		const { _id, creatorId } = createdRoom;

		res.cookie(String(_id), creatorId, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 7200000,
			path: "/",
		});

		res.status(201).json(createdRoom);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function getRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room id is required" });

			res.status(400).json({ error: "Room id is required" });

			return;
		}

		const room = await roomService.getRoom(id);

		if (!room) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room not found" });

			res.status(404).json({ error: "Room not found" });

			return;
		}

		res.status(200).json(room);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function getAllRooms(req: Request, res: Response) {
	try {
		const { language, limit, page } = parseGetAllRoomsQueries(req);
		const { rooms, isHasMore } = await roomService.getAllRooms({
			language,
			limit,
			page,
		});

		res.status(200).json({ rooms, isHasMore });
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function resetAllRooms(req: Request, res: Response) {
	try {
		await roomService.resetAllRooms();
		await roomCacheService.resetAllRoomsCache();

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function resetRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room id is required" });

			res.status(400).json({ error: "Room id is required" });

			return;
		}

		await roomService.resetRoom(id);
		await roomCacheService.resetRoomCache(id);

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function deleteRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room id is required" });

			res.status(400).json({ error: "Room id is required" });

			return;
		}

		await roomCacheService.deleteRoomCache(id);
		await roomService.deleteRoom(id);

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
		// eslint-disable-next-line no-console
		console.log({ error });

		res.status(500).json({ error });
	}
}

export async function deleteAllRooms(req: Request, res: Response) {
	try {
		await roomService.deleteAllRooms();
		await roomCacheService.deleteAllRoomsCache();

		res.status(200).send();
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function joinRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room id is required" });

			res.status(400).json({ error: "Room id is required" });

			return;
		}

		const cookies = getCookies({ req });
		const creator = cookies?.[id];

		await roomService.joinRoom(id, creator);

		res.status(200).end();
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function leftRoom(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room id is required" });

			res.status(400).json({ error: "Room id is required" });

			return;
		}

		const cookies = getCookies({ req });
		const creator = cookies?.[id];

		await roomService.leftRoom(id, creator);

		res.status(200).send();
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function getRoomsLanguages(req: Request, res: Response) {
	try {
		const roomsLanguages = await roomService.getRoomsLanguages();

		res.status(200).json(roomsLanguages);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function checkIsCreator(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Id is required" });

			res.status(400).json({ error: "Id is required" });

			return;
		}

		const room = await roomService.getRoom(id);

		if (!room) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room not found" });

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
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function isAvailableToVisit(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Id is required" });

			res.status(400).json({ error: "Id is required" });

			return;
		}

		const room = await roomService.getRoom(id);

		if (!room) {
			// eslint-disable-next-line no-console
			console.log({ error: "Room not found" });

			res.status(404).json({ error: "Room not found" });

			return;
		}

		const { creatorId, activeUsersCount, maxUsersCount } = room;
		const cookies = getCookies({ req });
		const isCreator = !!cookies[id] && cookies[id] === creatorId;

		if (isCreator || activeUsersCount < maxUsersCount) {
			res.status(200).json();

			return;
		}

		// eslint-disable-next-line no-console
		console.log({ error: "Room is unavailable to join" });

		res.status(409).json({ error: "Room is unavailable to join" });
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

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
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}
