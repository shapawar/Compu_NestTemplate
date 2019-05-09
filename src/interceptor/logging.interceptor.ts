import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { apiResponse } from 'src/interfaces/metadata.interface';
import * as crypto from "crypto";
import { v4 as uuid } from 'uuid';
import * as os from "os";

const callGUID: string = uuid();


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    apiResp = <apiResponse>{};

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


    intercept(req: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
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
        // const now = Date.now();
        return next
            .handle()
            // .pipe(tap(() =>  console.log(`After... ${Date.now() - now}ms`)));
            .pipe(map(data => ({ ...this.apiResp })))
    }
}
