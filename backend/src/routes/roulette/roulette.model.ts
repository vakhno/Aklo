import mongoose, { Schema } from "mongoose";

export const RouletteSchema = new Schema(
	{
		language: {
			type: Schema.Types.ObjectId,
			ref: "Language",
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
		priority: {
			type: Number,
			required: true,
		},
		activeUsersCount: {
			type: Number,
			required: true,
		},
	},
);

export const RouletteModel = mongoose.model("Roulette", RouletteSchema);
