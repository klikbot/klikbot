import Sale from "../database/schemas/sale.schema";
import { ISale } from "../interfaces/ISale";
import autoincrementService from "./autoincrement.service";

class SaleService {

	async create(sale: ISale): Promise<ISale> {

		sale.date = new Date();

		try {

			const autoincrement = await autoincrementService.getByCollectionName("sales");

			await autoincrementService.update("sales", autoincrement);
			
			sale.id = autoincrement.id;

			return await Sale.create(sale);
		
		} catch (error) {

			throw new Error(`Failed to create user. Error: ${error}`);
		
		}
	
	}

	async getByCellphone(cellphone: string): Promise<ISale[] | null> {

		try {

			return await Sale.find({ userCellphone: cellphone });
		
		} catch (error) {

			throw new Error(`Failed to get user. Error: ${error}`);
		
		}
	
	}

	async update(id: number, sale: ISale): Promise<ISale | null> {

		try {

			return await Sale.findOneAndUpdate({id}, sale, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update user. Error: ${error}`);
		
		}
	
	}

	async delete(id: number): Promise<ISale | null> {
            
		try {
    
			return await Sale.findOneAndDelete({id});
            
		} catch (error) {
    
			throw new Error(`Failed to delete user. Error: ${error}`);
            
		}
	
	}
            
}
  
export default new SaleService();