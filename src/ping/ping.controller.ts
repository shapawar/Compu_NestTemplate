import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { apiResponse } from '../interfaces/metadata.interface'

@Controller('ping')
export class PingController {
    apiResp = <apiResponse>{};
    @Get()
    @HttpCode(200)
    ping(@Req() req) {
        try {
            // this.apiResp.endMetadata(req.evUniqueID, 0, 'success');
            return req.metadata;
        } catch (error) {
            return error;
        }
    }
}
