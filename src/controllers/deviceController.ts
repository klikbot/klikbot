import { Request, Response } from "express";
import DeviceService from "../services/deviceService";

class DeviceController {
	public async getAllDevices(req: Request, res: Response) {
		try {
			const devices = await DeviceService.getAll();
			res.status(200).json(devices);
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}

	public async getDeviceById(req: Request, res: Response) {
		const deviceId = req.params.id;
		try {
			const device = await DeviceService.getById(deviceId);
			if (!device) {
				res.status(404).send("Device not found");
				return;
			}
			res.status(200).json(device);
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}

	public async createDevice(req: Request, res: Response) {
		const { device } = req.body;
		try {
			const newDevice = await DeviceService.create(device);
			res.status(201).json(newDevice);
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}

	public async deleteDevice(req: Request, res: Response) {
		const deviceId = req.params.id;
		try {
			const deletedDevice = await DeviceService.delete(deviceId);
			if (!deletedDevice) {
				res.status(404).send("Device not found");
				return;
			}
			res.status(200).json(deletedDevice);
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}
}

export default new DeviceController();