import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { userEntity } from './devutils/users/user.entity';
import { LoginModule } from './devutils/login/login.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { DefaultInterceptor } from './interceptor/default.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'nestdapp',
    host: 'localhost',
    synchronize: true,
    entities : [userEntity]
  }),LoginModule],
  controllers: [AppController, AuthController,PingController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultInterceptor,
    }
  ],
 
})

export class AppModule implements NestModule {
  constructor (private readonly connection: Connection) {}
  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('*')
      // .apply(AuthMiddleware)
      // .forRoutes('/users')
    }

}
