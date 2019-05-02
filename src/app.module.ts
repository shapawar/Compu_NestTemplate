import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { userEntity } from './users/user.entity';
import { PingController } from './ping/ping.controller';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'nestdapp',
    host:'localhost',
    synchronize: true,
    entities : [userEntity]
  })],
  controllers: [AppController, AuthController, PingController],
  providers: [AppService]
})

export class AppModule implements NestModule {
  constructor (private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .forRoutes(PingController);
  }
}
