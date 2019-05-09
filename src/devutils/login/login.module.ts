/* 
* Nest & Third party imports
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports
*/
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { userEntity } from '../users/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([userEntity])],
  controllers: [LoginController,],
  providers: [LoginService]
})
export class LoginModule {}
