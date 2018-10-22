import {
  Body,
  Catch,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { BaseResponse } from '../../dto/base.response';
import { Logger } from '../../common/log/logger.log';

@Catch()
@Controller('user')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  private readonly log: Logger = new Logger();

  @Get('/test')
  async test(): Promise<User[]> {
    this.log.info('some log %s %n', 'hello world', 23);
    return this.userService.findAll();
  }

  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/create')
  async create(@Body() body): Promise<BaseResponse> {
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body): Promise<BaseResponse> {
    return await this.userService.login(body);
  }
}
