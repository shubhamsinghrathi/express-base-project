/**
 * @author Shubham Rathi
 * @description This file used to declare the bootstrap methods
 */
import { adminDao } from '../modules/admin/v1/admin.dao';

const checking = () => {
    global.log("bootstrap done");
}

//Feed all the bootstrap function in it.
export const bootInit = () => {
    checking();
    adminDao.adminAccountCreator()
};