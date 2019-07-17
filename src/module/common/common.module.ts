import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '../../common/log/logger.log';
import { ConfigService } from '../../common/config/config.service';
import { TokenService } from '../../common/guards/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [CommonController],
  providers: [TokenService, Logger, ConfigService],
})

export class CommonModule {
}
