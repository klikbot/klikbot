import { Application } from "express";

class HttpServer {
	public app: Application;
	public port: number;

	constructor(app : Application, port: number) {
		this.app = app;
		this.port = port || 3001;
		this.start();
	}

	private start() {
		this.app.listen(this.port, () => {
			console.log("Http server started on port " + this.port + ".");
		});
	}
}

export default HttpServer;