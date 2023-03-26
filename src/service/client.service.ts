import Client from "../database/schemas/client.schema";
import { IClient } from "../interfaces/IClient";
import autoincrementService from "./autoincrement.service";
import Sale from "../database/schemas/sale.schema";
import clientSchema from "../database/schemas/client.schema";

class ClientService {

	async create(client: IClient): Promise<IClient> {

		try {

			const autoincrement = await autoincrementService.getByCollectionName("clients");

			await autoincrementService.update("clients", autoincrement);
			
			client.id = autoincrement.id;

			return await Client.create(client);
		
		} catch (error) {

			throw new Error(`Failed to create client. Error: ${error}`);
		
		}
	
	}

	async getById(id: number): Promise<IClient> {

		try {
            if (!isNaN(id)) {
                return await Client.findOne({ id });
            }
		
		} catch (error) {

			throw new Error(`Failed to get client. Error: ${error}`);
		
		}
	
	}

	async getAll(): Promise<IClient[]> {

		try {

			return await Client.find();
		
		} catch (error) {

			throw new Error(`Failed to get clients. Error: ${error}`);
		
		}
	
	}

	async update(id: number, client: IClient): Promise <IClient> {

		try {

			return await Client.findOneAndUpdate({id}, client, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update client. Error: ${error}`);
		
		}
	
	}

	async delete(id: number): Promise<IClient> {

		try {

			return await Client.findOneAndDelete({id});
		
		} catch (error) {

			throw new Error(`Failed to delete client. Error: ${error}`);
		
		}
	
	}

    async getNewClients(days: number): Promise<IClient[]> {
        try {
            const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            const newClients = await Client.find({ dateCreated: { $gte: startDate } });
            if (newClients == null) {
                return [];
            }
            return newClients;
        } catch (error) {
            throw new Error(`Failed to get new clients. Error: ${error}`);
        }
    }

    async getInactiveClients(days: number): Promise<IClient[]> {
        try {
            const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            const clients = await Client.find();
            const inactiveClients = [];
            for (const client of clients) {
                const sales = await Sale.find({ clientId: client.id, date: { $gte: startDate } });
          
                if (sales.length === 0) {
                    inactiveClients.push(client);
                }
              }
            return inactiveClients;
        } catch (error) {
            throw new Error(`Failed to get inactive clients. Error: ${error}`);
        }
    }

    async getVolume(top: number): Promise<IClient[]> {
        try {
            const clients = await Client.find();
            const clientsVolume = [];
            for (const client of clients) {
                console.log(client);
                const sales = await Sale.find({ clientId: client.id });
                const totalSalePrice = sales.reduce((sum, sale) => sum + sale.price, 0);
                clientsVolume.push({ client, totalSalePrice });
              }
          
              const sortedClients = clientsVolume.sort((a, b) => b.totalSalePrice - a.totalSalePrice);
              const topClients = sortedClients.slice(0, top).map((item) => item.client);
          
              return topClients;
        } catch (error) {
            throw new Error(`Failed to get inactive clients. Error: ${error}`);
        }
    }

    async getAverageSalePrice(days: number): Promise<number> {
        try {
            const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            const sales = await Sale.find( {date: { $lte: startDate }} );
            console.log(sales);
            const totalSalePrice = sales.reduce((sum, sale) => sum + sale.price, 0);
            const averageSalePrice = sales.length > 0 ? parseFloat((totalSalePrice / sales.length).toFixed(2)) : 0;
            return averageSalePrice;
        } catch (error) {
            throw new Error(`Failed to get average sale price. Error: ${error}`);
        }
    }
}

export default new ClientService();