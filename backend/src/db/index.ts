import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let isConnected = false;
let mongoClient: MongoClient | null = null;

export const getMongoClient = (): MongoClient => {
	if (!mongoClient) {
		const mongoUri = process.env.MONGO_DB_URI || "";
		if (!mongoUri || mongoUri.trim() === "") {
			throw new Error(
				"MONGO_DB_URI environment variable is required and must be a valid MongoDB connection string",
			);
		}
		mongoClient = new MongoClient(mongoUri);
	}
	return mongoClient;
};

export const initDb = async () => {
	if (!isConnected) {
		try {
			const mongoUri = process.env.MONGO_DB_URI || "";
			await mongoose.connect(mongoUri);
			isConnected = true;
		}
		catch (error) {
			console.warn(error);
		}
	}
};
