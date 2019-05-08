/* 
* Nest & Third party imports
*/
import { Controller, Get , Res} from '@nestjs/common';

/* 
* Custom imports
*/
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 async root(@Res() res) {
  res.redirect('/v1/login');
  }
}
