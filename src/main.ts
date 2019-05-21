/* 
* Nest and third party imports
*/
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
require('dotenv').config({ "path": './secured/.env' });

/* 
* custom imports
*/
import { AppModule } from './app.module';
import { LogService } from './service/logger.service';

/* Define port */
const port = process.env.PORT || 9001;


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  let Logger = new LogService();

  /* app initialization */
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors();
  app.setGlobalPrefix(process.env.VERSION);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  const options = new DocumentBuilder()
    .setTitle('Nest Js ')
    .setDescription('The Nest Js api description')
    .setVersion(process.env.SwaggerVersion)
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setBasePath(process.env.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  Logger.debug(`APIVERSION = ${process.env.VERSION}`);
  Logger.debug(`PORT = ${port}`);
  Logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
