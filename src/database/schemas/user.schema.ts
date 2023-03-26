import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser";
  
const UserSchema = new Schema({
	name: { type: String, required: true },
	cellphone: { type: String, required: true }
});

export default mongoose.model<IUser>("User", UserSchema);