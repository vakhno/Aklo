import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let isConnected = false;
let mongoClient: MongoClient | null = null;

export const getMongoUri = (): string => {
	const mongoUri = process.env.MONGO_DB_URI || "";
	if (!mongoUri || mongoUri.trim() === "") {
		throw new Error(
			"MONGO_DB_URI environment variable is required and must be a valid MongoDB connection string",
		);
	}
	return mongoUri;
};

export const getMongoClient = (): MongoClient => {
	if (!mongoClient) {
		mongoClient = new MongoClient(getMongoUri());
	}
	return mongoClient;
};

export const initDb = async () => {
	if (!isConnected) {
		try {
			await mongoose.connect(getMongoUri());
			isConnected = true;
		}
		catch (error) {
			console.warn(error);
		}
	}
};
