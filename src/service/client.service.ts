import Client from "../database/schemas/client.schema";
import { IClient } from "../interfaces/IClient";
import Sale from "../database/schemas/sale.schema";

class ClientService {
    async create(client: IClient): Promise<IClient> {
        try {
            return await Client.create(client);
        } catch (error) {
            throw new Error(`Failed to create client. Error: ${error}`);
        }
    }

    async getById(id: number): Promise<IClient> {
        try {
            return await Client.findOne({ id });
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
            const inactiveClients = await Client.find({ 
                dateCreated: { $lte: startDate },
                _id: { $nin: (await Sale.distinct("clientId", { dateCreated: { $gte: startDate } })) }
        });
        return inactiveClients;
        } catch (error) {
            throw new Error(`Failed to get inactive clients. Error: ${error}`);
        }
    }
}

export default new ClientService();