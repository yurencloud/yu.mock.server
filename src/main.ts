import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './common/log/logger.log';
import * as session from 'express-session';
import * as passport from 'passport';

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
  await app.listen(3000);
}

bootstrap();
