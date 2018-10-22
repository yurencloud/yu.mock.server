import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CatsModule } from './module/cats/cats.module';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CatsModule,
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
