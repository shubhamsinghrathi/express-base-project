import * as twilio from 'twilio'
import { CONSTANT } from '../constant'

export const sendMessage = async (data) => {
    try {
        let to = data.to || '';
        let message = data.message || '';
        let type = data.type || 1;
        let accountSid = CONSTANT["twilio_accountSid"] || undefined;
        let authToken = CONSTANT["twilio_authToken"] || undefined;
        let from = CONSTANT["twilio_from"] || undefined;

        var client = twilio(accountSid, authToken);

        let body = '';
        switch (type) {
            case 1:
               //otp
               body = 'Your OTP is ' + message
               break
            case 2:
               //wallet otp
               body = 'Your OTP for wallet is ' + message
               break
            default:
                body = message
                break
        }

        client.messages.create({
            body,
            to,
            from
        })
        .then((dt) => global.log(dt.sid))
        .catch ((err) => global.log(err))
        return
    } catch (err) {
        global.log(err)
        global.logger.error(err.message)
        return
    }
}