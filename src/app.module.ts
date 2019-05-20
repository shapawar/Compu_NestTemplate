/* 
* Nest & Third party imports
*/
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports
*/
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';
import { userEntity } from './devutils/users/user.entity';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { UsersController } from './devutils/users/users.controller';
import { ApiUtils } from './devutils/apiutils.route';
import { ErrorFilter } from './service/errorhandler.service';
import { ErrorcodesService } from './errorcodes/errorcodes.service';
import { LogService } from './service/logger.service';

/*
  * Main module and Database connection configuration
  */
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'nestdapp',
    host: 'localhost',
    synchronize: true,
    entities: [userEntity]
  }), ErrorcodesModule],
  controllers: [PingController, AppController, ApiUtils],
  providers: [LogService, AppService, ErrorcodesService, ErrorFilter],
  exports: [LogService, AppService, ErrorcodesService, ErrorFilter]
})

/* 
* Middleware Settings
*/
export class AppModule implements NestModule {

  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .exclude(
        { path: '/users', method: RequestMethod.POST },
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users/noorm', method: RequestMethod.POST }
      )
      .forRoutes(UsersController)
  }

}
