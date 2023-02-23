import App from "./app";
import HttpServer from "./connections/httpServer";
import Mqtt from "./connections/mqqt";

const { app } = new App();

new HttpServer(app, 3001);

const mqttBroker = process.env.MQTT_BROKER || "mqtt://localhost:1883";

new Mqtt(mqttBroker, true);