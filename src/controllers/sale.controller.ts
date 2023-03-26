import { responseBuilder } from "../helpers/responseBuilder";
import { ISale } from "../interfaces/ISale";
import { request, Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import saleService from "../service/sale.service";

class SaleController {

	public async createSale(req: Request, res: Response) {

		const requestBody = req.body.sale;
		const sale : ISale = {
			id: 0,
			date: new Date(Date.now()),
			price: requestBody.price,
			clientId: requestBody.clientId,
			userCellphone: requestBody.userCellphone,
			products: requestBody.products
		}

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
		const sale : ISale = req.body.sale
		const cellphone : string = req.body.cellphone;
		const id : number = sale.id;

		try {

			const updatedUser = await saleService.update(cellphone, id, sale);

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
		const cellphone : string = req.body.cellphone;
		const id : number = req.body.id;
		
		try {

			const deletedUser = await saleService.delete(cellphone, id);

			if (!deletedUser) {

				return responseBuilder(res, "error", error.saleNotFound);
            
			}

			return responseBuilder(res, "success", success.saleDeletedSuccessfully, deletedUser);
        
		} catch (err) {
                
			console.error(err);
    
			return responseBuilder(res, "error", error.unableToGetSale);
            
		}

	}

}

export default new SaleController();