import type { LanguageDocLeanType } from "../types/language";
import type { RoomDocLeanPopulatedType, RoomDocLeanType, RoomDocType, RoomInputSchemaType, RoomReadySchemaType, RoomSchemaType } from "../types/room";

import { RoomReadySchema } from "@shared/schemas/room";
import { LanguageModel } from "../models/language.model";
import { RoomModel } from "../models/room.model";

import { formatError } from "../utils/format-error";
import { isValidObjectId, toObjectId } from "../utils/object-id";

export async function createRoom(roomInput: RoomInputSchemaType, creatorId: string): Promise<RoomDocType> {
	try {
		if (!roomInput) {
			throw new Error("No room provided");
		}

		if (!creatorId) {
			throw new Error("Creator ID is required");
		}

		const roomReadyData: Partial<RoomReadySchemaType> = {
			activeUsersCount: 0,
			creatorId,
		};
		const validatedData = await RoomReadySchema.parseAsync({
			...roomInput,
			...roomReadyData,
		});
		const roomDoc = new RoomModel({
			...validatedData,
			language: toObjectId(validatedData.language),
		});
		const roomDocSaved = await roomDoc.save();

		// await createRoomCache(String(_id));

		return roomDocSaved;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getRoom(roomId: string): Promise<RoomDocLeanType | null> {
	try {
		if (!isValidObjectId(roomId)) {
			throw new Error("No room id");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean();

		if (!roomLeanModel) {
			return null;
		}

		return roomLeanModel;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getAllRooms({ language, limit, page }: { language?: string; limit: number; page: number }): Promise<{ rooms: RoomDocLeanPopulatedType[]; isHasMore: boolean }> {
	try {
		const roomFilters: Partial<RoomSchemaType> = {};

		if (language) {
			roomFilters.language = toObjectId(language);
		}

		if (limit && page) {
			const offset = (page - 1) * limit;
			const roomPopulatedLeanModel = await RoomModel.find(roomFilters)
				.skip(offset)
				.limit(limit)
				.sort({ activeUsersCount: -1, priority: 1 })
				.lean()
				.populate("language") as unknown as RoomDocLeanPopulatedType[];
			const total = await RoomModel.countDocuments(roomFilters);
			const isHasMore = Number(page) * limit < total;

			return { rooms: roomPopulatedLeanModel, isHasMore };
		}
		else {
			const roomPopulatedLeanModel = await RoomModel.find(roomFilters)
				.sort({ activeUsersCount: -1, priority: 1 })
				.lean()
				.populate("language") as unknown as RoomDocLeanPopulatedType[];

			return { rooms: roomPopulatedLeanModel, isHasMore: false };
		}
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
		if (!isValidObjectId(roomId)) {
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
		if (!isValidObjectId(roomId)) {
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
		if (!isValidObjectId(roomId)) {
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
		if (!isValidObjectId(roomId)) {
			throw new Error("No room id");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean();

		if (!roomLeanModel) {
			throw new Error("Room not found");
		}

		const { creatorId } = roomLeanModel;

		if (creator !== creatorId) {
			const updateRoom = await RoomModel.findByIdAndUpdate(
				roomId,
				[{ $set: { activeUsersCount: { $max: [0, { $add: ["$activeUsersCount", -1] }] } } }],
				{ new: true },
			);

			if (!updateRoom) {
				throw new Error("Room not found");
			}
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function updateRoom(roomId: string, updateData: Partial<{ title: string; language: string; isCameraRequired: boolean; isMicRequired: boolean; maxUsersCount: number }>): Promise<RoomDocLeanPopulatedType> {
	try {
		if (!isValidObjectId(roomId)) {
			throw new Error("Invalid room id");
		}

		const setData: Record<string, unknown> = { ...updateData };
		if (updateData.language) {
			setData.language = toObjectId(updateData.language);
		}

		const updated = await RoomModel.findByIdAndUpdate(roomId, { $set: setData }, { new: true })
			.populate("language")
			.lean() as RoomDocLeanPopulatedType | null;

		if (!updated) {
			throw new Error("Room not found");
		}

		return updated;
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
