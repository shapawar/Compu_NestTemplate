/* 
* Nest & Third party imports
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports 
*/
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userEntity } from './entity/user.entity';
import { LogService } from '../../service/logger.service';
import { AppService } from '../../service/app.service';
import { ErrorcodesService } from '../../errorcodes/errorcodes.service';
import { GeneralCodes } from '../../errorcodes/general.errocodes.config';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [UsersController],
  providers: [UsersService,LogService,AppService,ErrorcodesService,GeneralCodes],
  exports: [UsersService, UsersModule]
})

export class UsersModule { }
