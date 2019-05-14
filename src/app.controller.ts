/* 
* NEST & Third party imports
*/
import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {

    constructor(private appService:AppService){}
    @Get()
    sum() {
        return this.appService.getHello();
    }
}