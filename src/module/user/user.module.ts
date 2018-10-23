import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Logger } from '../../common/log/logger.log';
import { ConfigService } from '../../common/config/config.service';
import { TokenService } from '../../common/guards/token.service';
import { UserRole } from '../../entity/userRole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService, Logger, ConfigService],
})

export class UserModule {
}
