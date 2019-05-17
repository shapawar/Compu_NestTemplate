
/**
 * Nest and Third party imports
 */

import { Injectable, NestMiddleware, MiddlewareFunction, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as crypto from "crypto";
import * as os from "os";
import * as moment from "moment";

/* 
* custom imports
*/
import { apiResponse } from 'src/interfaces/metadata.interface';
import { LogService } from './logger.middleware';

/* create unique ID */
const callGUID: string = uuid();

const logger = new LogService();

@Injectable()
export class DefaultMiddleware implements NestMiddleware {
    apiResp = <apiResponse>{};

    MODULENAME = "DefaultMiddleware";
    /**
    * Hash API server name
    */
    hashAPIServer() {
        let taskName = "Create Hash"

        try {

            var hash = crypto.createHash('sha256');
            hash.update(os.hostname());

            return hash.digest('base64');

        } catch (e) {

            logger.error(`[${hash.digest('base64')}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(e.message)}`);
            logger.debug(`[${hash.digest('base64')}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(e.message)}`);

            throw e;
        }
    };

    resolve(...args: any[]): MiddlewareFunction {
        let taskName = "metadata object";

        return (req, res, next) => {

            try {

                logger.debug(`[${ req.evUniqueID }] ${this.MODULENAME} (${taskName}): -`);
                // assign a unique id to this request and response
                req.evUniqueID = callGUID;
                res.locals.evUniqueID = callGUID;//to share between middlewares

                // create API response metadata object since we can setup initial information
                this.apiResp.evUniqueID = callGUID;
                this.apiResp.requestURL = req.originalUrl;
                this.apiResp.apiServer = this.hashAPIServer();
                this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
                this.apiResp.requestTS = moment().format();
                this.apiResp.elapsedTimeInMS = Date.now();
                this.apiResp.tasks = [];

                req.metadata = this.apiResp;

                next();

            } catch (error) {

                logger.error(`[${ req.evUniqueID }] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
                logger.debug(`[${ req.evUniqueID }] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);

                throw error;
            }


        };
    }
}