import { responseBuilder } from "../helpers/responseBuilder";
import { ISale } from "../interfaces/ISale";
import { request, Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import saleService from "../service/sale.service";

class SaleController {

	public async createSale(req: Request, res: Response) {

		const sale : ISale = req.body.sale;

		try {

			const newSale = await saleService.create(sale);
			
			return responseBuilder(res, "success", success.saleCreatedSuccessfully, newSale);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToCreateSale);
		
		}
	
	}

	
	public async getSalesFromUser(req: Request, res: Response) {

		const cellphone : string = req.params.cellphone;

		try {

			const user = await saleService.getByCellphone(cellphone);

			if (!user) {

				return responseBuilder(res, "error", error.saleNotFound);
			
			}

			return responseBuilder(res, "success", success.saleFoundSuccessfully, user);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetSale);
        
		}
    
	}

	public async updateSale(req: Request, res: Response) {

		const sale : ISale = req.body.sale;
		const id : number = parseInt(req.params.id);

		try {

			const updatedUser = await saleService.update(id, sale);

			if (!updatedUser) {

				return responseBuilder(res, "error", error.saleNotFound);
            
			}

			return responseBuilder(res, "success", success.saleUpdatedSuccessfully, updatedUser);
        
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetSale);
        
		}
		
        
	}

	public async deleteSale(req: Request, res: Response) {

		const id : number = parseInt(req.params.id);
		
		try {

			const deletedUser = await saleService.delete(id);

			if (!deletedUser) {

				return responseBuilder(res, "error", error.saleNotFound);
            
			}

			return responseBuilder(res, "success", success.saleDeletedSuccessfully, deletedUser);
        
		} catch (err) {
                
			console.error(err);
    
			return responseBuilder(res, "error", error.unableToGetSale);
            
		}

	}

	public async getAveragePrice(req: Request, res: Response) {
		const days: number = parseInt(req.params.days);
		try {
			const averagePrice = await saleService.getAverageSalePrice(days);
			return responseBuilder(res, "success", success.clientFoundSuccessfully, averagePrice);
		
		} catch (err) {
			console.error(err);

			return responseBuilder(res, "error", error.unableToGetClient);
		
		}

	}

	public async getAllSales(req: Request, res: Response) {
		const cellphone: string = req.params.cellphone;
		const period: number = parseInt(req.params.period);
		try {

			const sales = await saleService.getAllSales(period);

			return responseBuilder(res, "success", success.saleFoundSuccessfully, sales);
		
		} catch (err) {

			console.error(err);

			return responseBuilder(res, "error", error.unableToGetSale);
		
		}
	
	}

}

export default new SaleController();