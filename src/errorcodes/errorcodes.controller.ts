import { Controller, Get, Res } from '@nestjs/common';
import { ErrorcodesService } from './errorcodes.service';



@Controller('errorcodes')
export class ErrorcodesController {

    constructor(private errorService:ErrorcodesService){

    }
    /* Render login page */
    @Get()
    async checkroute(@Res() res){
        
        let chaeck = await this.errorService.findErrorCode();
       return res.json(chaeck);

    }
}
