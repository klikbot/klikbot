import { Request, Response } from "express";
import twilioService from "../service/twilio.service";
import userService from "../service/user.service";
import { twilioMessagesTemplates } from "../constants/pt/twilioTemplate";

class TwilioController {
    async webhook(req: Request, res: Response){
        const messageSid = req.body.MessageSid;
        const body = req.body.Body;
        const from = req.body.From;
        const to = req.body.To;

        const user = await userService.getByCellphone(from);

        if (user == null){
            const chat = await twilioService.getByCellphone(from);

            if (chat == null){
                const newChat = await twilioService.createChatTempData(from, "register");
                
                twilioService.sendMessage(twilioMessagesTemplates.register[0]);

                await twilioService.updateChatTempDate(from, "register", newChat.actualIndex);
            }
            else {
                console.log("Chat gerado");
                twilioService.sendMessage(twilioMessagesTemplates.register[chat.actualIndex]);
                await twilioService.updateChatTempDate(from, "register", chat.actualIndex);
            }
        }
        else {
            // Intruce chat gpt here
        }
    }

}

export default new TwilioController();