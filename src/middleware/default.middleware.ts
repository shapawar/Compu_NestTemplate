import { Injectable, NestMiddleware, MiddlewareFunction, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { apiResponse } from 'src/interfaces/metadata.interface';

const callGUID: string = uuid();


@Injectable()
export class DefaultMiddleware implements NestMiddleware, apiResponse {
    requestURL:string = this.requestURL;
    evUniqueID:string = this.evUniqueID;
    requestTS:Date = this.requestTS;
    elapsedTimeInMS:Number = this.elapsedTimeInMS;
    apiServer:string = this.apiServer;
    apiBuildVersion:string = this.apiBuildVersion;
    errCode: Number = this.errCode;
    errMsg: String = this.errMsg;
    constructor(private DefaultMiddleware: apiResponse){
    
    }

    /**
 * Hash API server name
 */
    hashAPIServer() {
        try {
            // const hash = crypto.createHash('sha256');
            // hash.update(os.hostname());

            // return hash.digest('base64');
        } catch (e) {
            Logger.error('hashAPIServer(): ' + e.message);
            return '--NOT AVAILABLE--';
        }
    };



    
    resolve(...args: any[]): MiddlewareFunction {
        
        return (req, res, next) => {
            console.log("==",req);
            // assign a unique id to this request and response
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;//to share between middlewares

            // create API response metadata object since we can setup initial information
            const respMeta = {};

            respMeta['evUniqueID'] = callGUID;
            respMeta['requestURL'] = req.originalUrl;
            //respMeta['apiServer'] = this.hashAPIServer();
            respMeta['apiBuildVersion'] = process.env.npm_package_version || '--NOT AVAILABLE--';
            respMeta['requestTS'] = Date.now();
            respMeta['tasks'] = [];

            res.locals.apiMeta = respMeta;

            let metadata = {}
            req.metadata = metadata;

            next();
        };
    }
}