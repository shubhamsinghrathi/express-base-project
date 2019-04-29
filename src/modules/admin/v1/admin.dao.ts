import { BaseDao } from '../../base/BaseDao';
import { CONSTANT } from '../../../constant';
import { MESSAGES } from './adminConstant';
import { jwtTokenGenerator, hashPassword } from '../../../util';
import * as dataFormatter from './admin.dataformatter';

/**
 * Admin DAO class that contains all operations related to admin's account
 */
class AdminDao extends BaseDao {
    constructor() {
        super();
    }

    /**
     * check and create admin account with default email address and password
     */
    async adminAccountCreator() {
        let to_save = {
            name: 'Base Admin',
            email: 'base_admin@yopmail.com',
            password: await hashPassword('123456')
        }
        let theData = await this.findOne('admins', {}, {}, {});
        if (!theData) {
            await this.save('admins', to_save);
        }
        return '__ADMIN ACCOUNT LOOKUP/CREATION DONE__'
    }

    /**
     * used to make the admin loggedin
     * @param payload 
     */
    async adminLogin(payload: IAdminLogin) {
        let adminData = await this.findOne('admins', { email: payload.email, password: await hashPassword(payload.password) }, {}, { lean: true });
        if (!adminData) return Promise.reject(MESSAGES.ERROR.INVALID_CREDENTIALS);
        let token = await jwtTokenGenerator({ _id: adminData._id });
        return { message: MESSAGES.SUCCESS.ADMIN_LOGIN, result: { token } };
    }
    
    /**
     * Used to send admin's profile data
     * @param payload 
     */
    async profileData(payload: IAdmin) {
        return dataFormatter.adminData(payload.adminData || {});
    }
}

export const adminDao = new AdminDao();