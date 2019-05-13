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
import { ErrorcodesModule } from '../../errorcodes/errorcodes.module';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity]),ErrorcodesModule],
  providers: [UsersService,LogService,AppService],
  controllers: [UsersController]
})

export class UsersModule{}
