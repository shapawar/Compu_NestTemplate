/* 
* Nest and third party imports
*/

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import bodyParser = require('body-parser');

/* 
* custom imports
*/

import { AppModule } from './app.module';
 require('dotenv').config({ "path": './secured/.env' });
import { ErrorFilter } from './middleware/errorhandler.middleware';

/* Define port */
const port = process.env.PORT || 9001;


async function bootstrap() {

const app = await NestFactory.create(AppModule);

/* app initialisation */
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors({origin: `http://localhost:9001`});
  app.setGlobalPrefix('v1')
  app.set('views', __dirname + '/views');
  app.set('view engine','ejs');
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);

  Logger.log(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.log(`PORT = ${port}`);
  Logger.log(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
