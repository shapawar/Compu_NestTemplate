import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from '../users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([userEntity])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
