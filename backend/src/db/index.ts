import mongoose from "mongoose";

let isConnected = false;

export const initDb = async () => {
	if (!isConnected) {
		try {
			const mongoUri = process.env.MONGO_DB_URL || "";
			await mongoose.connect(mongoUri);
			isConnected = true;
		}
		catch (error) {
			console.warn(error);
		}
	}
};
