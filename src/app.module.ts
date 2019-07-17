import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from './common/config/config.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { OrderModule } from './module/order/order.module';
import { CommonModule } from './module/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    OrderModule,
    ConfigModule,
    CommonModule,
  ],
  controllers: [AppController],
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
