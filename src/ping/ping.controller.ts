import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 7
import { apiResponse } from '../interfaces/metadata.interface'

@Controller('ping')
export class PingController {
    apiResp = <apiResponse>{};
    @Get()
    @HttpCode(200)
    ping(@Req() req): Promise<apiResponse[]> {
       try {
           this.apiResp.endMetadata(req.evUniqueID, 0, 'success');
           return req.metadata;
       } catch (error) {
           return error;
       }
    }
}
