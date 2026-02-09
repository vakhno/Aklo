import mongoose, { Schema } from "mongoose";

export const LanguageSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		nativeName: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		locale: {
			type: String,
			required: true,
		},
	},
	{ timestamps: false },
);

export const LanguageModel = mongoose.model("Language", LanguageSchema);
