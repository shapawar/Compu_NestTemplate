import { Controller, Get, HttpCode, Req } from '@nestjs/common';7
import { apiResponse } from '../interfaces/metadata.interface'

@Controller('ping')
export class PingController {

    @Get()
    @HttpCode(200)
    ping(@Req() req): Promise<apiResponse[]> {


        console.log("===",req.metadata);
        return req.metadata;
    }
}
