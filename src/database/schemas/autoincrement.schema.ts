import mongoose, { Schema } from "mongoose";
import { IAutoincrement } from "../../interfaces/IAutoincrement";
  
const Autoincrement = new Schema({
	collectionName: { type: String, required: true },
	id: { type: Number, required: true }
});

export default mongoose.model<IAutoincrement>("Autoincrement", Autoincrement);