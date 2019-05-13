import { Module } from '@nestjs/common';
import { ErrorcodesService } from './errorcodes.service';
import { ErrorcodesController } from './errorcodes.controller';
import { GeneralCodes } from './general.errocodes.config';

@Module({
  providers: [ErrorcodesService,GeneralCodes],
  controllers: [ErrorcodesController],
  exports: [ErrorcodesService]
})
export class ErrorcodesModule {}
