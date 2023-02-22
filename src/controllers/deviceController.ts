import { Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import { responseBuilder } from "../helpers/responseBuilder";
import DeviceService from "../services/deviceService";

class DeviceController {

	public async createDevice(req: Request, res: Response) {

		const { device } = req.body;

		try {

			const newDevice = await DeviceService.create(device);
			
			return responseBuilder(res, "success", success.deviceCreatedSuccessfully, newDevice);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToCreateDevice);
		
		}
	
	}
	
	public async getAllDevices(req: Request, res: Response) {

		try {

			const devices = await DeviceService.getAll();

			return responseBuilder(res, "success", success.devicesGotSuccessfully, devices);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetDevices);
		
		}
	
	}

	public async getDeviceById(req: Request, res: Response) {

		const deviceId = req.params.id;

		try {

			const device = await DeviceService.getById(deviceId);

			if (!device) {

				return responseBuilder(res, "error", error.deviceNotFound);
			
			}

			return responseBuilder(res, "success", success.deviceGotSuccessfully, device);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetDevices);
		
		}
	
	}

	public async updateDevice(req: Request, res: Response) {

		const deviceId = req.params.id;
		const { device } = req.body;

		try {

			const updatedDevice = await DeviceService.update(deviceId, device);

			if (!updatedDevice) {

				return responseBuilder(res, "error", error.deviceNotFound);
			
			}

			return responseBuilder(res, "success", success.deviceUpdatedSuccessfully, updatedDevice);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToUpdateDevice);
		
		}
	
	}

	public async deleteDevice(req: Request, res: Response) {

		const deviceId = req.params.id;

		try {

			const deletedDevice = await DeviceService.delete(deviceId);

			if (!deletedDevice) {

				return responseBuilder(res, "error", error.deviceNotFound);
			
			}

			return responseBuilder(res, "success", success.deviceDeletedSuccessfully);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToDeleteDevice);
		
		}
	
	}

}

export default new DeviceController();