import { responseBuilder } from "../helpers/responseBuilder";
import { IClient } from "../interfaces/IClient";
import { Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import clientService from "../service/client.service";

class ClientController {

	public async createClient(req: Request, res: Response) {

		const client : IClient = req.body.client;

		client.dateCreated = new Date(Date.now());

		try {

			const newClient = await clientService.create(client);
			return responseBuilder(res, "success", success.clientCreatedSuccessfully, newClient);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToCreateClient);
		
		}
	
	}

	public async getClient(req: Request, res: Response) {

		const id : number = parseInt(req.params.id);
		try {

			const client = await clientService.getById(id);
			if (!client) {

				return responseBuilder(res, "error", error.clientNotFound);
			
			}
			return responseBuilder(res, "success", success.clientFoundSuccessfully, client);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}
	
	}

	public async getAllClients(req: Request, res: Response) {

		try {

			const clients = await clientService.getAll();

			return responseBuilder(res, "success", success.clientFoundSuccessfully, clients);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
        
		}
    

	}

	public async updateClient(req: Request, res: Response) {

		const id : number = parseInt(req.params.id);
		const client : IClient = req.body.client;

		try {

			const updatedClient = await clientService.update(id, client);

			if (!updatedClient) {

				return responseBuilder(res, "error", error.clientNotFound);
            
			}

			return responseBuilder(res, "success", success.clientUpdatedSuccessfully, updatedClient);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
        
		}
        
	}

	public async deleteClient(req: Request, res: Response) {

		const id : number = parseInt(req.params.id);

		try {

			const deletedClient = await clientService.delete(id);

			if (!deletedClient) {

				return responseBuilder(res, "error", error.clientNotFound);
            
			}

			return responseBuilder(res, "success", success.clientDeletedSuccessfully, deletedClient);
        
		} catch (err) {
                
			console.error(err);
    
			return responseBuilder(res, "error", error.unableToGetClient);
            
		}

	}

	public async newClients(req: Request, res: Response) {
		const days: number = parseInt(req.params.days);

		try {

			const newClients = await clientService.getNewClients(days);

			return responseBuilder(res, "success", success.clientFoundSuccessfully, newClients);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}

	}

	public async inactiveClients(req: Request, res: Response) {
		const days: number = parseInt(req.params.days);

		try {

			const inactiveClients = await clientService.getInactiveClients(days);

			return responseBuilder(res, "success", success.clientFoundSuccessfully, inactiveClients);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}

	}

	public async volume(req: Request, res: Response) {
		try {
			const top: number = parseInt(req.params.top);
			const inactiveClients = await clientService.getVolume(top);

			return responseBuilder(res, "success", success.clientFoundSuccessfully, inactiveClients);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}

	}

	public async getAveragePrice(req: Request, res: Response) {
		const days: number = parseInt(req.params.days);
		try {
			const averagePrice = await clientService.getAverageSalePrice(days);
			return responseBuilder(res, "success", success.clientFoundSuccessfully, averagePrice);
		
		} catch (err) {
			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}

	}

}

export default new ClientController();