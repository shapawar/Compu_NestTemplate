import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export declare class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction;
}
