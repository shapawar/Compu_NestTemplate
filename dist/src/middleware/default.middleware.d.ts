import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export declare class DefaultMiddleware implements NestMiddleware {
    hashAPIServer(): string;
    resolve(...args: any[]): MiddlewareFunction;
}
