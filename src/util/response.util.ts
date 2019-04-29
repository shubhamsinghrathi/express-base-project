import { Response } from 'express';
import { MESSAGES } from '../constant';

/**
 * used to send the response to the client
 * @param res 
 * @param data 
 */
export const sendResp = (res: Response, data: any) => {
    const time = Date.now() - res.locals.startTime;
    try {
        if (data.message) {
            return res.status(data.message.statusCode).json({
                statusCode: data.message.statusCode,
                message: data.message.message,
                type: data.message.type,
                result: data.result || {},
                time
            });
        } else {
            return res.status(MESSAGES.SUCCESS.SUCCESS.statusCode).json({
                statusCode: MESSAGES.SUCCESS.SUCCESS.statusCode,
                message: MESSAGES.SUCCESS.SUCCESS.message,
                type: MESSAGES.SUCCESS.SUCCESS.type,
                result: data || {},
                time
            });
        }
    } catch (er) {
        return res.status(MESSAGES.SUCCESS.SUCCESS.statusCode).json({
            statusCode: MESSAGES.SUCCESS.SUCCESS.statusCode,
            message: MESSAGES.SUCCESS.SUCCESS.message,
            type: MESSAGES.SUCCESS.SUCCESS.type,
            result: data || {},
            time
        });
    }
}

/**
 * Used to send the error responsed to the client side
 * @param res 
 * @param err 
 */
export const handleError = (res: Response, err: any) => {
    const time = Date.now() - res.locals.startTime;
    global.logger.error(err.message)
    global.log("handleError: ", err)
    try {
        if (err.statusCode) {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
                type: err.type,
                result: {},
                time
            });
        } else {
            return res.status(MESSAGES.ERROR.INTERNAL_SERVER_ERROR.statusCode).json({
                statusCode: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.statusCode,
                message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.message,
                type: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.type,
                result: {},
                time
            });
        }
    } catch (err) {
        return res.status(MESSAGES.ERROR.INTERNAL_SERVER_ERROR.statusCode).json({
            statusCode: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.statusCode,
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.message,
            type: MESSAGES.ERROR.INTERNAL_SERVER_ERROR.type,
            result: {},
            time
        });
    }
}