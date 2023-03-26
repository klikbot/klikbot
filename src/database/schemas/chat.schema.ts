import mongoose, { Schema } from "mongoose";
import { IChat } from "../../interfaces/IChat";

const ChatSchema = new Schema({ 
    userCellphone: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    actualIndex: {type: Number, required: true}
});

export default mongoose.model<IChat>("Chat", ChatSchema);