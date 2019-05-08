import { Controller, Get, HttpCode, Req, UseInterceptors, Res } from '@nestjs/common';

@Controller('ping')
export class PingController {
    @Get()
    @HttpCode(200)
    ping(@Req() req,@Res() res) {
        try {
            console.log("Check1",res);
            // this.apiResp.endMetadata(req.evUniqueID, 0, 'success');
            return res;
        } catch (error) {
            return error;
        }
    }
}
