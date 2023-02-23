import { app } from "../../src/app";
import request from "supertest";
import { success } from "../../src/constants/en/success";
import DeviceService from "../../src/services/deviceService";
import { IDevice } from "../../src/database/schemas/deviceSchema";
import { error } from "../../src/constants/en/error";

const device : any = {
	name: "Device 1",
	data: [
		{
			name: "Temperature",
			value: 25,
			unit: "ºC"
		}
	]
};

describe("DeviceController", () => {

	describe("createDevice", () => {

		it("should create a new device", async () => {

			const response = await request(app.app)
				.post("/api/devices")
				.send({ device });
	
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("success");
			expect(response.body.success.title).toBe(success.deviceCreatedSuccessfully.title);
			expect(response.body.success.data.name).toBe(device.name);
			expect(response.body.success.data.data[0].name).toBe(device.data[0].name);
			expect(response.body.success.data.data[0].value).toBe(device.data[0].value);
			expect(response.body.success.data.data[0].unit).toBe(device.data[0].unit);
		
		});
	
	});

	describe("getDevices", () => {

		it("should return all devices", async () => {

			const response = await request(app.app).get("/api/devices");
	
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("status", 200);
			expect(response.body).toHaveProperty("success");
			expect(response.body.success.title).toBe(success.devicesGotSuccessfully.title);
			expect(response.body.success.data.length).toBeGreaterThan(0);
	
		});

	});

	describe("getDeviceById", () => {

		let createdDevice : IDevice;
	
		beforeAll(async () => {

			createdDevice = await DeviceService.create(device);
		
		});
	
		it("should return a device by ID", async () => {

			const response = await request(app.app)
				.get(`/api/devices/${createdDevice._id}`);
	
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("success");
			expect(response.body.success.title).toBe(success.deviceGotSuccessfully.title);
			expect(response.body.success.data.name).toBe(device.name);
			expect(response.body.success.data.data[0].name).toBe(device.data[0].name);
			expect(response.body.success.data.data[0].value).toBe(device.data[0].value);
			expect(response.body.success.data.data[0].unit).toBe(device.data[0].unit);
		
		});
	
		it("should return an error message for an invalid device ID", async () => {

			const response = await request(app.app)
				.get("/api/devices/invalid_id");
	
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.invalidDeviceId.title);
		
		});
	
		it("should return an error message for a non-existent device ID", async () => {

			const response = await request(app.app)
				.get("/api/devices/abcde00000abcde0000abcde");
	
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.deviceNotFound.title);
		
		});
	
	});

	describe("updateDeviceById", () => {

		let createdDevice : IDevice;
	
		beforeAll(async () => {
	
			createdDevice = await DeviceService.create(device);
	
		});
	
		it("should update a device by ID", async () => {
	
			const response = await request(app.app)
				.put(`/api/devices/${createdDevice._id}`)
				.send({ device: { "name": "Updated Device 1" }});
	
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("success");
			expect(response.body.success.title).toBe(success.deviceUpdatedSuccessfully.title);
			expect(response.body.success.data.name).toBe("Updated Device 1");
	
		});
	
		it("should return an error message for an invalid device ID when updating", async () => {
	
			const response = await request(app.app)
				.put("/api/devices/invalid_id")
				.send({ device: { "name": "Updated Device 1" }});
	
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.invalidDeviceId.title);
	
		});
	
		it("should return an error message for a non-existent device ID when updating", async () => {
	
			const response = await request(app.app)
				.put("/api/devices/abcde00000abcde0000abcde")
				.send({ device: { "name": "Updated Device 1" }});
	
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.deviceNotFound.title);
	
		});
	
	});

	describe("deleteDeviceById", () => {

		let createdDevice : IDevice;
	
		beforeAll(async () => {
	
			createdDevice = await DeviceService.create(device);
	
		});
	
		it("should delete a device by ID", async () => {
	
			const response = await request(app.app)
				.delete(`/api/devices/${createdDevice._id}`);
	
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("success");
			expect(response.body.success.title).toBe(success.deviceDeletedSuccessfully.title);
	
		});
	
		it("should return an error message for an invalid device ID when deleting", async () => {
	
			const response = await request(app.app)
				.delete("/api/devices/invalid_id");
	
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.invalidDeviceId.title);
	
		});
	
		it("should return an error message for a non-existent device ID when deleting", async () => {
	
			const response = await request(app.app)
				.delete("/api/devices/abcde00000abcde0000abcde");
	
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error.title).toBe(error.deviceNotFound.title);
	
		});
	
	});

});

afterAll(async () => {

	app.database.connection.close();
	app.socket.socketHttpServer.close();

});