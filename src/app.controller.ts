import { Controller, Get , Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 async root(@Res() res) {
   console.log("ok i am move");
  res.redirect('/api/v1/login');
  }
}
