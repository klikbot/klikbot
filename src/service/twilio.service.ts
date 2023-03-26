import Twilio from 'twilio';
import dotenv from "dotenv";
import Chat from '../database/schemas/chat.schema';
import { IChat } from '../interfaces/IChat';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNTSID; 
const authToken = process.env.TWILIO_TOKEN;
const client = Twilio(accountSid, authToken);

class TwilioService {

    sendMessage(messageContent: string){
        client.messages
            .create({
                body: messageContent,
                from: `whatsapp:${process.env.TWILIO_FROM}`,
                to: `whatsapp:${process.env.TWILIO_TO}`
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error(`Erro ao enviar mensagem: ${error}`));
    }

    async createChatTempData(userCellphone: string, type: string): Promise<IChat> {
        try {

            const chat: IChat = {
                userCellphone: userCellphone,
                name: "Template",
                type: type,
                actualIndex: 0
            }

			return await Chat.create(chat);
		
		} catch (error) {

			return error;
		
		}
    }

    async getByCellphone(userCellphone: string): Promise<IChat | null> {

		try {

			return await Chat.findOne({ userCellphone });
		
		} catch (error) {

			return error;
		
		}
	
	}

    async updateChatTempDate(userCellphone: string, type: string, actualIndex: number, name: string): Promise<IChat | null> {

		try {

            const chat: IChat = {
                userCellphone: userCellphone,
                name: name,
                type: type,
                actualIndex: actualIndex + 1
            }

			return await Chat.findOneAndUpdate({userCellphone}, chat, { new: true });
		
		} catch (error) {

			return error;
		
		}
	
	}

    async delete(cellphone: string): Promise<IChat | null> {
            
		try {
    
			return await Chat.findOneAndDelete({cellphone});
            
		} catch (error) {
    
			throw new Error(`Failed to delete user. Error: ${error}`);
            
		}
	
	}

}

export default new TwilioService();