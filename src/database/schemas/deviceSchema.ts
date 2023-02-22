import mongoose, { Schema, Document } from "mongoose";


interface IData {
	name: string;
	value: number;
	unit: string;
  }
  
export interface IDevice extends Document {
	name: string;
	data: IData[];
  }
  
const DeviceSchema = new Schema({
	name: { type: String, required: true },
	data: [
		{
			name: { type: String, required: true },
			value: { type: Number, required: true },
			unit: { type: String, required: true }
		}
	]
});

export default mongoose.model<IDevice>("Device", DeviceSchema);