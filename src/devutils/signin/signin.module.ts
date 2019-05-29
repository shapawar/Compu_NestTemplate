import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { signup } from '../signup/entity/signup_entity';

@Module({
  imports: [TypeOrmModule.forFeature([signup])],
  controllers: [SigninController],
  providers: [SigninService]
})
export class SigninModule {}
