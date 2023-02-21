import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

class App {
	public app: Application;

	constructor() {
		console.clear();
		dotenv.config();
		
		this.app = express();
		this.config();
		this.connectDatabase();
	}


	private config(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
	}

	private connectDatabase(): void {
		mongoose.set({strictQuery: false});
		mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`)
			.then(() => {
				console.log("Database connected successfully.");
			})
			.catch((error) => {
				console.log("Unable to connect to the database:");
				console.log(error);
			});
	}
}

export default new App().app;
