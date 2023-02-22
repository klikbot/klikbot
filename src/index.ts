import App from "./app";
import HttpServer from "./httpServer";

const { app } = new App();
const httpServer = new HttpServer(app, 3001);