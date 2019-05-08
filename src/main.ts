import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import 'dotenv/config';
import bodyParser = require('body-parser');
import { ErrorFilter } from './middleware/errorhandler.middleware';


const port = process.env.PORT || 9001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.setGlobalPrefix('api/v1')
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  app.useGlobalFilters(new ErrorFilter());

  // const options = new DocumentBuilder()
  //   .setTitle('NestJs Templates')
  //   .setDescription('The Nest API description')
  //   .setVersion('1.0')
  //   .addTag('')
  //   .setBasePath('api/v1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.log(`PORT = ${port}`);
  Logger.log(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();



