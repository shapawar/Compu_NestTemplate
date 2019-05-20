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
import { userEntity } from './user.entity';
import { LogService } from 'src/service/logger.service';
import { AppService } from 'src/service/app.service';
import { ErrorcodesService } from 'src/errorcodes/errorcodes.service';
import { GeneralCodes } from 'src/errorcodes/general.errocodes.config';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [UsersController],
  providers: [UsersService,LogService,AppService,ErrorcodesService,GeneralCodes],
  exports: [UsersService, UsersModule]
})

export class UsersModule { }
