import mqtt from "mqtt";
import { socket } from "..";
import deviceService from "../services/deviceService";

class Mqtt {

	public client: mqtt.MqttClient;
	private logs: boolean;

	constructor(mqttBroker: string, logs : boolean) {
	
		this.logs = logs;
		this.connect(mqttBroker);
		this.config();
		this.setActionsOnMessage();

	}

	private connect(mqttBroker : string) : void {
		
		this.client = mqtt.connect(mqttBroker);
	
	}

	private config() : void {

		this.client.on("connect", () => {

			console.log("MQTT server connected successfully.");

			this.client.subscribe("proiot/create");
			this.client.subscribe("proiot/update");
			this.client.subscribe("proiot/delete");
			this.client.subscribe("proiot/infoMessage");

		});

		this.client.on("error", (error) => {

			console.log(error);

		});
	
	}
	
	private setActionsOnMessage() : void {

		this.client.on("message", (topic, message) => {

			const messageAsString = message.toString();

			if(this.logs) {

				console.log("New message received from MQTT server.");
				console.log("Topic: " + topic);
				console.log("Message: " + messageAsString + "\n");
			
			}

				
			const messageAsJSON = JSON.parse(messageAsString);

			switch(topic) {

			case "proiot/create":

				deviceService.create(messageAsJSON.device)
					.then((device) => {
						
						if(this.logs) console.log(device);

					}).catch((error) => {

						console.log(error); 

					});

				break;

			case "proiot/update":

				deviceService.update(messageAsJSON.device._id, messageAsJSON.device)
					.then((device) => {

						if(this.logs) console.log(device);
						
					})
					.catch((error) => {

						console.log(error); 

					});

				break;

			case "proiot/delete":

				deviceService.delete(messageAsJSON.device._id)
					.then((device) => {
							
						if(this.logs) console.log(device);
						
					})
					.catch((error) => {
							
						console.log(error); 

					});

				break;

			case "proiot/infoMessage":

				socket.sendToAll("New info message received from MQTT server to " + messageAsJSON.to + " device: " + messageAsJSON.data);
			
				break;

			}
		
		});
	
	}

}

export default Mqtt;