import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express, { Application } from "express";
import api from "./routes/api";
import user from "./routes/user";
import Database from "./database/config";
import client from "./routes/client";


export default class App {

	public app : Application;
	public database!: Database;

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

		this.database = new Database();
	
	}

	private routes() : void {

		this.app.use("/api/", api);
		this.app.use("/api/user", user);
		this.app.use("/api/user", client);
	
	}

}

export const app = new App();