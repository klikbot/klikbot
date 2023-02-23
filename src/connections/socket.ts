import http from "http";
import { server as WebSocketServer } from "websocket";
import { v4 as uuidv4 } from "uuid";

class Socket {

	private socketHttpServer: http.Server;
	private ws : WebSocketServer;

	constructor(port : number) {

		this.setup(port);
		this.config();

	}

	private setup(port : number) : void {

		this.socketHttpServer = http.createServer();
		this.socketHttpServer.listen(port, () => {

			console.log("Socket server started successfully. Listening on port " + port + ".");
		
		});

		this.ws = new WebSocketServer({
			httpServer: this.socketHttpServer,
			autoAcceptConnections: false
		});

	}

	private setConnectionId() : string {

		return uuidv4();
	
	}

	private config() : void {

		this.ws.on("request", (request) => {
			
			const connection = request.accept();

			const connectionId = this.setConnectionId();

			console.log("\nNew socket connection accepted: " + connectionId + "\n");

			connection.on("message", function (message) {

				if (message.type === "utf8") {

					console.log("Message received from socket connection " + connectionId + ": " + message.utf8Data);
					connection.sendUTF(message.utf8Data);
				
				}

			
			});
			
		
		});

	}
	

}

export default Socket;