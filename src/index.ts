import App from "./app";
import HttpServer from "./connections/httpServer";

const { app } = new App();
new HttpServer(app, 3001);