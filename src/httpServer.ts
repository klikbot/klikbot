import { Application } from "express";
import http from "http";
import twilioService from "./service/twilio.service";

class HttpServer {

	public app: Application;
	public port: number;
	public server: http.Server;

	constructor(app : Application, port: number) {

		this.app = app;
		this.port = port || 3001;
		this.server = http.createServer(this.app);
		this.start();
	
	}

	private start() : void {

		this.server.listen(this.port, () => {

			console.log("Http server started successfully. Listening on port " + this.port + ".");
		
		});
	
	}

}

export default HttpServer;