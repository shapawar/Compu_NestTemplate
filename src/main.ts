/* 
* Nest and third party imports
*/

import { NestFactory } from '@nestjs/core';
import {ValidationPipe } from '@nestjs/common';
import bodyParser = require('body-parser');

/* 
* custom imports
*/

import { AppModule } from './app.module';
 require('dotenv').config({ "path": './secured/.env' });
import { ErrorFilter } from './middleware/errorhandler.middleware';
import { LogService } from './middleware/logger.middleware';

/* Define port */
const port = process.env.PORT || 9001;


async function bootstrap() {

const app = await NestFactory.create(AppModule);

/* app initialisation */
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors();
  app.setGlobalPrefix(process.env.APIPATH);
  app.set('views', __dirname + '/views');
  app.set('view engine','ejs');
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);
  let Logger = new LogService();

  Logger.debug(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.debug(`PORT = ${port}`);
  Logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
