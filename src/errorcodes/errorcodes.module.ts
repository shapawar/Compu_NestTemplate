/* 
* NEST & Third party imports
*/
import { Module } from '@nestjs/common';

/* 
* Custom imports
*/
import { ErrorcodesService } from './errorcodes.service';
import { ErrorcodesController } from './errorcodes.controller';
import { GeneralCodes } from './general.errocodes.config';

@Module({
  providers: [ErrorcodesService,GeneralCodes],
  controllers: [ErrorcodesController],
  exports: [ErrorcodesService]
})
export class ErrorcodesModule {}
