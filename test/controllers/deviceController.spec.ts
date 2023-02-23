import { app } from "../../src/app";
import request from "supertest";
import { socket } from "../../src/connections/socket";

describe("DeviceController", () => {

	it("should return a list of devices", async () => {

		const response = await request(app.app).get("/api/devices");

		expect(response.status).toBe(200);

	});

});

afterAll(async () => {

	app.database.connection.close();
	socket.socketHttpServer.close();

});