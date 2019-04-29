//this is the admin router file
import { BaseRoute } from '../../../routes/routes';
import { CONSTANT } from '../../../constant';
import { authorization } from '../../../middlewares';
import * as adminController from './admin.controller';
import { sendResp, handleError } from '../../../util';
import * as adminValidators from './admin.validators';

export class AdminRoute extends BaseRoute {
    public static path = '/v1';
    private static instance: AdminRoute;
    // private adminController = new AdminController();

    private constructor() {
        super();
        //initiating the routers
        this.init();
    }

    static get router() {
        if (!AdminRoute.instance) {
            AdminRoute.instance = new AdminRoute();
        }
        return AdminRoute.instance.router;
    }

    private async init() {
        // Admin's Routes

        /**
         * Admin login router
         */
        this.router.post("/login",
        adminValidators.adminLogin,
        async (req, res) => {
            try {
                const { email, password }: IAdminLogin = req.body;
                let result = await adminController.adminLogin({ email, password });
                return sendResp(res, result);
            } catch (err) {
                return handleError(res, err);
            }
        });

        this.router.get("/profile",
        authorization.admin,
        async (req, res) => {
            try {
                let result = await adminController.profileData({ adminData: res.locals.adminData || {} });
                return sendResp(res, result);
            } catch (err) {
                return handleError(res, err);
            }
        });

        //page not found
        this.router.all('*', (req, res) => {
            res.status(CONSTANT.HTTP_STATUS_CODE.URL_NOT_FOUND).json(CONSTANT.HTTP_RESPONSED.INVALID_URL_RESPONSE);
        })
    }
}