/*
 * This file is responsible for initializing the 
 * express application, configuring the application 
 * and connecting to the database.
 */

import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Application } from "express";
import deviceRoutes from "./routes/deviceRoutes";

class App {
	public app : Application;

	constructor() {
		this.app = express();
		this.config();
		this.connectDatabase();
		this.routes();
	}

	private config() : void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		dotenv.config();
	}

	private connectDatabase() : void {
		mongoose.set({strictQuery : false});
		mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`)
			.then(() => {
				console.log("Database connected successfully.");
			})
			.catch((error) => {
				console.log("Unable to connect to the database:");
				console.log(error);
			});
	}

	private routes() : void {
		this.app.use("/api/devices", deviceRoutes);
	}
}

export default new App().app;
