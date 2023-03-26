import Client from "../database/schemas/client.schema";
import { IClient } from "../interfaces/IClient";

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
}

export default new ClientService();