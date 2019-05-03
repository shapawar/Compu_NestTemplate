import { Controller, Req, Get, Post, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {

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
