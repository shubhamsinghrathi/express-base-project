import { BaseRoute } from './routes';
import { sendResp, handleError } from '../util';
import { AdminRoute } from '../modules/admin/index.routes';
import { MESSAGES } from "../constant/message.constant";

export class ApiRoutes extends BaseRoute {
    public static path = '/api';
    private static instance: ApiRoutes;

    private constructor() {
        super();
        this.init();
    }

    static get router() {
        //applying singleton method to create only one instance of the router class
        if (!ApiRoutes.instance) {
            ApiRoutes.instance = new ApiRoutes();
        }
        return ApiRoutes.instance.router;
    }

    private init() {

        // Route handler for the Admin routes
        this.router.use(AdminRoute.path, AdminRoute.router);

        // error handler
        this.router.use(function (err, req, res, next) {
            try {
                if (err.isBoom) {
                    return sendResp(res, { message: MESSAGES.ERROR.FIELD_VALIDATION_FAILED, result: err.output.payload.message || {} });
                }
                return handleError(res, err);
            } catch (err) {
                return handleError(res, err);
            }
        });
    }
}