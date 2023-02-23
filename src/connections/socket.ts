import http from "http";
import { connection, server as WebSocketServer } from "websocket";
import { v4 as uuidv4 } from "uuid";

export default class Socket {

	public socketHttpServer: http.Server;
	public ws : WebSocketServer;
	public connections : connection[] = [];

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

			this.connections.push(connection);

			connection.sendUTF("Hello from socket server.");

			const connectionId = this.setConnectionId();

			console.log("\nNew socket connection accepted: " + connectionId + "\n");

			connection.on("message", function (message) {

				if (message.type === "utf8") {

					console.log("Message received from socket connection " + connectionId + ": ");
					console.log(message.utf8Data + "\n");
					
					connection.sendUTF(message.utf8Data);
				
				}

			});			
		
		});

	}

	public sendToAll(message : string) : void {
		
		this.connections.forEach((connection) => {

			connection.sendUTF(message);
		
		});
	
	}
	

}

export const socket = new Socket(3000);