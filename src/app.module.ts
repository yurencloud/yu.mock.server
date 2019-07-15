import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from './common/config/config.module';
import { TokenService } from './common/guards/token.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { BusinessController } from './module/business/business.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ConfigModule,
  ],
  controllers: [AppController, BusinessController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
