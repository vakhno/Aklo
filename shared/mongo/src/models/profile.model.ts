import mongoose, { Schema } from "mongoose";

export const ProfileSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		teachers: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true },
);

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
