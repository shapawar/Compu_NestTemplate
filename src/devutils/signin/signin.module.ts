/* 
* Nest & third party imports
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports
*/
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { signup } from '../signup/entity/signup.entity';
import { LogService } from '../../service/logger.service';


@Module({
  imports: [TypeOrmModule.forFeature([signup])],
  controllers: [SigninController],
  providers: [SigninService, LogService]
})
export class SigninModule { }
