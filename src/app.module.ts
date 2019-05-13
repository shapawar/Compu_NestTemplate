import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';
import { userEntity } from './devutils/users/user.entity';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { LogService } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
// import { ErrorcodesService } from './errorcodes/errorcodes.service';



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
  }),ErrorcodesModule],
  controllers: [ PingController,AppController],
  providers: [ LogService,AppService],
  
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
