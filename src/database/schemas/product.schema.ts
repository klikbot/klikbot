import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../interfaces/IProduct";

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
