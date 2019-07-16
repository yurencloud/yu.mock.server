import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '../../common/log/logger.log';
import { Order } from '../../entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [Logger],
})

export class OrderModule {
}