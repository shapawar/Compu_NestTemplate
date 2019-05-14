import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { apiResponse } from 'src/interfaces/metadata.interface';
export declare class DefaultMiddleware implements NestMiddleware {
    apiResp: apiResponse;
    hashAPIServer(): string;
    resolve(...args: any[]): MiddlewareFunction;
}
