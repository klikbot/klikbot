import mongoose, { Schema } from "mongoose";
import { IClient } from "../../interfaces/IClient";

const UserSchema = new Schema({ 
    id: {type: Number, required: true},
    name: {type: String, required: true},
    userCellphone: {type: String, required: true}, 
    dateCreated: {type: Date}
});

export default mongoose.model<IClient>("Client", UserSchema);