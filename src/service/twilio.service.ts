import Twilio from 'twilio';

class TwilioService {
    private accountSid = process.env.TWILIO_ACCOUNTSID; 
    private authToken = process.env.TWILIO_TOKEN;

    private client = Twilio(this.accountSid, this.authToken);

    async sendMessage(messageContent: string){
        await this.client.messages
                .create({
                    body: messageContent,
                    from: `whatsapp:${process.env.TWILIO_FROM}`,
                    to: `whatsapp:${process.env.TWILIO_TO}`
                })
                .then(message => console.log(message.sid))
                .catch(error => console.error(`Erro ao enviar mensagem: ${error}`));
    }
}

export default new TwilioService();