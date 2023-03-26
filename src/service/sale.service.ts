import Sale from "../database/schemas/sale.schema";
import { ISale } from "../interfaces/ISale";

class SaleService {

	async create(sale: ISale): Promise<ISale> {

		try {

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

	async getAll(): Promise<ISale[]> {

		try {

			return await Sale.find();
		
		} catch (error) {

			throw new Error(`Failed to get user. Error: ${error}`);
		
		}
	
	}

	async update(cellphone: string, id: number, sale: ISale): Promise<ISale | null> {

		try {

			return await Sale.findOneAndUpdate({cellphone, id}, sale, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update user. Error: ${error}`);
		
		}
	
	}

	async delete(cellphone: string, id: number): Promise<ISale | null> {
            
		try {
    
			return await Sale.findOneAndDelete({cellphone, id});
            
		} catch (error) {
    
			throw new Error(`Failed to delete user. Error: ${error}`);
            
		}
	
	}
            
}
  
export default new SaleService();