import Sale from "../database/schemas/sale.schema";
import { ISale } from "../interfaces/ISale";
import autoincrementService from "./autoincrement.service";
import User from "../database/schemas/user.schema";

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

	async getAverageSalePrice(days: number): Promise<number> {
        try {
            const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            const sales = await Sale.find( {date: { $lte: startDate }} );
            const totalSalePrice = sales.reduce((sum, sale) => sum + sale.price, 0);
            const averageSalePrice = sales.length > 0 ? parseFloat((totalSalePrice / sales.length).toFixed(2)) : 0;
            return averageSalePrice;
        } catch (error) {
            throw new Error(`Failed to get average sale price. Error: ${error}`);
        }
    }

	async getAllSales(period: number): Promise<number> {
		try {
			let startDate;
			
			if (period === 0 || period === 7 || period === 30 || period === 365) {
				startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000);
			}
			
			let totalProducts = 0;
			const users = await User.find();
			for (const user of users) {
                const sales = await Sale.find({ userCellphone: user.cellphone, date: { $gte: startDate } });
			
				for (const sale of sales) {
					totalProducts += sale.products.length;
				}
              }
			
			return totalProducts;
		} catch (error) {
			throw new Error(`Failed to get total sale price. Error: ${error}`);
		}
	}
}
  
export default new SaleService();