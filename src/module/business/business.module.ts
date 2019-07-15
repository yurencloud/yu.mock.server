import { Module, forwardRef } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Logger } from '../../common/log/logger.log';
import { ConfigService } from '../../common/config/config.service';
import { TokenService } from '../../common/guards/token.service';
import { UserRole } from '../../entity/userRole.entity';
import { Merchant } from '../../entity/merchant.entity';
import { Permission } from '../../entity/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [BusinessController],
  providers: [Logger],
})

export class BusinessModule {
}
