import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler, Next } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { apiResponse } from 'src/interfaces/metadata.interface';

import * as crypto from "crypto";
import * as os from "os";

const callGUID: string = uuid();



@Injectable()
export class DefaultInterceptor<T> implements NestInterceptor<T, apiResponse<T>> {
    apiResp = <apiResponse<T>>{};



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

    intercept(req: ExecutionContext, next: CallHandler): Observable<apiResponse<T>> {
        console.log("Check2");
        req['evUniqueID'] = callGUID;
        // res.locals.evUniqueID = callGUID;//to share between middlewares

        // create API response metadata object since we can setup initial information
        this.apiResp.evUniqueID = callGUID;
        this.apiResp.requestURL = req['originalUrl']
        this.apiResp.apiServer = this.hashAPIServer();
        this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
        this.apiResp.requestTS = Date.now();
        this.apiResp.tasks = [];

        req['metadata'] = this.apiResp;
        const now = Date.now();

        console.log('Before...', Date.now());
        return next
            .handle()
            .pipe(tap(() => {
                console.log("Check");
                //     var abc ={name:"sharad"};
                //    return abc;
                console.log(`After... ${Date.now() - now}ms`)
                this.apiResp.requestTS = Date.now() - this.apiResp.requestTS;
                console.log("===", this.apiResp);
                console.log("Check3");
            }),
        );

    }
}
