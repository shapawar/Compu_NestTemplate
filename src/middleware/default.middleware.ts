
/**
 * Nest and Third party imports
 */

import { Injectable, NestMiddleware, MiddlewareFunction, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as crypto from "crypto";
import * as os from "os";

/* 
* custom imports
*/
import { apiResponse } from 'src/interfaces/metadata.interface';


/* create unique ID */
const callGUID: string = uuid();

@Injectable()
export class DefaultMiddleware implements NestMiddleware {
    apiResp = <apiResponse>{};
    // constructor(private DefaultMiddleware: apiResponse) {

    // }

    /**
 * Hash API server name
 */
    hashAPIServer() {
        try {
            const hash = crypto.createHash('sha256');
            hash.update(os.hostname());

            return hash.digest('base64');
        } catch (e) {
            Logger.error('hashAPIServer(): ' + e.message);
            return '--NOT AVAILABLE--';
        }
    };

    resolve(...args: any[]): MiddlewareFunction {

        return (req, res, next) => {
            // assign a unique id to this request and response
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;//to share between middlewares

            // create API response metadata object since we can setup initial information
            this.apiResp.evUniqueID = callGUID;
            this.apiResp.requestURL = req.originalUrl;
            this.apiResp.apiServer = this.hashAPIServer();
            this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
            this.apiResp.requestTS = Date.now();
            this.apiResp.elapsedTimeInMS = Date.now();
            this.apiResp.tasks = [];

            req.metadata = this.apiResp;

            next();
        };
    }
}