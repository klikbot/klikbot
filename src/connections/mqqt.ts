import mqtt from "mqtt";

class Mqtt {

	public client: mqtt.MqttClient;

	constructor(mqttBroker: string) {
	
		this.connect(mqttBroker);
		this.config();

	}

	private connect(mqttBroker : string) : void {
		
		this.client = mqtt.connect(mqttBroker);
	
	}

	private config() {

		this.client.on("connect", () => {

			console.log("Connected to MQTT server.");

		});

		this.client.on("error", (error) => {

			console.log(error);

		});
	
	}

}

export default Mqtt;