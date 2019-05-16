/* 
* Nest and third party imports
*/

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import bodyParser = require('body-parser');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  app.setGlobalPrefix(process.env.VERSION);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.useGlobalFilters(new ErrorFilter());


  const options = new DocumentBuilder()
    .setTitle('Nest Js ')
    .setDescription('The Nest Js api description')
    .setVersion('1.0')
    .addTag('users(devutils)')
    .setBasePath(process.env.VERSION)
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  let Logger = new LogService();

  Logger.debug(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.debug(`PORT = ${port}`);
  Logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
