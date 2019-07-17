import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './common/log/logger.log';
import * as session from 'express-session';
import * as passport from 'passport';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.use(session({
    secret: 'secret',
    name: 'yublog',
    cookie: {
      maxAge: 1000 * 60 * 60, // session 过期时间
    },
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Yurencloud')
    .setDescription('Yurencloud Blog Example')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, 'public'), {
    prefix: '/static/',
  });

  await app.listen(3000);
}

bootstrap();
