import { Injectable } from '@nestjs/common';
import { GeneralCodes } from './general.errocodes.config';

@Injectable()
export class ErrorcodesService {

    constructor(private readonly generalcodes: GeneralCodes) {

    }


    findErrorCode() {

        let errorCodes = [];
        return errorCodes = this.generalcodes.ErrorCodes;

    }

}
