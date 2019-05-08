/* 
* Nest & Third party imports
*/
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

/* 
* Custom imports
*/
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';
import { userEntity } from './devutils/users/user.entity';
import { LoginModule } from './devutils/login/login.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { LogService } from './middleware/logger.middleware';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'admin2518',
    database: 'nestdapp',
    host: 'localhost',
    synchronize: true,
    entities: [userEntity]
  }), LoginModule],
  controllers: [AppController, PingController],
  providers: [AppService, LogService],
})

/* 
* Middleware Settings
*/
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) { }
  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware,AuthMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('/users')
      .apply(DefaultMiddleware)
      .forRoutes(PingController);
  }

}
