import { app } from "./app";
import Mqtt from "./connections/mqqt";
import HttpServer from "./connections/httpServer";

class Setup {

	constructor() {

		this.init();
	
	}

	init() {

		new HttpServer(app.app, 3001);

		new Mqtt(process.env.MQTT_BROKER || "mqtt://localhost:1883", true);
	
	}

}

export default new Setup();