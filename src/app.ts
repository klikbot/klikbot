import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express, { Application } from "express";
import api from "./routes/api";
import user from "./routes/user";
import sale from "./routes/sale";
import Database from "./database/config";
import product from "./routes/product";
import client from "./routes/client";
import twilio from "./routes/twilio";
import ngrok from "ngrok";

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
		this.upNgrok();
	
	}

	private connectDatabase() : void {

		this.database = new Database();
	
	}

	private routes() : void {

		this.app.use("/api/", api);
		this.app.use("/api/user", user);
		this.app.use("/api/user", sale);
		this.app.use("/api/user", product);
		this.app.use("/api/user", client);
		this.app.use("/api/webhook", twilio);
	
	}

	private async upNgrok() {
		const ng = await ngrok.connect(3001);
		console.log(ng);
	}

}

export const app = new App();