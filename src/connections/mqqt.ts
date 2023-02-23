import mqtt from "mqtt";
import deviceService from "../services/deviceService";

class Mqtt {

	public client: mqtt.MqttClient;
	private logs: boolean;

	constructor(mqttBroker: string, logs : boolean) {
	
		this.logs = logs;
		this.connect(mqttBroker);
		this.config();

	}

	private connect(mqttBroker : string) : void {
		
		this.client = mqtt.connect(mqttBroker);
	
	}

	private config() : void {

		this.client.on("connect", () => {

			console.log("Connected to MQTT server.");

			this.client.subscribe("proiot/create");
			this.client.subscribe("proiot/update");
			this.client.subscribe("proiot/delete");
			this.client.subscribe("proiot/message");

		});

		this.client.on("error", (error) => {

			console.log(error);

		});

		this.client.on("message", (topic, message) => {

			const messageAsString = message.toString();

			if(this.logs) {

				console.log("\nNew message received from MQTT server.");
				console.log("Topic: " + topic);
				console.log("Message: " + messageAsString + "\n");
			
			}

			if(topic !== "proiot/message") {
				
				const messageAsJSON = JSON.parse(messageAsString);

				switch(topic) {

				case "create":

					deviceService.create(messageAsJSON.device)
						.then((device) => {
						
							console.log(device);

						}).catch((error) => {

							console.log(error); 

						});

					break;

				case "update":

					deviceService.update(messageAsJSON.device._id, messageAsJSON.device)
						.then((device) => {

							console.log(device);
						
						})
						.catch((error) => {

							console.log(error); 

						});

					break;

				case "delete":

					deviceService.delete(messageAsJSON.device._id)
						.then((device) => {
							
							console.log(device);
						
						})
						.catch((error) => {
							
							console.log(error); 

						});

				}
			
			}
			
		});
	
	}

}

export default Mqtt;