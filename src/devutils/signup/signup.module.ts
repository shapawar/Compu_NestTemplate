/* 
* NEST & Third party imports
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custom imports
*/
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { LogService } from '../../service/logger.service';
import { AppService } from '../../service/app.service';
import { ErrorcodesService } from '../../errorcodes/errorcodes.service';
import { GeneralCodes } from '../../errorcodes/general.errocodes.config';
import { signup } from './entity/signup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([signup])],
  controllers: [SignupController],
  providers: [SignupService,LogService,AppService,ErrorcodesService, GeneralCodes],
  exports:[SignupModule,SignupService]
})
export class SignupModule {}
