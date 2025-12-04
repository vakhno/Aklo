import mongoose, { Schema } from "mongoose";

export const RoomSchema = new Schema(
	{
		language: {
			type: Schema.Types.ObjectId,
			ref: "Language",
			required: true,
		},
		creatorId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		isCameraRequired: {
			type: Boolean,
			required: true,
		},
		isMicRequired: {
			type: Boolean,
			required: true,
		},
		activeUsersCount: {
			type: Number,
			default: 0,
		},
		maxUsersCount: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true },
);

export const RoomModel = mongoose.model("Room", RoomSchema);
