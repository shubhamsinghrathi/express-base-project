import { adminDao } from './admin.dao';

/**
 * Used to make the admin login
 * @param payload 
 */
export const adminLogin = async (payload: IAdminLogin) => {
    return await adminDao.adminLogin(payload);
}

/**
 * Used to send admin's profile data
 * @param payload 
 */
export const profileData = async (payload: IAdmin) => {
    return adminDao.profileData(payload);
}