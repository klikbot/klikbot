import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import Database from "./database";
import express, { Application } from "express";
import deviceRoutes from "./routes/deviceRoutes";
import Socket from "./connections/socket";

export default class App {

	public app : Application;
	public database : Database;
	public socket : Socket;

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
		this.socket = new Socket(3000);
		dotenv.config();
	
	}

	private connectDatabase() : void {

		this.database = new Database();
	
	}

	private routes() : void {

		this.app.use("/api/devices", deviceRoutes);
	
	}

}

export const app = new App();