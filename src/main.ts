/* 
* Nest and third party imports
*/

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import bodyParser = require('body-parser');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  app.enableCors();
  app.setGlobalPrefix('v1')
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.useGlobalFilters(new ErrorFilter());


  const options = new DocumentBuilder()
    .setTitle('Nest Js ')
    .setDescription('The Nest Js api description')
    .setVersion('1.0')
    .addTag('users')
    .setBasePath('/v1')
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); 

  await app.listen(port);


  Logger.log(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.log(`PORT = ${port}`);
  Logger.log(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
