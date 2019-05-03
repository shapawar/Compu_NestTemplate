import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';



@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  providers: [UsersService],
  controllers: [UsersController]
})

export class UsersModule{}
