import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';
import { userEntity } from './devutils/users/user.entity';
import { LoginModule } from './devutils/login/login.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { LogService } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { AppService } from './app.service';

/* 
* Nest & Third party imports
*/

/* 
* Custom imports
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
  }), LoginModule, ErrorcodesModule],
  controllers: [ PingController,AppController],
  providers: [ LogService,AppService]
})

/* 
* Middleware Settings
*/
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) { }
  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('/users')
  }

}
