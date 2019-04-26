import { Controller, Req, Get, Post, HttpCode } from '@nestjs/common';

@Controller('api/v1/auth')
export class AuthController {

    @Get('/ping')
    @HttpCode(200)
    ping(@Req() req) {

        return req.metadata;
    }

    @Post()
    @HttpCode(200)
    create() {
        return 'This action adds a new cat';
    }

    @Get()
    @HttpCode(200)
    findAll(@Req() request) {
        return 'This action returns all cats';
    }
}
