import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import 'dotenv/config';
import bodyParser = require('body-parser');
import { ErrorFilter } from './middleware/errorhandler.middleware';
import { LogService } from './middleware/logger.middleware';

const port = process.env.PORT || 9001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  logger: new LogService(),
  app.use(bodyParser.json());
  app.setGlobalPrefix('api/v1')
  app.set('views', __dirname + '/views');
  app.set('view engine','ejs');
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);

  Logger.log(`APIVERSION = ${process.env.APIVERSION}`);
  Logger.log(`PORT = ${port}`);
  Logger.log(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();





