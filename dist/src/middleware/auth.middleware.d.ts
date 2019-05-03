import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export declare class AuthMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction;
}
