import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { Request, Response, NextFunction } from 'express';
import { ApiRoutes } from './routes/index.routes';
import { MONGODB_URI, MONGODB_USER, ENVIRONMENT, MONGODB_PASSWORD, bootInit } from "./util";
import * as mongoose from "mongoose";
import { initGlobals } from './util/globals';
import * as path from 'path';
const swaggerDocument = YAML.load('./swagger/doc.yaml');
import { CONSTANT } from './constant';

class App {
    constructor() {
        initGlobals(); //initialize new globals
        this.app = express();
        this.initDependency();
        this.connectMongo();
        if (process.env.NODE_ENV !== "production") mongoose.set('debug', true);
        this.routes(); //initialize all routes
        bootInit(); //initialize bootstrap methods
    }

    public app: express.Application;

    private initDependency(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.logger();
        this.errorHandler();
        this.app.use(express.static(path.join(__dirname, '../public'))); //creating public folder router
    }

    private routes(): void {
        this.app.use(ApiRoutes.path, ApiRoutes.router);

        //API doc
        this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.use((req, res) => {
            res.status(CONSTANT.HTTP_STATUS_CODE.URL_NOT_FOUND).json(CONSTANT.HTTP_RESPONSED.INVALID_URL_RESPONSE);
        });
    }

    private logger(): void {
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            res.locals.startTime = Date.now();
            global.log('--------------------------------request Details----------------------------------------', req.originalUrl);
            global.log('Req Type', req.method);
            global.log('auth-token', req.headers['auth-token']);
            global.log('authorization', req.headers['authorization']);
            global.log('user-agent', req.headers['user-agent']);
            global.log('Host', req.headers['host']);
            global.log('Req Body', req.body);
            global.log('Req Params', req.params);
            global.log('Req Query', req.query);
            global.log('-----------------------------------------ENDS------------------------------------------');
            next();
        });
    }

    // Connect to mongodb
    private connectMongo(): void {
        if (!ENVIRONMENT) {
            mongoose.connect(MONGODB_URI).then(
                () => {
                    global.logger.info('Connected to the database');
                },
            ).catch (err => {
                global.logger.error('Error in connecting to the database');
                process.exit();
            });
        } else {
            mongoose.connect(MONGODB_URI, {
                auth: {
                    user: MONGODB_USER,
                    password: MONGODB_PASSWORD
                }
            }).then(
                () => {
                    global.logger.info('Connected to the database');
                },
            ).catch (err => {
                global.logger.error('Error in connecting to the database');
                process.exit();
            });
        }
    }

    // Unexpected error handler
    private errorHandler(): void {
        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(err.status || CONSTANT.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
            return res.json({
                success: false,
                message: err.message,
                result: {},
                statusCode: err.status
            });
        })
    }
}

export default new App().app;