import mongoose, { Schema, Document } from "mongoose";

export interface IDevice extends Document {
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema: Schema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDevice>("Device", deviceSchema);