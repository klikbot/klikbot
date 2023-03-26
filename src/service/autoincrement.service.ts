import { IAutoincrement } from "../interfaces/IAutoincrement";
import Autoincrement from "../database/schemas/autoincrement.schema";

class AutoincrementService {

	async create(autoincrement: IAutoincrement): Promise<IAutoincrement> {

		try {

			return await Autoincrement.create(autoincrement);
		
		} catch (error) {

			throw new Error(`Failed to create user. Error: ${error}`);
		
		}
	
	}

	async getByCollectionName(collectionName: string): Promise<IAutoincrement> {

		try {

			return await Autoincrement.findOne({ collectionName });
		
		} catch (error) {

			throw new Error(`Failed to get user. Error: ${error}`);
		
		}
	
	}

	async update(collectionName: string, autoincrement: IAutoincrement): Promise<IAutoincrement> {

		try {

			autoincrement.id ++;

			return await Autoincrement.findOneAndUpdate({collectionName}, autoincrement, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update user. Error: ${error}`);
		
		}
	
	}
            
}
  
export default new AutoincrementService();