import type { ProfileDocLeanType, ProfileDocType } from "../types/profile";

import { ProfileModel } from "../models/profile.model";

import { formatError } from "../utils/format-error";

export async function createProfile(userId: string): Promise<ProfileDocType> {
	try {
		if (!userId) {
			throw new Error("No user id provided");
		}

		const profileDoc = new ProfileModel({ userId, teachers: [] });
		const saved = await profileDoc.save();

		return saved;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getProfile(userId: string): Promise<ProfileDocLeanType | null> {
	try {
		if (!userId) {
			throw new Error("No user id provided");
		}

		return await ProfileModel.findOne({ userId }).lean();
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getOrCreateProfile(userId: string): Promise<ProfileDocLeanType> {
	try {
		if (!userId) {
			throw new Error("No user id provided");
		}

		const profile = await ProfileModel.findOneAndUpdate(
			{ userId },
			{ $setOnInsert: { userId, teachers: [] } },
			{ new: true, upsert: true },
		).lean();

		if (!profile) {
			throw new Error("Profile not found after upsert");
		}

		return profile;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function addTeacher(userId: string, teacherId: string): Promise<ProfileDocLeanType> {
	try {
		if (!userId || !teacherId) {
			throw new Error("User id and teacher id are required");
		}

		const updated = await ProfileModel.findOneAndUpdate(
			{ userId },
			{ $addToSet: { teachers: teacherId } },
			{ new: true },
		).lean();

		if (!updated) {
			throw new Error("Profile not found");
		}

		return updated;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function removeTeacher(userId: string, teacherId: string): Promise<ProfileDocLeanType> {
	try {
		if (!userId || !teacherId) {
			throw new Error("User id and teacher id are required");
		}

		const updated = await ProfileModel.findOneAndUpdate(
			{ userId },
			{ $pull: { teachers: teacherId } },
			{ new: true },
		).lean();

		if (!updated) {
			throw new Error("Profile not found");
		}

		return updated;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function setTeachers(userId: string, teacherIds: string[]): Promise<ProfileDocLeanType> {
	try {
		if (!userId) {
			throw new Error("No user id provided");
		}

		const updated = await ProfileModel.findOneAndUpdate(
			{ userId },
			{ $set: { teachers: teacherIds } },
			{ new: true },
		).lean();

		if (!updated) {
			throw new Error("Profile not found");
		}

		return updated;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteProfile(userId: string): Promise<void> {
	try {
		if (!userId) {
			throw new Error("No user id provided");
		}

		const deleted = await ProfileModel.findOneAndDelete({ userId });

		if (!deleted) {
			throw new Error("Profile not found");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}
