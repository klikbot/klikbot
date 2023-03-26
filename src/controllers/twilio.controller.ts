import { Request, Response } from "express";
import twilioService from "../service/twilio.service";
import userService from "../service/user.service";
import { IUser } from "../interfaces/IUser";
import { IChat } from "../interfaces/IChat";
import { twilioMessagesTemplates } from "../constants/pt/twilioTemplate";

class TwilioController {
    async webhook(req: Request, res: Response){
        // const messageSid = req.body.MessageSid;
        const body = req.body.Body;
        const from = req.body.From;
        // const to = req.body.To;

        const user = await userService.getByCellphone(from);

        if (user == null){
            const chat: IChat = await twilioService.getByCellphone(from);

            if (chat == null){
                const newChat: IChat = await twilioService.createChatTempData(from, "register");

                twilioService.sendMessage(twilioMessagesTemplates.register[0]);

                await twilioService.updateChatTempDate(from, "register", newChat.actualIndex, newChat.name);
            }
            else {
                if (chat.actualIndex < 2){
                    twilioService.sendMessage(twilioMessagesTemplates.register[chat.actualIndex]);
                    await twilioService.updateChatTempDate(from, "register", chat.actualIndex, body);
                }
                else {
                    twilioService.sendMessage(twilioMessagesTemplates.register[chat.actualIndex]);

                    const user: IUser = {
                        cellphone: chat.userCellphone,
                        name: chat.name
                    }
                    await userService.create(user);
                }
            }
        }
        else {
            // Add chat gpt here
        }
    }

}

export default new TwilioController();