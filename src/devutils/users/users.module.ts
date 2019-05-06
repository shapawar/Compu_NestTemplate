import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { LogService } from 'src/middleware/logger.middleware';



@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  providers: [UsersService,LogService],
  controllers: [UsersController]
})

export class UsersModule{}
