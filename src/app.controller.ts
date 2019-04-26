import { Controller, Get , Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 async root(@Res() res) {
    let data = await this.appService.getHello();
    res.json(data)
  }
}
