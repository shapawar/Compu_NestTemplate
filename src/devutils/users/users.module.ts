/* 
* Nest & Third party imports
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports 
*/
import { AppService } from '../../app.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userEntity } from './user.entity';
import { LogService } from '../../middleware/logger.middleware';
import { ErrorcodesService } from '../../errorcodes/errorcodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule]
})

export class UsersModule { }
