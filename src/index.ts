import { app } from "./app";
import HttpServer from "./httpServer";

class Setup {

	constructor() {

		this.init();
	
	}

	init() {

		new HttpServer(app.app, 3001);
	
	}

}

export default new Setup();