import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { LogService } from '../../service/logger.service';
import { AppService } from '../../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { signup } from './entity/signup_entity';
import { ErrorcodesService } from '../../errorcodes/errorcodes.service';
import { GeneralCodes } from 'src/errorcodes/general.errocodes.config';

@Module({
  imports: [TypeOrmModule.forFeature([signup])],
  controllers: [SignupController],
  providers: [SignupService,LogService,AppService,ErrorcodesService, GeneralCodes],
  exports:[SignupModule,SignupService]
})
export class SignupModule {}
