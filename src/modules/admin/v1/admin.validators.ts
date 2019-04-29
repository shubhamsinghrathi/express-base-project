import * as expressJoi from 'express-joi-validator';
import * as Joi from 'joi';
import { CONSTANT } from '../../../constant';

export const adminLogin = expressJoi({
    body: {
        email: Joi.string().email({ minDomainAtoms: 2 }).regex(CONSTANT.REGEX.EMAIL).lowercase().trim().required(),
        password: Joi.string().required()
    }
})