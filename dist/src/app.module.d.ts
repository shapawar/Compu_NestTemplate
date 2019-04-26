import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Connection } from 'typeorm';
export declare class AppModule implements NestModule {
    private readonly connection;
    constructor(connection: Connection);
    configure(consumer: MiddlewareConsumer): void;
}
