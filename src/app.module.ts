import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CatsModule } from './module/cats/cats.module';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/auth.service';
import { ConfigService } from './common/config/config.service';
import { Logger } from './common/log/logger.log';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CatsModule,
    AuthModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
