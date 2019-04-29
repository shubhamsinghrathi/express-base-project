import { Request, Response, NextFunction } from 'express';
import { BaseDao } from '../modules/base/BaseDao';
import * as jwt from 'jsonwebtoken';
import { sendResp, handleError } from '../util';
import { MESSAGES } from '../constant';
import { admins } from '../modules/admin/admin.model';

/**
 * The authorization class
 */
class Authorization {
    /**
     * Used to authenticate admin's token
     * @param req 
     * @param res 
     * @param next 
     */
    async admin(req: Request, res: Response, next: NextFunction) {
        try {
          const rowtoken = req.headers['authorization'] || req.headers['x-access-token'];
          if (!rowtoken) return sendResp(res, { message: MESSAGES.ERROR.SESSION_TOKEN_NOT_PROVIDED });

          const token = rowtoken.toString().replace("Bearer", "").trim();
          if (!token) return sendResp(res, { message: MESSAGES.ERROR.SESSION_INVALID });

          const tokenInfo = await jwt.verify(token, process.env["jwt_secret"]);
          let adminData = await admins.findOne({ _id: tokenInfo["_id"] || "" }).lean();
          if (!adminData) return sendResp(res, { message: MESSAGES.ERROR.SESSION_INVALID });
          res.locals.adminData = adminData;
          req.body.tokenInfo = tokenInfo; //store the token info for the further fuse in other routes
          next();
        } catch (err) {
          return handleError(res, err);
        }
      }
}

export const authorization = new Authorization();