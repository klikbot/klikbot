import Product from "../database/schemas/product.schema";
import { IProduct } from "../interfaces/IProduct";
import AutoincrementService from "./autoincrement.service";

class ProductService {

	public async create(product: IProduct): Promise<IProduct> {

		try {

			const autoincrement = await AutoincrementService.getByCollectionName("products");

			await AutoincrementService.update("products", autoincrement);
			
			product.id = autoincrement.id;

			return await Product.create(product);
		
		} catch (error) {

			throw new Error(`Failed to create product. Error: ${error}`);
		
		}
	
	}

	public async getById(productId: string): Promise<IProduct | null> {

		try {

			return await Product.findById(productId);
		
		} catch (error) {

			throw new Error(`Failed to get product. Error: ${error}`);
		
		}
	
	}

	public async getAll(): Promise<IProduct[]> {

		try {

			return await Product.find();
		
		} catch (error) {

			throw new Error(`Failed to get products. Error: ${error}`);
		
		}
	
	}

	public async update(productId: string, product: IProduct): Promise<IProduct | null> {

		try {

			return await Product.findByIdAndUpdate(productId, product, { new: true });
		
		} catch (error) {

			throw new Error(`Failed to update product. Error: ${error}`);
		
		}
	
	}

	public async delete(productId: string): Promise<IProduct | null> {

		try {

			return await Product.findByIdAndDelete(productId);
		
		} catch (error) {

			throw new Error(`Failed to delete product. Error: ${error}`);
		
		}
	
	}

	public async searchByName(name: string): Promise<IProduct[]> {

		try {

			return await Product.find({ name: { $regex: new RegExp(name, "i") } });
		
		} catch (error) {

			throw new Error(`Failed to search products by name. Error: ${error}`);
		
		}
	
	}

}

export default new ProductService();
