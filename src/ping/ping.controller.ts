import { Controller, Get, HttpCode, Req, UseInterceptors, Res } from '@nestjs/common';
import { apiResponse } from 'src/interfaces/metadata.interface';
import { DefaultInterceptor } from 'src/interceptor/default.interceptor';
import { AppService } from 'src/app.service';


@Controller('ping')
// @UseInterceptors(DefaultInterceptor)
export class PingController {
    constructor(private readonly appService: AppService) {}
    
    apiResp = <apiResponse>{};
    @Get()
    @HttpCode(200)
    async ping(@Req() req):Promise<any> {
        try {
            console.log("Check1",req['metadata']);

            //  this.apiResp.elapsedTimeInMS(req.evUniqueID, 0, 'success');
             return this.appService.getHello();
        } catch (error) {
            return error;
        }
    }
}
