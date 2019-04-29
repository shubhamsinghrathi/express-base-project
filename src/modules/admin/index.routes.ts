import { BaseRoute } from '../../routes/routes';
import * as v1 from './v1/admin.routes';

export class AdminRoute extends BaseRoute {

    public static path = '/admin';
    private static instance: AdminRoute;

    private constructor() {
        super();
        this.init();
    }

    static get router() {
        //applying singleton method to create only one instance of the router class
        if (!AdminRoute.instance) {
            AdminRoute.instance = new AdminRoute();
        }
        return AdminRoute.instance.router;
    }

    private init() {

        // Route handler for the v1
        this.router.use(v1.AdminRoute.path, v1.AdminRoute.router);
    }
}