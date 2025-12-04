import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import type { LanguageDocLeanType } from "../libs/types/language.type";
import type { RoomDocLeanType, RoomDocType, RoomInputSchemaType, RoomReadySchemaType, RoomSchemaType } from "../libs/types/room.type";

import { RoomReadySchema } from "../libs/zod-schemas/room.schema";
import { LanguageModel } from "../routes/language/language.model";
import { RoomModel } from "../routes/room/room.model";
import { formatError } from "../utils/format-error";
import { createRoomCache } from "./room-cache.service";

export async function createRoom(roomInput: RoomInputSchemaType): Promise<RoomDocType> {
	try {
		if (!roomInput) {
			throw new Error("No room provided");
		}

		const roomReadyData: Partial<RoomReadySchemaType> = {
			activeUsersCount: 0,
			creatorId: uuidv4(),
		};
		const validatedData = await RoomReadySchema.parseAsync({
			...roomInput,
			...roomReadyData,
		});
		const roomDoc = new RoomModel(validatedData);
		const { _id } = roomDoc;
		const roomDocSaved = await roomDoc.save();

		await createRoomCache(String(_id));

		return roomDocSaved;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getRoom(roomId: string): Promise<RoomDocLeanType> {
	try {
		if (!Types.ObjectId.isValid(roomId)) {
			throw new Error("No room id");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean();

		if (!roomLeanModel) {
			throw new Error("Room not found");
		}

		return roomLeanModel;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getAllRooms({ language, limit, page }: { language?: string; limit: number; page: number }): Promise<{ rooms: RoomDocLeanType[]; isHasMore: boolean }> {
	try {
		// await deleteAllRooms();
		// await deleteAllRoomsCache();

		const offset = (page - 1) * limit;
		const roomFilters: Partial<RoomSchemaType> = {};

		if (language) {
			roomFilters.language = new Types.ObjectId(language);
		}

		const roomPopulatedLeanModel = await RoomModel.find(roomFilters)
			.skip(offset)
			.limit(limit)
			.sort({ activeUsersCount: -1, priority: 1 })
			.lean();
		const total = await RoomModel.countDocuments(roomFilters);
		const isHasMore = Number(page) * limit < total;

		return { rooms: roomPopulatedLeanModel, isHasMore };
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function resetAllRooms(): Promise<void> {
	try {
		await RoomModel.updateMany({}, { $set: { activeUsersCount: 0 } });
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function resetRoom(roomId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(roomId)) {
			throw new Error("No room id");
		}

		const resetRoom = await RoomModel.findByIdAndUpdate(roomId, { $set: { activeUsersCount: 0 } }, { new: true });

		if (!resetRoom) {
			throw new Error("No room update");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteAllRooms(): Promise<void> {
	try {
		await RoomModel.deleteMany();
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteRoom(roomId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(roomId)) {
			throw new Error("No room id");
		}

		const deletedRoom = await RoomModel.findByIdAndDelete(roomId);

		if (!deletedRoom) {
			throw new Error("No room deleted");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function joinRoom(roomId: string, creator: string | undefined): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(roomId)) {
			throw new Error("No room id");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean();

		if (!roomLeanModel) {
			throw new Error("Room not found");
		}

		const { creatorId } = roomLeanModel;

		if (creator !== creatorId) {
			const updatedRoom = await RoomModel.findByIdAndUpdate(roomId, { $inc: { activeUsersCount: 1 } }, { new: true });

			if (!updatedRoom) {
				throw new Error("Room not found");
			}
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function leftRoom(roomId: string, creator: string | undefined): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(roomId)) {
			throw new Error("No room id");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean();

		if (!roomLeanModel) {
			throw new Error("Room not found");
		}

		const { creatorId } = roomLeanModel;

		if (creator !== creatorId) {
			const updateRoom = await RoomModel.findByIdAndUpdate(roomId, { $inc: { activeUsersCount: -1 } }, { new: true });

			if (!updateRoom) {
				throw new Error("Room not found");
			}
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getRoomsLanguages(): Promise<LanguageDocLeanType[]> {
	try {
		const languageIdList = await RoomModel.distinct("language");
		const roomLanguageList = await LanguageModel.find({ _id: { $in: languageIdList } }).lean();

		return roomLanguageList;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}
