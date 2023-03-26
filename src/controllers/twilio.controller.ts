import { Request, Response } from "express";
import twilioService from "../service/twilio.service";

class TwilioController {
    
    async webhook(req: Request, res: Response){
        const messageSid = req.body.MessageSid;
        const body = req.body.Body;
        const from = req.body.From;
        const to = req.body.To;

        console.log(`Mensagem recebida: ${body} de ${from}`);

        // Faça algo com a mensagem recebida, como responder com outra mensagem

        // const messageOpts: Twilio.messages.CreateMessageOptions = {
        //     from: to,
        //     to: from,
        //     body: `Você disse: ${body}`
        // };

        // client.messages
        //     .create(messageOpts)
        //     .then(message => console.log(`Mensagem enviada: ${message.sid}`))
        //     .catch(error => console.error(`Erro ao enviar mensagem: ${error}`));

        res.sendStatus(200);
    }

}

export default new TwilioController();