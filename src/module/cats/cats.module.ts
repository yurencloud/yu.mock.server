import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TokenService } from '../../common/guards/token.service';
import { UserRole } from '../../entity/userRole.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]),
  ],
  controllers: [CatsController],
  providers: [CatsService, TokenService],
})
export class CatsModule {
}
