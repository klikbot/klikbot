import { Request, Response } from "express";
import { success } from "../constants/en/success";
import { error } from "../constants/en/error";
import productService from "../service/product.service";
import { IProduct } from "../interfaces/IProduct";

class ProductController {

	public async createProduct(req: Request, res: Response) {

		const product: IProduct = req.body.product;

		try {

			const newProduct = await productService.create(product);

			return res.status(201).json({
				status: "success",
				message: success.productCreatedSuccessfully,
				data: newProduct
			});
		
		} catch (err) {

			console.error(err);
			return res.status(500).json({
				status: "error",
				message: error.unableToCreateProduct
			});
		
		}
	
	}

	public async getProduct(req: Request, res: Response) {

		const productId: string = req.params.productId;

		try {

			const product = await productService.getById(productId);

			if (!product) {

				return res.status(404).json({
					status: "error",
					message: error.productNotFound
				});
			
			}

			return res.status(200).json({
				status: "success",
				message: success.productFoundSuccessfully,
				data: product
			});
		
		} catch (err) {

			console.error(err);
			return res.status(500).json({
				status: "error",
				message: error.unableToGetProduct
			});
		
		}
	
	}

	public async getAllProducts(req: Request, res: Response) {

		try {

			const products = await productService.getAll();

			return res.status(200).json({
				status: "success",
				message: success.productsFoundSuccessfully,
				data: products
			});
		
		} catch (err) {

			console.error(err);
			return res.status(500).json({
				status: "error",
				message: error.unableToGetProduct
			});
		
		}
	
	}

	public async updateProduct(req: Request, res: Response) {

		const productId: string = req.params.productId;
		const product: IProduct = req.body.product;

		try {

			const updatedProduct = await productService.update(productId, product);

			if (!updatedProduct) {

				return res.status(404).json({
					status: "error",
					message: error.productNotFound
				});
			
			}

			return res.status(200).json({
				status: "success",
				message: success.productUpdatedSuccessfully,
				data: updatedProduct
			});
		
		} catch (err) {

			console.error(err);
			return res.status(500).json({
				status: "error",
				message: error.unableToUpdateProduct
			});
		
		}
	
	}

	public async deleteProduct(req: Request, res: Response) {

		const productId: string = req.params.productId;

		try {

			const deletedProduct = await productService.delete(productId);

			if (!deletedProduct) {

				return res.status(404).json({
					status: "error",
					message: error.productNotFound
				});
			
			}

			return res.status(200).json({
				status: "success",
				message: success.productDeletedSuccessfully,
				data: deletedProduct
			});
		
		} catch (err) {

			console.error(err);
			return res.status(500).json({
				status: "error",
				message: error.unableToDeleteProduct
			});
		
		}
	
	}

}

export default new ProductController();
