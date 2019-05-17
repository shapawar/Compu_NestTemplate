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
import { LogService } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { UsersController } from './devutils/users/users.controller';



@Module({
  
  /* 
  *  Database connection configuration
  */
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'admin2518',
    database: 'nestdapp',
    host: 'localhost',
    synchronize: true,
    entities: [userEntity]
  }), ErrorcodesModule],
  controllers: [PingController, AppController],
  providers: [LogService, AppService],
  exports: [LogService]
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
        { path: '/users/login', method: RequestMethod.POST }
      )
      .forRoutes(UsersController)
  }

}
