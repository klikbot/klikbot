import mongoose, { Schema } from "mongoose";
import { ISale } from "../../interfaces/ISale";
  
const SaleSchema = new Schema({
    id: { type: Number, required: true},
	date: { type: Date, required: true },
	price: { type: Number, required: true },
    clientId: { type: Number, required: true },
    userCellphone: { type: String, required: true},
    products: { type: String, required: true}
});

export default mongoose.model<ISale>("Sale", SaleSchema);