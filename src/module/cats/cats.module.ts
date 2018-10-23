import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TokenService } from '../../common/guards/token.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, TokenService],
})
export class CatsModule {
}
